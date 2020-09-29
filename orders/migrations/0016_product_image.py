# Generated by Django 3.1.1 on 2020-09-29 04:56

from django.db import migrations, models
import gdstorage.storage


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0015_auto_20200928_0253'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default=1, storage=gdstorage.storage.GoogleDriveStorage(), upload_to='products/'),
            preserve_default=False,
        ),
    ]