# coding: utf-8
from __future__ import unicode_literals
from api.moods.serializers import MoodSerializer
from moodcatcher.models import Mood
from rest_framework import viewsets


class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

