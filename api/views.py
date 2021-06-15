from django.db.models.fields import DateTimeField
from django.shortcuts import render
from django.http import HttpResponse, request
from rest_framework import generics, status
from .serializers import ChatMessageSerializer, MessagesSerializer, QuotesSerializer, RoomSerializer, CreateRoomSerializer, UserSerializer, UserTherapistSerializer
from .models import ChatMessage, Quotes, Room, MyUser, UserTherapist
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
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host = host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                room = Room(host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class MyChatbotView(APIView):
    def get(self, request, format=None):
        # print("AAAAA", request.query_params['msg'])
        # print("BBBBBB", request.query_params['user'])
        (_, bot_resp, _) = generate_response( request.query_params['msg'])
        # if usr_msg_valid:
        #     message = Messages(user_id=request.query_params['user'],message=request.query_params['msg'],msg_date=datetime.now() - timedelta(1))
        #     print("JJJJ",datetime.now()-timedelta(1))
        #     print("IIIIIIIII",message.msg_date)
        #     message.save()
        return Response(bot_resp)


class UserView(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        print(token.user_id)
        user = MyUser.objects.get(pk=token.user_id)
        print("----------------------" + str(user.get_user_type()))
        
        return Response({'token': token.key, 'user_id': token.user_id, 'type_of_user': user.get_user_type() })



class Logout(APIView):
    def post(self, request):
        # simply delete the token to force a login
        print("----------request", request.data['token'])
        token = Token.objects.get(key = request.data['token'])
        user = MyUser.objects.get(pk = token.user_id)
        user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

from datetime import date, datetime, time,timedelta
from django.utils.dateparse import parse_date 

class ChatbotMessages(generics.ListCreateAPIView):
    serializer_class = MessagesSerializer
    def get_queryset(self):
        uid = self.request.GET.get('user_id')
        # return Messages.objects.filter(user_id=self.request.headers.get('user_id'))
        return Messages.objects.filter(user_id=uid)
    def post(self, request, format = None):
        user_id = self.request.POST.get('user_id')
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", int(self.request.POST.get("msg_date")))
        if self.request.POST.get("msg_date"):
            timestamp_date = int(self.request.POST.get("msg_date"))
            msg_date = datetime.fromtimestamp(timestamp_date/1000)
            
        else:
            msg_date = datetime.now()
        message = self.request.POST.get('message')
        print("AAAAAA",message)
        msg = Messages(user_id = user_id, msg_date = msg_date, message = message)
        msg.save()
        return Response(status=status.HTTP_201_CREATED)

class getCountersForChart(APIView):
    def get(self, request, format=None):
        el = request.query_params['obj']
        counter = sentiment(el)
        return Response(counter)

class getTagsForDashboard(APIView):
    def get(self, request, format=None):
        el = request.query_params['msg']
        (_, _, tag) = generate_response(el)
        return Response(tag)

class getMessagePolarity(APIView):
    def get(self, request, format=None):
        el = request.query_params['obj']
        counter = polarity_analyzer(el)
        # print("ffhaiciiiiiii",counter)
        return Response(counter)


class getUsersForTherapist(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        # print(self.request.GET.get('therapist_id'))
        uid = self.request.GET.get('therapist_id')
        print("AAAAB",request.query_params['therapist_id'])
        # uid = 13
        user_list = []
        users_for_therapist = UserTherapist.objects.filter(therapist_id=uid)
        for user in users_for_therapist:
            curr_user = MyUser.objects.filter(id = user.user_id)
            user_list.append(curr_user[0])
        serializer = UserSerializer(user_list, many=True)

        # return Response(user_list)
        return Response(serializer.data)

class getTherapistForUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get(self, request):
        uid = self.request.GET.get('user_id')
        therapist_id = UserTherapist.objects.filter(user_id=uid)
        # TODO
        if(therapist_id):
            therapist = MyUser.objects.filter(id =therapist_id[0].therapist_id)
            print("%%%%",therapist[0])
            serializer = UserSerializer(therapist[0])
            return Response(serializer.data)
        else:
            return Response(404)
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
        uid = self.request.GET.get('user_id')
        from django.db.models import Q
        messages = ChatMessage.objects.filter(Q(author_id=uid) | Q(recipient_id=uid))
        msg_list = list(messages)
        print("$#########,",msg_list)
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
        return Response(ChatMessageSerializer(user_therapist).data, status=status.HTTP_201_CREATED)
    def get(self, request):
        uid = self.request.GET.get('user_id')
        messages = UserTherapist.objects.filter(user_id=uid)
        msg_list = list(messages)
        serializer = UserTherapistSerializer(msg_list, many=True)
        return Response(serializer.data)


class QuotesView(generics.ListCreateAPIView):
    queryset = Quotes.objects.all()
    serializer_class = QuotesSerializer