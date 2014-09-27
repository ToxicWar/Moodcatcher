# coding: utf-8
from __future__ import unicode_literals
from rest_framework import viewsets
from moodcatcher.models import Mood
from api.moods.serializers import MoodSerializer

DAYS_IN_MONTH = 30


class HomeViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.order_by('-posted').all()[:DAYS_IN_MONTH]
    serializer_class = MoodSerializer
    