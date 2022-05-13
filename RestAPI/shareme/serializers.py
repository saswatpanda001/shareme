
from rest_framework.serializers import ModelSerializer
from shareme.models import Products, Comment, Cart, Category, SaveLater, SubCategory


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['title', 'content', 'username',
                  'user', 'id', 'likes', 'user_image', 'comment_time']


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class CartegorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SubCartegorySerializer(ModelSerializer):
    class Meta:
        model = SubCategory
        fields = "__all__"


class SaveLaterSerializer(ModelSerializer):
    class Meta:
        model = SaveLater
        fields = "__all__"
