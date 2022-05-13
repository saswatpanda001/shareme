from statistics import mode
from django.contrib import admin
from shareme import models


@admin.register(models.Products)
class ProductDisplay(admin.ModelAdmin):
    list_display = ('title', 'id', 'seller')


admin.site.register(models.Comment)
admin.site.register(models.Cart)
admin.site.register(models.SaveLater)
admin.site.register(models.SubCategory)
admin.site.register(models.Category)
admin.site.register(models.LocalCategory)

