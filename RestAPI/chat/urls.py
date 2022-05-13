import imp
from unicodedata import name
from django.urls import include, path
from chat.views import chat_rooms, message_view, check_websocket,notification

app_name = "chat_room"

urlpatterns = [
    path("<int:room_id>", chat_rooms, name="chat_room"),
    path("text/<str:msg_id>", message_view, name="messages"),
    path("check", check_websocket, name="ws"),
    path("notifications/<int:pk>", notification, name="notification"),
   
]
