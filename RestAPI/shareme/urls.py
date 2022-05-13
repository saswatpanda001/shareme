from posixpath import basename
from venv import create
from django.urls import path
from django.views.generic import TemplateView
from shareme import views

app_name = "shareme"


urlpatterns = [
    path("", TemplateView.as_view(template_name="home.html")),
    path('posts', views.ProductList, name="postlist"),
    path('posts/<int:id>/<int:user_id>', views.ManageProducts.as_view(), name="postdetails"),
    path('posts/recommend', views.PostRecommendation, name="postrecommendation"),
    path('products/single_prd_recommend/<int:category>/<int:pr_id>', views.SingleProductRecommendation, name="singleprd_recommend"),

    path('products/recently_viewed/<int:u_id>', views.RetrieveRecentlyViewedProducts, name="recently_viewed_prd"),


    path('posts/<int:pk>/likes/<int:user_id>', views.LikePosts, name="post_likes"),

    path('posts/<int:pk>/comments', views.GetComments, name="postcomments"),
    path('posts/<int:pk>/comments/likes',
         views.LikePostComments, name="comments_likes"),
    path('getUserFromID',views.GetUsersFromID, name="getUsersFromID"),

    path('posts/new', views.CreateProducts.as_view(), name="newpost"),
    path('posts/categories', views.GetCategories, name="categories"),
    path('posts/subcategories', views.GetSubCategories, name="subcategories"),

    path('cart/<int:pk>', views.ProductCart, name="cart"),
    path('savelater/<int:pk>', views.ProductSaveLaterView, name="saveLater"),
]
