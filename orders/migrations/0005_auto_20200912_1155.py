# Generated by Django 3.1.1 on 2020-09-12 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20200912_1140'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='order_n',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='typeproduct',
            name='order_n',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]