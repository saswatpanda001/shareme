

from contextlib import nullcontext
from itertools import islice
import json
from os import stat
from tkinter import SEL_LAST
import uuid

from yaml import serialize

from rest_framework.response import Response
from django.db.models import Q
from rest_framework import generics, viewsets, filters
from shareme.models import Products, Comment, Cart, Category, SaveLater,SubCategory
from shareme.serializers import SubCartegorySerializer,CartSerializer, CommentSerializer, ProductSerializer, CartegorySerializer, SaveLaterSerializer
from rest_framework.permissions import BasePermission, AllowAny, SAFE_METHODS, IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated
from rest_framework.decorators import api_view
from collections import OrderedDict
from accounts.models import UserProfileModel
from accounts.serializers import UserProfileSerializer
from django.utils import timezone
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector, TrigramSimilarity, TrigramDistance, TrigramBase
from django.contrib.auth import get_user_model
User = get_user_model()
from chat.models import Notifications



# class CostumPermissions(BasePermission):
#     def has_object_permission(self, request, view, obj):
#         if request.method == SAFE_METHODS:
#             return True


@api_view(['GET', 'POST'])
def ProductList(request):

    # a = Products.objects.all()
    # ser = ProductSerializer(a,many=True)
    # return Response(ser.data)

   
    data = Products.objects.all()[:20]


    if(request.data):
       
        start_pos = request.data["start"]
        end_pos = request.data["end"]

        search = request.data["search"]
       

        # query = SearchQuery(str(search))
        # vector = SearchVector('title', weight='B') + \
        #     SearchVector('content', weight='A')

        tech = Q(title__icontains=search) | Q(content__icontains=search)
        data = Products.objects.filter(tech).order_by("-activityscore")[start_pos:end_pos]

        # data = Products.objects.annotate(
        #     rank=SearchRank(vector, query, cover_density=True)).order_by("-rank")[:10]

        # data = Products.objects.annotate(similarity=TrigramSimilarity('title',search)).filter(similarity_gt=0.3).order_by("-similarity")

        ser = ProductSerializer(data, many=True)

        return Response(ser.data)
    else:
        return Response({"a": "null"})


# @api_view(['GET'])
# def postDetails(request, pk):
#     a = Products.objects.get(id=pk)
#     ser = ProductSerializer(a, many=False)
#     return Response(ser.data)





class CreateProducts(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self,request):
        print(request.data)
        return super().get_queryset()
    


