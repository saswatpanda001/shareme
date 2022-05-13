
from django.urls import path
from sales.views import OrderPlaceView, Recieved_Orders
app_name = "sales"

urlpatterns = [
    path("orders/<int:pk>", OrderPlaceView, name="orders"),
    path("orders_rec/<int:pk>",Recieved_Orders, name="orders_rec"),
    
]   
