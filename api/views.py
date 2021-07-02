from django.db.models.fields import DateTimeField
from django.shortcuts import render
from django.http import HttpResponse, request
from rest_framework import generics, status
from .serializers import ChatMessageSerializer, MessagesSerializer, QuotesSerializer, UserSerializer, UserTherapistSerializer
from .models import ChatMessage, Quotes, MyUser, UserTherapist
from rest_framework.views import APIView
from rest_framework.response import Response
from .bot.generate_response import generate_response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Messages
# write API view
from django.contrib.auth.decorators import login_required
from .bot.sentiment_analyzer import sentiment, polarity_analyzer
from collections import Counter

# Chatbot view - get the generated response from the backend
class MyChatbotView(APIView):
    def get(self, request, format=None):
        (_, bot_resp, _) = generate_response( request.query_params['msg'])
        return Response(bot_resp)

# get list of all users
class UserView(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

# get a specific user by id 
class GetUserView(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        uid = request.GET.get('user_id')
        user = MyUser.objects.get(pk=uid)
        serializer = UserSerializer(user)
        return Response(serializer.data)

#obtain an auth token 
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = MyUser.objects.get(pk=token.user_id)        
        return Response({'token': token.key, 'user_id': token.user_id, 'type_of_user': user.get_user_type() })


# delete the auth token for the user after logout
class Logout(APIView):
    def post(self, request):
        # simply delete the token to force a login
        token = Token.objects.get(key = request.data['token'])
        user = MyUser.objects.get(pk = token.user_id)
        user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

from datetime import date, datetime, time,timedelta
from django.utils.dateparse import parse_date 


# get and post chatbot messages
class ChatbotMessages(generics.ListCreateAPIView):
    serializer_class = MessagesSerializer
    def get_queryset(self):
        uid = self.request.GET.get('user_id')
        # return Messages.objects.filter(user_id=self.request.headers.get('user_id'))
        return Messages.objects.filter(user_id=uid)
    def post(self, request, format = None):
        user_id = self.request.POST.get('user_id')
        if self.request.POST.get("msg_date"):
            print("AIIIIIIIIII",self.request.POST.get("msg_date"))
            timestamp_date = int(self.request.POST.get("msg_date"))
            msg_date = datetime.fromtimestamp(timestamp_date/1000)
            # msg_date = datetime.strptime(self.request.POST.get("msg_date"))
            print("AIIII2",msg_date)
        else:
            msg_date = datetime.now()
        message = self.request.POST.get('message')
        msg = Messages(user_id = user_id, msg_date = msg_date, message = message)
        msg.save()
        return Response(status=status.HTTP_201_CREATED)


# create counter for sentiment analysis for a certain emotion
class getCountersForChart(APIView):
    def get(self, request, format=None):
        el = request.query_params['obj']
        counter = sentiment(el)
        return Response(counter)

# get the tag of a certain sentence
class getTagsForDashboard(APIView):
    def get(self, request, format=None):
        el = request.query_params['msg']
        (_, _, tag) = generate_response(el)
        return Response(tag)


# get polarity of a sentence
class getMessagePolarity(APIView):
    def get(self, request, format=None):
        el = request.query_params['obj']
        counter = polarity_analyzer(el)
        return Response(counter)


# get all the users for a therapist
class getUsersForTherapist(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        uid = self.request.GET.get('therapist_id')
        user_list = []
        users_for_therapist = UserTherapist.objects.filter(therapist_id=uid)
        for user in users_for_therapist:
            curr_user = MyUser.objects.filter(id = user.user_id)
            user_list.append(curr_user[0])
        serializer = UserSerializer(user_list, many=True)
        return Response(serializer.data)


# get the therapist for a user
class getTherapistForUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        uid = self.request.GET.get('therapist_id')
        user_list = []
        users_for_therapist = UserTherapist.objects.filter(therapist_id=uid)
        for user in users_for_therapist:
            curr_user = MyUser.objects.filter(id = user.user_id)
            user_list.append(curr_user[0])
        serializer = UserSerializer(user_list, many=True)
        return Response(serializer.data)

class getTherapistForUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        uid = self.request.GET.get('user_id')
        therapist_id = UserTherapist.objects.filter(user_id=uid)
        if(therapist_id):
            therapist = MyUser.objects.filter(id =therapist_id[0].therapist_id)
            serializer = UserSerializer(therapist[0])
            return Response(serializer.data)
        else:
            return Response(404)

#return all chat messages
class ChatMessages(APIView):
    serializer_class = ChatMessageSerializer
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            author_id = serializer.data.get('author_id')
            recipient_id = serializer.data.get('recipient_id')
            date_sent = serializer.data.get('data_sent')
            text = serializer.data.get('text')
            chat = ChatMessage(author_id = author_id, recipient_id = recipient_id, date_sent = date_sent,text=text)
            chat.save()
            return Response(ChatMessageSerializer(chat).data, status=status.HTTP_201_CREATED)

class ChatMessagesView(generics.ListAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


class getMessagesForUser(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    def get(self, request):
        user_1 = self.request.GET.get('user')
        # user_2 = self.request.GET.get('user_2')
        from django.db.models import Q
        messages = ChatMessage.objects.filter(Q(author_id=user_1) | Q(recipient_id=user_1))
        msg_list = list(messages) 
        serializer = ChatMessageSerializer(msg_list, many=True)
        return Response(serializer.data)


class UserTherapistView(APIView):
    # queryset = UserTherapist.objects.all()
    serializer_class = UserTherapistSerializer
    def post(self, request, format = None):
        user_id = self.request.POST.get('user_id')
        therapist_id =  self.request.POST.get('therapist_id')
        user_therapist = UserTherapist(user_id = user_id, therapist_id = therapist_id)
        user_therapist.save()
        return Response(UserTherapistSerializer(user_therapist).data, status=status.HTTP_201_CREATED)
    def get(self, request):
        uid = self.request.GET.get('user_id')
        messages = UserTherapist.objects.filter(user_id=uid)
        msg_list = list(messages)
        serializer = UserTherapistSerializer(msg_list, many=True)
        return Response(serializer.data)


class QuotesView(generics.ListCreateAPIView):
    queryset = Quotes.objects.all()
    serializer_class = QuotesSerializer