# Generated by Django 3.1.1 on 2020-09-09 11:54

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order', models.AutoField(primary_key=True, serialize=False)),
                ('order_type', models.CharField(choices=[('whatsapp', 'whatsapp'), ('phone', 'phone'), ('local', 'local'), ('pedidos ya', 'pedidos ya')], max_length=10)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('shipping', 'shipping'), ('open', 'open'), ('cancel', 'cancel'), ('pending', 'pending'), ('processing', 'processing'), ('delivering', 'delivering'), ('ready', 'ready')], max_length=10)),
                ('table', models.PositiveSmallIntegerField(null=True)),
                ('comment', models.TextField(blank=True, default='', null=True)),
                ('total', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=100)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('unitary_price', models.FloatField(default=0.0)),
                ('unitary_cost', models.FloatField(default=0.0)),
                ('total', models.FloatField(default=0.0)),
                ('total_cost', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('instagram', models.URLField()),
                ('whatsapp', models.URLField()),
                ('cuil', models.CharField(max_length=12, unique=True, validators=[django.core.validators.MinLengthValidator(11), django.core.validators.MaxLengthValidator(12), django.core.validators.RegexValidator(regex='^\\d+$')])),
                ('phone', models.CharField(blank=True, max_length=11, null=True, validators=[django.core.validators.MinLengthValidator(7), django.core.validators.MaxLengthValidator(11), django.core.validators.RegexValidator(regex='^\\d+$')])),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PriceList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('is_available', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Shipping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SizeProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TypeProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SubTypeProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('type_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.typeproduct')),
            ],
        ),
    ]
