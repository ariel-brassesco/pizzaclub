# Generated by Django 3.1.1 on 2020-09-14 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0003_auto_20200914_0557'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='lat',
            field=models.DecimalField(decimal_places=7, default=0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='address',
            name='lon',
            field=models.DecimalField(decimal_places=7, default=0, max_digits=9),
        ),
    ]