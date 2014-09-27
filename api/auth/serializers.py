# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from rest_framework.serializers import Serializer, CharField, ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name',
                  'last_name', 'email')
        read_only_fields = ('id',)
        write_only_fields = ('password',)

    def restore_object(self, attrs, instance=None):
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.set_password(attrs['password'])
        return user


class AuthSerializer(Serializer):
    username = CharField()
    password = CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            raise ValidationError(_('User not found'))

        attrs['user'] = user
        return attrs
