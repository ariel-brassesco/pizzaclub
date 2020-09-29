from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import User


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):

    return Response(
        {
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        }
    )


@api_view(["POST"])
@permission_classes([IsAdminUser])
def register(request):
    user = User(**request.data)
    user.set_password(request.data["password"])
    res = user.save()

    return Response({"ok": True})
