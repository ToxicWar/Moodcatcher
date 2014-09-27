# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from api.moods.serializers import MoodSerializer
from moodcatcher.models import Mood
from rest_framework import viewsets
from rest_framework import permissions


class MoodViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

    def post_save(self, obj, created=False):
        obj.author = User.objects.get(pk=-1)
        obj.save()
        return super(MoodViewSet, self).post_save(obj, created)
