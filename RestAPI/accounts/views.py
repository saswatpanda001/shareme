from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.serializers import UserProfileSerializer, UserRegistrationSerializer
from accounts.models import UserProfileModel
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from accounts.serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.postgres.search import SearchVector
import json
from chat.models import Notifications


from django.contrib.auth import get_user_model
User = get_user_model()


class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = [AllowAny]


class UserRegistration(APIView):

    def post(self, request, format='json'):
        dta = request.data

        serializer = UserRegistrationSerializer(data=dta)

        if serializer.is_valid():
            user = serializer.save()
            # print(user)

            profile_data = {'name': str(dta['first_name'])+str(dta['last_name']),
                            'user': user.id}
            ser = UserProfileSerializer(data=profile_data, many=False)

            if ser.is_valid():
                prof = ser.save()

            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlackListTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        try:
            token = request.data['refresh_token']
            token.blacklist()
        except exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# @ api_view(['GET'])
# def confirm_username(request):
#     if(request.data):
#         confirmation = User.objects.get(
#             username=request.data['username']).exists()
#         return Response(confirmation)


@api_view(['GET', 'PUT', 'POST'])
def getProfile(request, pk):
    if request.method == "GET":
        a = UserProfileModel.objects.get(user=pk)
        ser = UserProfileSerializer(a, many=False)

        fr_data = [(each.username, each.id, each.email)
                   for each in a.followers.all()]

        fg_data = [(each.username, each.id, each.email)
                   for each in a.following.all()]

        cm_data = []
        for each in fr_data:
            if each in fg_data:
                a = {"name": each[0], "user": each[1], "email": each[2],
                     "phone": UserProfileModel.objects.get(user=each[1]).phone,
                     "image": str(UserProfileModel.objects.get(user=each[1]).image)
                     }

                cm_data.append(a)

        pass_obj = {"ser_data": ser.data,
                    "fr": fr_data, "fg": fg_data, "cm": cm_data}
       
        return Response(pass_obj)

    if request.method == "POST":
        d = request.data
        search = Q(name__icontains=d) | Q(
            email__icontains=d) | Q(phone__icontains=d)
        a = UserProfileModel.objects.filter(search)
        ser = UserProfileSerializer(a, many=True)

        return Response(ser.data)

    if request.method == "PUT":
        a = UserProfileModel.objects.get(user=pk)
        uid = request.data["user_id"]
        b = UserProfileModel.objects.get(user=uid)
        # print(uid)
        y = a.followers.all()
        remove = False
        for each in y:
            if uid == each.id:
                remove = True

       
        if remove == True:
            a.followers.remove(uid)
            b.following.remove(pk)
            # print("unfollow")

            x = Notifications.objects.create(
                sender_data = "You unfollowed "+ a.user.username ,
                reciever_data =  b.user.username +" unfollowed you",
                title="unfollow",
                sender=b.user,
                reciever=a.user,
                sender_name = b.user.username,
                reciever_name = a.user.username,
            )

            x.save()

           
            
        else:
            a.followers.add(uid)
            b.following.add(pk)
            # print("follow")

            x = Notifications.objects.create(
                
                sender_data = "You started following "+ a.user.username ,
                reciever_data =  b.user.username +" is following you",
                title="follow",
                sender=b.user,
                reciever=a.user,
                sender_name = b.user.username,
                reciever_name = a.user.username,
            )
            x.save()
           
           


        a.save()
        return Response("success")


@ api_view(['GET', 'PUT'])
def retrieveProfiles(request, id):
    if request.method == "GET":
        profile_text_data = UserProfileModel.objects.get(user=id)
        # print("ret_cont",profile_text_data)

        ser = UserProfileSerializer(profile_text_data, many=False)
       
        text_prof = ser.data["text"]
        data = []
        for each in text_prof:
            a = UserProfileModel.objects.get(user=each)
           
            serr = UserProfileSerializer(a, many=False)
            # print(serr.data)

            data.append(serr.data)
        # print(data)
        return Response(data)

    if request.method == "PUT":
        a = UserProfileModel.objects.get(user=id)
        if(request.data not in a.text.all()):
            a.text.add(request.data)
            a.save()
            return Response("done")
        else:
            return Response("alreadys added")

