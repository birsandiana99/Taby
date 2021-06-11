from django.db import models
import string
import random
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User
from rest_framework import viewsets
# from .serializers import UserSerializer

from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k = length))
        if Room.objects.filter(code = code).count() == 0:
            break
        
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

import datetime
class Messages(models.Model):
    user_id = models.IntegerField()
    msg_date = models.DateTimeField()
    message = models.CharField(max_length=200)


class UserTherapist(models.Model):
    start_date = models.DateTimeField(verbose_name='therapy start date', auto_now=True)
    user_id = models.IntegerField()
    therapist_id = models.IntegerField()


class MyUserManager(BaseUserManager): 
    # def create_user(self, email, username, password=None):
    def create_user(self, data):
        username = data['username']
        password = data['password']
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        age = data['age']
        type_of_user = data['type_of_user']
        if not email:
            raise ValueError('Users must have an email address')
        print("CCCCC", email)
        if not username:
            raise ValueError('Users must have a username')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            type_of_user=type_of_user,
            age=age
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username, 
            first_name='first_name',
            last_name='last_name',
            type_of_user='type_of_user',
            age=0
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    TYPE_CHOICES = (
    ('therapist','THERAPIST'),
    ('client', 'CLIENT'),
)
    type_of_user = models.CharField(max_length=20, default='client', choices=TYPE_CHOICES)
    date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    first_name = models.CharField(max_length=30,default='')
    last_name = models.CharField(max_length=30,default='')
    age = models.IntegerField(default=18)
    objects = MyUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def get_user_type(self):
        return self.type_of_user


class ChatMessage(models.Model):
    author_id = models.IntegerField(default=-1)
    recipient_id = models.IntegerField(default=-1)
    date_sent = models.DateTimeField(verbose_name='date_sent', auto_now=True)
    text = models.TextField(default="")
    # read = models.BooleanField(default=False)