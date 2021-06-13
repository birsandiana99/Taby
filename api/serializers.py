# make jsons
from rest_framework import serializers
from .models import Messages, Quotes, Room, MyUser, UserTherapist, ChatMessage
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','code','host','guest_can_pause','votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id','username','password','email', 'type_of_user','date_joined', 'last_login', 'first_name', 'last_name', 'age')
        # fields = ('username','password')
        # extra_kwargs = {'password': {'write_only':True, 'required': True}}
    def create(self, validated_data):
        print("-------------------",validated_data)
        user = MyUser.objects.create_user(validated_data)
        token = Token.objects.create(user = user)
        return user

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = ('user_id','msg_date', 'message')


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = MyUser.objects.all()
#     serializer_class = UserSerializer

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ('author_id','recipient_id', 'date_sent', 'text')

class UserTherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTherapist
        fields = ('start_date','user_id', 'therapist_id')

class QuotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotes
        fields = ('author_id', 'quote_text', 'domain', 'date_added', 'nr_likes')