from ast import Or
from asyncio import constants
from email.mime import image
from unicodedata import category
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from sales.models import Orders
from sales.serializers import OrderSerializer
from shareme.models import Cart, Products
from rest_framework import generics
from rest_framework.permissions import AllowAny
import uuid
from django.contrib.auth import get_user_model
User = get_user_model()



@api_view(['GET', 'POST'])
def OrderPlaceView(request, pk):
    if request.method == "POST":
        buyer_id = pk

        cart_data = Cart.objects.filter(buyer=buyer_id)
        for each in cart_data:
            
            buyer_dt = request.data
            buyer_dt["transaction_id"] = str(uuid.uuid4())[:20]
            buyer_dt["image"] = each.image
            buyer_dt["quantity"] = each.quantity
            buyer_dt["category"] = each.category
            buyer_dt["net_price"] = each.net_price
            buyer_dt["buyer"] = each.buyer.id
            buyer_dt["seller"] = each.seller.id
            buyer_dt["title"] =each.title
            buyer_dt["product"] = each.product.id
            buyer_dt["phone"] = int(buyer_dt["phone"])
            buyer_dt["pincode"] = int(buyer_dt["pincode"])
            

            ser = OrderSerializer(data=buyer_dt,many=False)
            print(ser.is_valid())
            
            if(ser.is_valid()):
                ser.save()
               
                prd = Products.objects.get(id=each.product.id)
                print(prd,prd.units_sold,prd.activityscore,each.quantity)
                prd.units_sold += each.quantity
                prd.activityscore += each.quantity
                prd.save()
                print(prd,prd.units_sold,prd.activityscore)
                print("increasing sold unit by 1:",prd.units_sold)

                delCartItem = Cart.objects.filter(id=each.id).delete()

            else:
                print(ser.errors)

        return Response("order_endpoint")

    if request.method == "GET":
        orders = Orders.objects.filter(buyer=pk).order_by("-ordered_time")
        ser = OrderSerializer(orders, many=True)
        return Response(ser.data)


@api_view(['GET', 'POST','PUT'])
def Recieved_Orders(request,pk):
    if request.method == "GET":
        seller = User.objects.get(id=pk)
        x = Orders.objects.filter(seller=seller).exclude(status='6').order_by("-ordered_time")
        ser = OrderSerializer(x,many=True)
        return Response(ser.data)

    if request.method == "PUT":
        ord_id = int(request.data["order_id"])
        x = Orders.objects.get(id=ord_id)
        print(request.data,x)

        change_data = {"status":int(request.data["status"])}
        ser = OrderSerializer(data=change_data,instance=x,many=False)
        if(ser.is_valid()):
            print("valid req")
            ser.save()
            return Response("done")
        else:
            print("invalid req")
            return Response("invalid")


