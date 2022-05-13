

from rest_framework.response import Response
from chat.serializers import MessageSerializer
import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer, AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from chat.models import Messages
from chat.serializers import MessageSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "test_room"
        self.room_group_name = "test_group"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        status = json.dumps({"status": "connected"})
        self.send(text_data=status)

    def disconnect(self):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        # print(data)
        self.send(json.dumps(data))

        # send_data = json.dumps(
        #     {"msg": "message recieved", "msg_data": data["msg_data1"]})
        # self.send(send_data)

    def send_notification(self, event):
        a = json.loads(event["value"])
        status = json.dumps(a)
        self.send(text_data=status)


class VideoCallConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        name = self.scope['url_route']['kwargs']['room_name']
        index = name.index("-")
        sender = int(name[:index])
        reciever = int(name[index+1:])

        if(sender > reciever):
            self.room_name = str(reciever)+"-"+str(sender)
        else:
            self.room_name = str(sender)+"-"+str(reciever)

        self.room_group_name = "group_"+self.room_name

        await (self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        await self.send(json.dumps(
            {"room": self.room_name, "group": self.room_group_name, "status": "connected"}))

    async def disconnect(self, close_code):
        await (self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        # print("rec", data)

        await (self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'sendvideomessage',
                'message': {"data": data["data"]},
            }
        )

    async def sendvideomessage(self, event):
        # print("vm", event["message"])
        await self.send(json.dumps(event["message"]))


#  elif(mesg["type"] == "fetch"):
#             index = msg_id.index("-")
#             sender = int(msg_id[:index])
#             reciever = int(msg_id[index+1:])

#             s_mg = Messages.objects.filter(code=str(sender)+"-"+str(reciever))
#             r_mg = Messages.objects.filter(code=str(reciever)+"-"+str(sender))
#             total_msg = s_mg.union(r_mg)
#             total_msg = total_msg.order_by("-time")[:10]
#             ser_msg = MessageSerializer(total_msg, many=True)
#             print("fetch")
#             pass_data = []
#             for each in ser_msg.data:
#                 pass_data.append(json.dumps(each))
#             async_to_sync(self.channel_layer.group_send)(
#                 self.room_group_name,
#                 {
#                     'type': 'sendMessage',
#                     'message': pass_data,
#                 }
#             )


class ChatRoomConsumer(WebsocketConsumer):
    
    def connect(self):
        name = self.scope['url_route']['kwargs']['room_name']
        index = name.index("-")
        sender = int(name[:index])
        reciever = int(name[index+1:])

        if(sender > reciever):
            self.room_name = str(reciever)+"-"+str(sender)
        else:
            self.room_name = str(sender)+"-"+str(reciever)

        self.room_group_name = "group_"+self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.send(json.dumps(
            {"room": self.room_name, "group": self.room_group_name, "status": "connected"}))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        mesg = json.loads(text_data)

        sender = ""
        reciever = ""
        msg_id = mesg['code']

        if(msg_id and mesg["type"] == "send"):

            index = msg_id.index("-")
            sender = int(msg_id[: index])
            reciever = int(msg_id[index+1:])
            mesg = json.loads(text_data)

            mesg["sender_name"] = User.objects.get(id=sender).username
            mesg["reciever_name"] = User.objects.get(id=reciever).username
            mesg["sender"] = sender
            mesg["reciever"] = reciever

            ser_data = MessageSerializer(data=mesg, many=False)
            if ser_data.is_valid():
                ser_data.save()

                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'sendMessageFeed',
                        'message': {"status": "success"},
                    }
                )

    def sendMessageFeed(self, event):
        self.send(json.dumps(event["message"]))
