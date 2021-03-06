# Generated by Django 4.0.4 on 2022-04-29 05:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shareme', '0027_alter_cart_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='category',
        ),
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='post',
            name='seller',
        ),
        migrations.RemoveField(
            model_name='post',
            name='subcategory',
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50, null=True)),
                ('brand_name', models.CharField(blank=True, max_length=50, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('slug', models.SlugField(max_length=100, unique_for_date='posted')),
                ('url', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='products/def_post.jpeg', null=True, upload_to='products')),
                ('image_a', models.ImageField(blank=True, default='products/def_post.jpeg', null=True, upload_to='products')),
                ('image_b', models.ImageField(blank=True, default='products/def_post.jpeg', null=True, upload_to='products')),
                ('image_c', models.ImageField(blank=True, default='products/def_post.jpeg', null=True, upload_to='products')),
                ('username', models.CharField(blank=True, max_length=100, null=True)),
                ('units_sold', models.IntegerField(blank=True, null=True)),
                ('total_reviews', models.IntegerField(blank=True, null=True)),
                ('review_likes', models.IntegerField(blank=True, null=True)),
                ('stars', models.IntegerField(blank=True, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='shareme.category')),
                ('likes', models.ManyToManyField(blank=True, related_name='post_likes', to=settings.AUTH_USER_MODEL)),
                ('seller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('subcategory', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='shareme.subcategory')),
            ],
            options={
                'ordering': ('-posted',),
            },
        ),
        migrations.AlterField(
            model_name='cart',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product', to='shareme.products'),
        ),
        migrations.AlterField(
            model_name='savelater',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product1', to='shareme.products'),
        ),
    ]
