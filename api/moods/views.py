# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from api.moods.serializers import MoodSerializer
from moodcatcher.models import Mood, MoodCategory
from rest_framework import viewsets
from rest_framework import permissions
import random


class MoodViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

    def post_save(self, obj, created=False):
        obj.author = User.objects.get(pk=-1)
        obj.save()
        return super(MoodViewSet, self).post_save(obj, created)

    def get_queryset(self):
        if self.request.QUERY_PARAMS.has_key('category_id'):
            category_id = self.request.QUERY_PARAMS.get('category_id')

            if isinstance(category_id, basestring):
                query = {'id': category_id}
            else:
                query = {'name': category_id}

            category = MoodCategory.objects.filter(**query).first()
            moods = Mood.objects.filter(category=category) if category else None
            return random.choice(moods) if moods else []
        return super(MoodViewSet, self).get_queryset()
