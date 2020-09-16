from orders.models import Place

def place_info(request):
    return {
        'OWNER': Place.objects.first(),
        }