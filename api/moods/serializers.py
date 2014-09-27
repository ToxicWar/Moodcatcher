# coding: utf-8
from __future__ import unicode_literals
from moodcatcher.models import Mood
from rest_framework import serializers


class MoodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Mood
        fields = ('author'
                  'image',
                  'text',
                  'sound_media',
                  'posted')
