# Generated by Django 4.0.4 on 2022-05-06 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0010_rename_mobile_orders_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='phone',
            field=models.CharField(blank=True, max_length=13, null=True),
        ),
    ]
