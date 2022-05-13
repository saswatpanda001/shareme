from dataclasses import field
from rest_framework.serializers import ModelSerializer
from sales.models import Orders


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"

# ["title", "buyer", "seller","quantity", "net_price", "product", "image", "category"]
