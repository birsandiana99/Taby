from django.contrib import admin

# Register your models here.
from api.models import MyUser,Messages, UserTherapist

admin.site.register(MyUser)
admin.site.register(Messages)
admin.site.register(UserTherapist)