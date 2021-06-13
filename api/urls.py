from django.urls import path
from .views import Logout, QuotesView, RoomView, CreateRoomView, MyChatbotView, UserView, UserViewSet, CustomObtainAuthToken, getCountersForChart, getMessagesForUser, ChatbotMessages, getMessagePolarity, getTagsForDashboard, getTherapistForUser
from rest_framework import routers
from django.urls import path, include
from .views import getUsersForTherapist, ChatMessages, ChatMessagesView, getMessagesForUser, UserTherapistView

# router = routers.DefaultRouter()
# router.register('')


# urlpatterns = [
#     path('home', RoomView.as_view()),
#     path('users', UserView.as_view()),
#     path('create_room', CreateRoomView.as_view()),
#     path('chatbot', MyChatbotView.as_view() ),
    
#     # path('user', UserViewSet.as_view() ),
# ]


router = routers.DefaultRouter()
router.register('users', UserViewSet)
# router.register('books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chatbot', MyChatbotView.as_view() ),
    path('room', RoomView.as_view()),
    path('messages', ChatbotMessages.as_view() ),
    path('auth/', CustomObtainAuthToken.as_view(), name='api_token_auth'),
    path('auth/logout/', Logout.as_view()),
    path('counter', getCountersForChart.as_view()),
    path('polarity', getMessagePolarity.as_view()),
    path('patients', getUsersForTherapist.as_view()),
    path('chat_messages', ChatMessages.as_view()),
    path('chats',ChatMessagesView.as_view()),
    path('chats_for_user', getMessagesForUser.as_view()),
    path('therapist', getTherapistForUser.as_view()),
    path('tag', getTagsForDashboard.as_view()),
    path('user_therapist', UserTherapistView.as_view()),
    path('quotes', QuotesView.as_view()),
    # path('user',GetUserByToken.as_view())
]