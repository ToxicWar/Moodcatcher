# coding: utf-8
from __future__ import unicode_literals
from moodcatcher.models import MoodCategory
from rest_framework import serializers


class MoodCategorySerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.RelatedField()
    
    class Meta:
        model = MoodCategory
        fields = ('name',
                  'icon')