class ManageProducts(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def get_queryset(self):
        product_id = self.kwargs['id']
        user_id = self.kwargs['user_id']
        x = UserProfileModel.objects.get(id=user_id)
        if(product_id>0):
            x.recent_vposts =str(product_id)+" "+str(x.recent_vposts)
            
            x.save()
        
        return super().get_queryset()
    
@api_view(['GET'])
def GetCategories(request):
    cat = Category.objects.all()
    ser = CartegorySerializer(cat, many=True)
    return Response(ser.data)

@api_view(['GET'])
def GetSubCategories(request):
    cat = SubCategory.objects.all()
    ser = SubCartegorySerializer(cat, many=True)
    return Response(ser.data)



@api_view(['GET', 'POST','DELETE'])
def GetComments(request, pk):
    if(request.method == "GET"):
        comm = Comment.objects.filter(title=pk).order_by("-commented")
        ser = CommentSerializer(comm, many=True)

        return Response(ser.data)
    
    elif request.method == "DELETE":
       
        comment = Comment.objects.get(id=pk)
        prd = Products.objects.get(id=comment.title)
        notf_new = Notifications.objects.create(
                sender_data = "You deleted your comment on product "+ prd.title,
                reciever_data = "You deleted your comment on product "+ prd.title,
                title="deletecomment",
                sender= comment.user,
                reciever= comment.user,
                sender_name = comment.user.username,
                reciever_name = comment.user.username,
        )
        save_not = notf_new.save()


        x = comment.delete()
        prd.total_reviews -= 1
        prd.activityscore -= 1
        prd.save()

       
        return Response("done")


    elif(request.method == "POST" and request.data != None):
        comment = request.data

        current_user =  User.objects.get(id=request.data["user_id"])
        current_prd = Products.objects.get(id=pk)
       
        comment["title"] = pk
        comment["user"] = request.data["user_id"]
        comment["username"] = current_user.username
        ser = CommentSerializer(data=comment, many=False)

        if ser.is_valid():
            ser.save()
            current_prd.total_reviews += 1
            current_prd.activityscore += 1
            current_prd.save()


            notf_new = Notifications.objects.create(
                sender_data = "you made a comment on the product" + current_prd.title,
                reciever_data = current_prd.username + "commented on product "+ current_prd.title,
                title="add comment",
                sender= current_user,
                reciever= current_prd.seller,
                sender_name = current_user.username,
                reciever_name = current_prd.username,
            )
            save_not = notf_new.save()


            return Response("comment posted")


@api_view(['GET', 'POST'])
def LikePostComments(request, pk):
    if request.method == "POST":
      
        user_id = request.data["user_id"]
        com_id = request.data["comment_id"]
        user_inst = User.objects.get(id=user_id)

        comment = Comment.objects.get(id=com_id)

        if user_inst in comment.likes.all():
            a = comment.likes.remove(user_inst)
            res = "remove"

            cr_prd = Products.objects.get(id=int(comment.title))
            cr_prd.review_likes -=1
            cr_prd.activityscore -=1
            cr_prd.save()

            x = Notifications.objects.create(
                sender_data = "You unliked "+ comment.user.username+ " comment",
                reciever_data =  user_inst.username +" unliked your comment",
                title="unlikecomment",
                sender=user_inst,
                reciever=comment.user,
                sender_name = user_inst.username,
                reciever_name = comment.user.username,
            )

            
            x.save()

           

           

        else:
            a = comment.likes.add(user_inst)
            res = "add"

            cr_prd = Products.objects.get(id=int(comment.title))
            cr_prd.review_likes +=1
            cr_prd.activityscore +=1
            cr_prd.save()


            x = Notifications.objects.create(
                sender_data = "You liked "+ comment.user.username+ " comment",
                reciever_data =  user_inst.username +" liked your comment",
                title="likecomment",
                sender=user_inst,
                reciever=comment.user,
                sender_name = user_inst.username,
                reciever_name = comment.user.username,
            )

           

            x.save()



            

           



        comment_like_data = comment.likes.all()
        if(user_inst in comment_like_data):
            liked = True
        else:
            liked = False

        data = [(each.id, each.username) for each in comment_like_data]
        total_likes = len(comment_like_data)
        return Response({"res": res, "data": data, "likes": total_likes, "liked": liked})



@api_view(['POST', 'GET'])
def PostRecommendation(request):
   
    catSet = set()
    cartProducts = Cart.objects.filter(buyer=request.data["user_id"])
    prd_id = []

    for each in cartProducts:
        catSet.add(each.category)
        prd_id.append(each.product.id)

    # no of units sold,likes
    # no of likes in reviews,no of reviews,

    x = []
    for each in catSet:
        query = Products.objects.filter(
            category=each).order_by("-units_sold")

        ser = ProductSerializer(query, many=True).data
        for each in ser:
            if(each["id"] not in prd_id):
                x.append(each)
    # data = sorted(x,  key=lambda each: each["units_sold"], reverse=True)
    return Response(x)



@api_view(['GET'])
def SingleProductRecommendation(request,category,pr_id):
    
    x = Products.objects.filter(category=category).exclude(id=pr_id)
    ser = ProductSerializer(x, many=True)
    return Response(ser.data)





@api_view(['GET', 'POST'])
def LikePosts(request, pk,user_id):

    if request.method == "GET":
        x = Products.objects.get(id=pk).likes.all()
        cr_user = User.objects.get(id=user_id)
        data = [(each.username, each.id) for each in x]
        if cr_user in x:
            status = "liked"
        else:
            status = "notliked"


        return Response({"total":len(x),"status":status,"data":data})





    if request.method == "POST":
        user_id = request.data["user_id"]
        c_post = Products.objects.get(id=pk)
        user_inst = User.objects.get(id=user_id)


        if user_inst in c_post.likes.all():
            a = c_post.likes.remove(user_id)
            res = "notliked"
            c_post.activityscore -=1
            c_post.save()

            new_not = Notifications.objects.create(
                    sender_data = "you unliked "+ c_post.seller.username +"'s product "+c_post.title[:15],
                    reciever_data = user_inst.username +" unliked your product "+c_post.title[:15],
                    title="unlike post",
                    sender= user_inst,
                    reciever= c_post.seller,
                    sender_name = user_inst.username,
                    reciever_name = c_post.seller.username,
            )
            save_not = new_not.save()
          
        else:
            a = c_post.likes.add(user_id)
            res = "liked"

            new_not = Notifications.objects.create(
                    sender_data = "you liked "+ c_post.seller.username +"'s product "+c_post.title[:15],
                    reciever_data = user_inst.username +" liked your product "+c_post.title[:15],
                    title="like post",
                    sender= user_inst,
                    reciever= c_post.seller,
                    sender_name = user_inst.username,
                    reciever_name = c_post.seller.username,
            )
            save_not = new_not.save()
            c_post.activityscore +=1
            c_post.save()

            
        c = c_post.likes.all()
        total_likes = len(c)
        data = [(each.username, each.id) for each in c]
        status = None
        return Response({"likes": total_likes, "status":res, "data": data})






@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def ProductCart(request, pk):
    if request.method == "PUT":
       
        cart_obj = Cart.objects.get(id=request.data["id"])

        if(request.data["type"] == "dec" and cart_obj.quantity> 0):
           
            cart_obj.net_price -= cart_obj.price
            cart_obj.quantity -=1
            
        
        elif(request.data["type"] == "inc"):
           
            cart_obj.net_price += cart_obj.price
            cart_obj.quantity +=1
           

        ser_data = {"id":request.data["id"],"quantity":cart_obj.quantity,"net_price":cart_obj.net_price}
        cart_ser = CartSerializer(
            data=ser_data, instance=cart_obj, many=False)

        if cart_ser.is_valid():
            cart_ser.save()

            return Response(cart_ser.data)
        else:
            return Response(cart_ser.err)
      

    if request.method == "DELETE":
        cart_obj = Cart.objects.get(id=pk)
        cr_user = User.objects.get(id=cart_obj.buyer.id)


        new_not = Notifications.objects.create(
                    sender_data = "You deleted the product "+ cart_obj.title[:15] +" from the cart",
                    reciever_data = "You deleted the product "+ cart_obj.title[:15] +" from the cart",
                    title="delete product from the cart",
                    sender= cr_user,
                    reciever= cr_user,
                    sender_name = cr_user.username,
                    reciever_name = cr_user.username,
                )
        print(new_not)
        save_not = new_not.save()
        cart_obj.delete()





        return Response("done")

    if request.method == "GET":
        cart_obj = Cart.objects.filter(buyer=pk).order_by("-time")
        cart_ser = CartSerializer(cart_obj, many=True)
        return Response(cart_ser.data)

    if request.method == "POST":
        data = request.data
        cart_obj = None
        try:
            cart_obj = Cart.objects.get(
                product=data["product"], buyer=data["buyer"], seller=data["seller"])
        except:
            pass

        if(cart_obj):
          
            data["quantity"] = int(data["quantity"]) + int(cart_obj.quantity)

            data["net_price"] += cart_obj.net_price
            ser = CartSerializer(data=data, instance=cart_obj, many=False)
            if ser.is_valid():
                ser.save()

                cr_user = User.objects.get(id=data["buyer"])


                new_not = Notifications.objects.create(
                    sender_data = "You updated the product "+ data["title"][:15] +" in the cart",
                    reciever_data = "You updated the product "+ data["title"][:15] +" in the cart",
                    title="cart updated",
                    sender= cr_user,
                    reciever= cr_user,
                    sender_name = cr_user.username,
                    reciever_name = cr_user.username,
                )
                save_not = new_not.save()


                print("updated",data["buyer"])

                return Response({"a": "success"})
            else:
                return Response({"a": "failed"})

        else:
            ser = CartSerializer(data=data, many=False)
            if ser.is_valid():
                ser.save()

                
                cr_user = User.objects.get(id=data["buyer"])


                new_not = Notifications.objects.create(
                    sender_data = "You added the product "+ data["title"][:15] +" to the cart",
                    reciever_data = "You added the product "+ data["title"][:15] +" to the cart",
                    title="add product to the cart",
                    sender= cr_user,
                    reciever= cr_user,
                    sender_name = cr_user.username,
                    reciever_name = cr_user.username,
                )
                save_not = new_not.save()


                return Response({"a": "success"})
            else:
                return Response({"a": "failed"})


@api_view(['GET', 'POST'])
def GetUsersFromID(request):

    user_data = []
    for each in request.data:

        y = UserProfileModel.objects.get(user=each)
        z = json.dumps({"username": y.user.username,
                       "id": y.user.id})
      
    return Response("yes")




@api_view(['POST', 'GET','DELETE','PUT'])
def ProductSaveLaterView(request, pk):

    if request.method == "GET":
        x = SaveLater.objects.filter(buyer=pk).order_by("-time")
        ser = SaveLaterSerializer(x, many=True)
        return Response(ser.data)


    


    if request.method == "POST":
        a = Products.objects.get(id=request.data["id"])
       
       
        try:
            com_obj = SaveLater.objects.filter(buyer=request.data["buyer"]).filter(title=a.title)
            
        except:
            com_obj = []


        if len(com_obj) >=1:
            a = SaveLater.objects.filter(buyer=request.data["buyer"]).filter(title=a.title)[0]
            a.time = timezone.now()
            a.save()
            return Response("updated")
        else:
            obj = {"buyer":request.data["buyer"],"seller": int(a.seller.id), "product": a.id, "title": a.title, "category": int(a.category.id), "net_price": a.price}
           
            ser = SaveLaterSerializer(data=obj, many=False)
            
            if(ser.is_valid()):
                ser.save()

                user_obj = User.objects.get(id=request.data["buyer"])
               
                

                x = Notifications.objects.create(
                    sender_data = "You added the product "+ a.title[:15] +" on the save later section",
                    reciever_data = "You added the product "+ a.title[:15] +" on the save later section",
                    title="add product in savelater ",
                    sender= user_obj,
                    reciever= user_obj,
                    sender_name = user_obj.username,
                    reciever_name = user_obj.username,
                )
                x.save()
                
                return Response(ser.data)
            else:
                return Response(ser.errors)
           

   


    if request.method == "DELETE":
        savelater_prd = SaveLater.objects.get(id=pk)
     
        x = Notifications.objects.create(
                    sender_data = "You deleted your the product "+ savelater_prd.title +" from save later section",
                    reciever_data = "You deleted your the product "+ savelater_prd.title +" from save later section",
                    title="deletecomment",
                    sender= savelater_prd.buyer,
                    reciever= savelater_prd.buyer,
                    sender_name = savelater_prd.buyer.username,
                    reciever_name = savelater_prd.buyer.username,
                )
        x.save()
        
        y = savelater_prd.delete()
        return Response("del")





@api_view(['GET'])
def RetrieveRecentlyViewedProducts(request,u_id):
    recent_prd  = UserProfileModel.objects.get(id=1).recent_vposts

    filter_recent = []
    
    num = ""

    for each in recent_prd:
        if(each == " "):
            try:
                if(int(num)):
                  if(int(num) not in filter_recent):
                   filter_recent.append(int(num))
                   num = ""
                  else:
                   num=""
            except:
                pass   
        else:
          try:
             if(int(each)>=0):
               num += each
          except:
            pass

    
    prd_ser = []
    for each in filter_recent:
        prd = Products.objects.filter(id=each)
        ser = ProductSerializer(prd[0],many=False)
        prd_ser.append(ser.data)   
    return Response(prd_ser)



