# coding: utf-8
from __future__ import unicode_literals
from api.mood_categories.serializers import MoodCategorySerializer
from moodcatcher.models import MoodCategory
from rest_framework import viewsets


class MoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = MoodCategory.objects.all()
    serializer_class = MoodCategorySerializer
