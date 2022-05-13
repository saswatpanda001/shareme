from os import name
from django.urls import path
from accounts.views import BlackListTokenView, getProfile, retrieveProfiles,UserRegistration
app_name = "accounts"

urlpatterns = [
    # path('register/', UserRegistration.as_view(), name="register"),
    path('logout/blacklist', BlackListTokenView.as_view(), name="tok_blacklist"),
    path('profile/<int:pk>', getProfile, name="user_profile"),
    path('retrieve_profiles/<int:id>', retrieveProfiles, name="retrieveProfiles"),
]
