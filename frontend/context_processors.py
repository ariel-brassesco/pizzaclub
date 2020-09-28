from orders.models import Place, Shipping

def place_info(request):
    return {
        'OWNER': Place.objects.first(),
        'DELIVERY_COST': Shipping.objects.last().cost,
        }
