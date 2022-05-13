
from django.utils import timezone
from shareme.models import Products
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()






class Orders(models.Model):
    status_choice = (
    ('1', "order placed"),
    ('2', "order processing"),
    ('3', "shipped"),
    ('4', "on the way"),
    ('5', "out for delivery"),
    ('6', "delivered"),
    )

    

    

    transaction_id = models.CharField(max_length=40, blank=True, null=True)
    title = models.CharField(max_length=60, blank=True, null=True)

    firstname = models.CharField(max_length=60, blank=True, null=True)
    lastname = models.CharField(max_length=60, blank=True, null=True)
    email = models.CharField(max_length=60, blank=True, null=True)
    phone = models.CharField(max_length=13,blank=True, null=True)
    address = models.TextField(max_length=300, blank=True, null=True)

    
    city = models.CharField(max_length=100,blank=True,null=True)
    pincode = models.IntegerField(blank=True, null=True)
    notes = models.TextField(blank=True,null=True)

    
    
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="buyer_order")
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="seller_order")
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, blank=True, null=True, related_name="product_order")
    image = models.ImageField(
        upload_to="orders", default="orders/orders.png", blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    net_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    ordered_time = models.DateTimeField(default=timezone.now)
    delivered_time = models.DateTimeField(default=timezone.now)
   
    status = models.CharField(
        max_length=40, choices=status_choice, blank=True, null=True, default=1)

    def __str__(self):
        return self.title
