# Generated by Django 3.1.1 on 2020-09-09 11:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shipping',
            name='address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registration.address'),
        ),
        migrations.AddField(
            model_name='shipping',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registration.client'),
        ),
        migrations.AddField(
            model_name='product',
            name='subtype_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.subtypeproduct'),
        ),
        migrations.AddField(
            model_name='product',
            name='type_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.typeproduct'),
        ),
        migrations.AddField(
            model_name='pricelist',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.product'),
        ),
        migrations.AddField(
            model_name='pricelist',
            name='size',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.sizeproduct'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='orders.order'),
        ),
        migrations.AddField(
            model_name='order',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registration.client'),
        ),
        migrations.AddField(
            model_name='order',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registration.employee'),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='orders.shipping'),
        ),
    ]
