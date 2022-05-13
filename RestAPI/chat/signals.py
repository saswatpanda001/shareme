from django.db.models.signals import post_save
from django.dispatch import receiver
from chat.models import Messages
from accounts.models import UserProfileModel



@receiver(post_save, sender=Messages, dispatch_uid="update_stock_count")
def include_senderimage(sender, instance,created, **kwargs):
    if created == True:
        x = UserProfileModel.objects.get(user=instance)
        print(x)
        print(instance)
        
        # instance.sender_image = x.image
        # instance.save()


