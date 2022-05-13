import json
import time
from tkinter.messagebox import NO
from django.shortcuts import render
from http.client import responses
from django.http import JsonResponse
from numpy import pad
from chat.models import Messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from chat.serializers import MessageSerializer, NotificationSerializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
User = get_user_model()
from chat.models import Notifications
from django.db.models import Q

@api_view(['GET','DELETE'])
def notification(request,pk):
    if request.method == "GET":
        dta = Notifications.objects.filter(Q(sender=pk) | Q(reciever=pk)).order_by("-time")

       
        ser = NotificationSerializer(dta,many=True)
        return Response(ser.data)
    if request.method =="DELETE":
        notf = Notifications.objects.get(id=pk).delete()
        return Response("deleted")


@api_view(['GET', 'POST'])
def message_view(request, msg_id):
    sender = ""
    reciever = ""
    if(msg_id):
        index = msg_id.index("-")
        sender = int(msg_id[:index])
        reciever = int(msg_id[index+1:])

    if request.method == "GET":
        s_mg = Messages.objects.filter(code=str(sender)+"-"+str(reciever))
        r_mg = Messages.objects.filter(code=str(reciever)+"-"+str(sender))
        total_msg = s_mg.union(r_mg)
        total_msg = total_msg.order_by("time")
        ser_msg = MessageSerializer(total_msg, many=True)
        return Response(ser_msg.data)

    if request.method == "POST":
        mesg = request.data
        mesg["sender_name"] = User.objects.get(id=sender).username
        mesg["reciever_name"] = User.objects.get(id=reciever).username
        mesg["sender"] = sender
        mesg["reciever"] = reciever
        mesg["code"] = str(sender)+"-"+str(reciever)
        # print(mesg)
        ser_data = MessageSerializer(data=mesg, many=False)
        if ser_data.is_valid():
            ser_data.save()
            # print("done")
            return Response("done")
        else:
            # print("failed")
            return Response("failed")














async def check_websocket(request):
    ch_layer = get_channel_layer()
    for each in range(5):
        await (ch_layer.group_send)(
            "test_group", {
                "type": "send_notification",
                "value": json.dumps({"count": "each"}),
            }
        )
        time.sleep(1)
    return render(request, "home.html")


def chat_rooms(request, room_id):
    return JsonResponse({"room_id": room_id})