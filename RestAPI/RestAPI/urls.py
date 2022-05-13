"""RestAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include,re_path

from rest_framework_simplejwt import views as jwt_view
from accounts.views import ObtainTokenPairView

urlpatterns = [


    path('admin/', admin.site.urls),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('shareme/', include('shareme.urls', namespace="shareme")),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('chat/', include('chat.urls', namespace="chat_room")),
    path('sales/', include('sales.urls', namespace="sales")),

    path('auth/', include('rest_framework.urls', namespace='rest_auth')),


    # path('api/get_token', jwt_view.TokenObtainPairView.as_view(),
    #      name='token_obtain_pair'),

    path('api/get_token',  ObtainTokenPairView.as_view(),
         name='token_obtain_pair'),

    path('api/verify_token', jwt_view.TokenVerifyView.as_view(), name='token_verify'),
    path('api/refresh_token', jwt_view.TokenRefreshView.as_view(),
         name='token_refresh'),







]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
