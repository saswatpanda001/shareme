
from email.policy import default
import json
from django.db import models
from django.utils import timezone
from asgiref.sync import async_to_sync, sync_to_async
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
User = get_user_model()


class GroupChat(models.Model):
    group_name = models.CharField(max_length=100, blank=True, null=True)
    message = models.CharField(max_length=100, blank=True, null=True)
    sender_name = models.CharField(max_length=100, blank=True, null=True)
    sender_id = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    time = models.DateTimeField(default=timezone.now, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.sender_name = self.sender_id.username
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.sender_name


class Messages(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="sender")
    sender_image = models.ImageField(upload_to="mesages",default="msg.png",blank=True,null=True)
    reciever = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="reciever")
    sender_name = models.CharField(max_length=100, blank=True, null=True)
    reciever_name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=100, blank=True, null=True)
    time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    data = models.CharField(max_length=300, blank=True, null=True)
    seen = models.BooleanField(default=False, blank=True, null=True)

  
    def __str__(self):
        return self.code


class Notifications(models.Model):
    title = models.CharField(max_length=300, blank=True, null=True)
    
    sender_data = models.CharField(max_length=300, blank=True, null=True)
    reciever_data = models.CharField(max_length=300, blank=True, null=True)

    sender_name = models.CharField(max_length=300, blank=True, null=True)
    reciever_name = models.CharField(max_length=300, blank=True, null=True)
    
    seen = models.BooleanField(default=False, blank=True, null=True)
    reciever = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="notification_reciever")
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="notification_sender")
    # sender_image = models.ImageField(upload_to='notifications/',
    #                           default="notifications/profile1.jpg", blank=True, null=True)
    # reciever_image = models.ImageField(upload_to='accounts/',
    #                           default="accounts/profile1.jpg", blank=True, null=True)

    time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    

    def save(self, *args, **kwargs):
        self.title = self.title
        # print("notfication_created....")
        # notf = Notifications.objects.filter(seen=False)
        # notf_count = len(notf)
        # pass_data = {"notf_all": notf, "count": notf_count}
        # ch_layer = get_channel_layer()

        # async_to_sync(ch_layer.group_send)(
        #     "chat_group", {
        #         "type": "send_notification",
        #         "value": pass_data,
        #     }
        # )
        # print("notfication area end")
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.title
