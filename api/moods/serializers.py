# coding: utf-8
from __future__ import unicode_literals
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
        if self.init_files and self.init_files.has_key('image'):
            obj.image = self.init_files['image']
            obj.save()

        if obj.image:
            return 'http://localhost:8000/media/{}'.format(obj.image)
        return ''
