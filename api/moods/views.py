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
        if self.request.user.is_authenticated():
            obj.author = self.request.user
        else:
            obj.author = User.objects.get(pk=-1)
        obj.save()
        return super(MoodViewSet, self).post_save(obj, created)

    def get_queryset(self):
        if self.request.QUERY_PARAMS.has_key('category_id'):
            category_id = self.request.QUERY_PARAMS.get('category_id')

            try:
                query = {'pk': int(category_id)}
            except ValueError as e:
                query = {'name': category_id}

            category = MoodCategory.objects.filter(**query).first()
            moods = Mood.objects.filter(category=category) if category else None
            mood = random.choice(moods) if moods else []
            if mood:
                if self.request.user.is_authenticated():
                    mood.received.add(self.request.user)
                else:
                    mood.received.add(User.objects.get(pk=-1))
                mood.save()
                mood = [mood]
            return mood
        return super(MoodViewSet, self).get_queryset()
