from dataclasses import field
from email.message import Message
from rest_framework.serializers import ModelSerializer
from chat.models import Messages, Notifications


class MessageSerializer(ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"


class NotificationSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Notifications
