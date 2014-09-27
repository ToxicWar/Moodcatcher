# coding: utf-8
from __future__ import unicode_literals
from django.contrib.sites.models import Site
from rest_framework import serializers
from moodcatcher.models import Mood


class MoodSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.RelatedField()
    image = serializers.SerializerMethodField('get_image')
    
    class Meta:
        model = Mood
        fields = ('author',
                  'image',
                  'text',
                  'sound_media',
                  'posted')

    def get_image(self, obj):
        return 'http://localhost:8000/media/{}'.format(obj.image)
