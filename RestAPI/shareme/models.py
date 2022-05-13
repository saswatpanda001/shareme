
import uuid
from django.utils import timezone
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from accounts.models import UserProfileModel
User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class LocalCategory(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name


class Products(models.Model):

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, blank=True, null=True)
    subcategory = models.ForeignKey(
        SubCategory, on_delete=models.PROTECT, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    brand_name = models.CharField(max_length=50, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, blank=True, null=True)
    posted = models.DateTimeField(default=timezone.now)
    image = models.ImageField(
        upload_to='products', default='products/def_post.jpeg', blank=True, null=True)
    image_a = models.ImageField(
        upload_to='products', default='products/def_post.jpeg', blank=True, null=True)
    image_b = models.ImageField(
        upload_to='products', default='products/def_post.jpeg', blank=True, null=True)
    image_c = models.ImageField(
        upload_to='products', default='products/def_post.jpeg', blank=True, null=True)

    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)

    units_sold = models.IntegerField(blank=True, null=True,default=0)
    total_reviews = models.IntegerField(blank=True, null=True,default=0)
    review_likes = models.IntegerField(blank=True, null=True,default=0)
    likes = models.ManyToManyField(User, blank=True, related_name="post_likes")
    stars = models.IntegerField(blank=True,null=True,default=0)
    activityscore = models.IntegerField(blank=True,null=True,default=0)
    priority = models.IntegerField(blank=True,null=True,default=0)
    

    class Meta:
        ordering = ('-posted',)

    def save(self, *args, **kwargs):
        self.slug = str(uuid.uuid4())
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    title = models.IntegerField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    commented = models.DateTimeField(default=timezone.now)
    username = models.CharField(max_length=60, blank=True, null=True)
    likes = models.ManyToManyField(
        User, blank=True, related_name="comment_likes")
    user_image = models.ImageField(
        upload_to="comment", default="comments/def_comment.jpg")
    comment_time = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        print(self.user_image)
        self.user_image = UserProfileModel.objects.get(user=self.user).image
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Cart(models.Model):
    title = models.CharField(max_length=60, blank=True, null=True)
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="buyer")
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="seller")
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, blank=True, null=True, related_name="product")
    quantity = models.IntegerField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    net_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(
        upload_to="cart", default="cart/cart.png", blank=True, null=True)
    time = models.DateTimeField(default=timezone.now)

    def save(self,*args,**kwrags): 
        if(self.image == "cart/cart.png"):
            self.image = self.product.image
        self.price = self.product.price
        return super().save(*args,**kwrags)

    


    def __str__(self):
        return self.title


class SaveLater(models.Model):
    title = models.CharField(max_length=60, blank=True, null=True)
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="buyer1")
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="seller1")
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, blank=True, null=True, related_name="product1")
    quantity = models.IntegerField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    net_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(
        upload_to="cart", default="cart/cart.png", blank=True, null=True)
    time = models.DateTimeField(default=timezone.now)

    def save(self,*args,**kwrags):
        if(self.image == "cart/cart.png"):
            self.image = self.product.image
        return super().save(*args,**kwrags)

    def __str__(self):
        return self.title
