from email.message import Message
from django.contrib import admin
from chat.models import GroupChat, Messages, Notifications

admin.site.register(GroupChat)
admin.site.register(Messages)
admin.site.register(Notifications)
