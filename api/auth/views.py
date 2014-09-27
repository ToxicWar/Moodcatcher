# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from api.auth.serializers import UserSerializer, AuthSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AuthView(GenericAPIView):
    model = User
    serializer_class = AuthSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.DATA)
        if serializer.is_valid():
            login(request, serializer.object['user'])
            return Response(UserSerializer(request.user).data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        logout(request)
        return Response()
