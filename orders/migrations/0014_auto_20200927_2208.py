# Generated by Django 3.1.1 on 2020-09-27 22:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0005_auto_20200927_2208'),
        ('orders', '0013_remove_place_logo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='margen',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='total_cost',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='unitary_cost',
        ),
        migrations.AlterField(
            model_name='order',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='registration.client'),
        ),
        migrations.AlterField(
            model_name='order',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='employee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='registration.employee'),
        ),
        migrations.AlterField(
            model_name='order',
            name='shipping',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.shipping'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.pricelist'),
        ),
    ]
