from django.db import models


# class Notifications(models.Model):
#     title = models.CharField(max_length=300, blank=True, null=True)
    
#     sender_data = models.CharField(max_length=300, blank=True, null=True)
#     reciever_data = models.CharField(max_length=300, blank=True, null=True)

#     sender_name = models.CharField(max_length=300, blank=True, null=True)
#     reciever_name = models.CharField(max_length=300, blank=True, null=True)
    
#     seen = models.BooleanField(default=False, blank=True, null=True)
#     reciever = models.ForeignKey(
#         User, on_delete=models.CASCADE, blank=True, null=True, related_name="notification_reciever")
#     sender = models.ForeignKey(
#         User, on_delete=models.CASCADE, blank=True, null=True, related_name="notification_sender")
#     # sender_image = models.ImageField(upload_to='notifications/',
#     #                           default="notifications/profile1.jpg", blank=True, null=True)
#     # reciever_image = models.ImageField(upload_to='accounts/',
#     #                           default="accounts/profile1.jpg", blank=True, null=True)

#     time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    

#     def __str__(self):
#         return self.title



# class Notifications(models.Model):
#     title = models.CharField(max_length=300, blank=True, null=True)
    
#     sender_data = models.CharField(max_length=300, blank=True, null=True)
#     reciever_data = models.CharField(max_length=300, blank=True, null=True)

#     sender_name = models.CharField(max_length=300, blank=True, null=True)
#     reciever_name = models.CharField(max_length=300, blank=True, null=True)
    
#     seen = models.BooleanField(default=False, blank=True, null=True)
#     reciever = models.ForeignKey(
#         User, on_delete=models.CASCADE, blank=True, null=True, related_name="activity_reciever")
#     sender = models.ForeignKey(
#         User, on_delete=models.CASCADE, blank=True, null=True, related_name="activity_sender")
#     # sender_image = models.ImageField(upload_to='notifications/',
#     #                           default="notifications/profile1.jpg", blank=True, null=True)
#     # reciever_image = models.ImageField(upload_to='accounts/',
#     #                           default="accounts/profile1.jpg", blank=True, null=True)

#     time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    


#     def __str__(self):
#         return self.title