from django.urls import path, re_path
from chat.views import chat_rooms
from chat.consumers import ChatRoomConsumer, NotificationConsumer, VideoCallConsumer
from chat.views import check_websocket

websocket_urlpatterns = [
    path('ws/test', NotificationConsumer.as_asgi()),
    path('ws/chat/<str:room_name>', ChatRoomConsumer.as_asgi()),
    path('ws/call/<str:room_name>', VideoCallConsumer.as_asgi()),
]
