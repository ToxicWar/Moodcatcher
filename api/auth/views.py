# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from django.http import Http404
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from api.auth.serializers import UserSerializer, AuthSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        slug = self.kwargs.get(self.slug_url_kwarg, None)
        if slug == 'me':
            if queryset is None:
                queryset = self.get_queryset()
            queryset = queryset.filter(pk=self.request.user.id)
            try:
                obj = queryset.get()
            except self.model.DoesNotExist:
                raise Http404(_("No %(verbose_name)s found matching the query") % {'verbose_name': queryset.model._meta.verbose_name})
            return obj
        return super(UserDetail, self).get_object(queryset)


class AuthView(GenericAPIView):
    model = User
    serializer_class = AuthSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.DATA)
        if serializer.is_valid():
            login(request, serializer.object['user'])
            return Response(UserSerializer(request.user).data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        logout(request)
        return Response()
