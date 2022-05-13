import email
from statistics import mode
from turtle import Turtle
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfileModel(models.Model):

    status = (('1', 'single'), ('2', 'married'),
              ('3', 'committed'), ('4', 'prefered not to say'))
    email = models.EmailField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=150, blank=True, null=True)

    adress = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='accounts/',
                              default="accounts/profile1.jpg", blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    following = models.ManyToManyField(
        User, blank=True, related_name="following")
    followers = models.ManyToManyField(
        User, blank=True,  related_name="followers")
    text = models.ManyToManyField(
        User, blank=True,  related_name="text")
    recent_vposts = models.CharField(max_length=400, blank=True, null=True)

    def save(self, *args, **kwargs):
        print(self.user.email)
        self.email = self.user.email
        self.name = self.user.username
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username


# class CustomAccountManager(BaseUserManager):

#     def create_superuser(self, email, user_name, name, password, **other_fields):

#         other_fields.setdefault('is_staff', True)
#         other_fields.setdefault('is_superuser', True)
#         other_fields.setdefault('is_active', True)

#         # if other_fields.get('is_staff') is not True:
#         #     raise ValueError(
#         #         'Superuser must be assigned to is_staff=True.')
#         # if other_fields.get('is_superuser') is not True:
#         #     raise ValueError(
#         #         'Superuser must be assigned to is_superuser=True.')

#         return self.create_user(email, user_name, name, password, **other_fields)

#     def create_user(self, email, user_name, name, password, **other_fields):

#         if not email:
#             raise ValueError(_('You must provide an email address'))

#         email = self.normalize_email(email)
#         user = self.model(email=email, user_name=user_name,
#                           name=name, **other_fields)
#         user.set_password(password)
#         user.save()
#         return user


# class NewUser(AbstractBaseUser, PermissionsMixin):

#     gender_options = (("1", "male"), ("2", "female"), ("3", "other"))
#     status_options = (("1", "single"), ("2", "married"), ("3", "commited"),
#                       ("4", "confused"), ("5", "don't bother about it"))

#     email = models.EmailField(_('email address'), unique=True)
#     user_name = models.CharField(
#         _('username '), max_length=150, unique=True)

#     key = models.CharField(max_length=100, blank=True, null=True)
#     name = models.CharField(_('full name'),
#                             max_length=150, blank=True, null=True)
#     birthplace = models.CharField(max_length=150, blank=True, null=True)
#     date_of_birth = models.DateField(blank=True, null=True)
#     location = models.CharField(
#         _('tell us where you live right now'), max_length=150, blank=True, null=True)
#     job = models.CharField(_('what do you do for a living'),
#                            max_length=150, blank=True, null=True)
#     school = models.CharField(max_length=150, blank=True, null=True)
#     college = models.CharField(max_length=150, blank=True, null=True)
#     country = models.CharField(max_length=150, blank=True, null=True)
#     life_goals = models.CharField(
#         _('what are your long terms dreams and fantasies'), max_length=150, blank=True, null=True)
#     status = models.CharField(
#         max_length=150, choices=status_options, blank=True, null=True)

#     start_date = models.DateTimeField(
#         _('when did you started using our application'), default=timezone.now)
#     about = models.TextField(_(
#         'about'), max_length=500, blank=True, null=True)
#     gender = models.CharField(
#         max_length=150, choices=gender_options, blank=True, null=True)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     objects = CustomAccountManager()

#     USERNAME_FIELD = 'user_name'
#     REQUIRED_FIELDS = ['email', 'name']

#     def __str__(self):
#         return self.user_name
