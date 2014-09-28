# coding: utf-8
from __future__ import unicode_literals
from rest_framework import serializers
from moodcatcher.models import Mood, MoodCategory
from django.core.files.base import ContentFile
import base64


class MoodSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.RelatedField()
    image = serializers.SerializerMethodField('get_image')
    category = serializers.SerializerMethodField('get_category')

    class Meta:
        model = Mood
        fields = ('author',
                  'category',
                  'image',
                  'text',
                  'sound_media',
                  'posted')

    def get_image(self, obj):
        if self.init_data and self.init_data.has_key('image'):
            image_data = self.init_data.get('image')
            if isinstance(image_data, basestring) and image_data.startswith('data:image'):
                format, imgstr = image_data.split(';base64,')
                ext = format.split('/')[-1]
                obj.image = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
                obj.save()

        if self.init_files and self.init_files.has_key('image'):
            obj.image = self.init_files['image']
            obj.save()

        if obj.image:
            return '/media/{}'.format(obj.image)
        return ''

    def get_category(self, obj):
        if self.context['request'] and self.context['request'].DATA.has_key('category'):
            category_id = self.context['request'].DATA.get('category')
            try:
                query = {'pk': int(category_id)}
            except ValueError as e:
                query = {'name': category_id}
            category = MoodCategory.objects.filter(**query).first()
            obj.category = category
            obj.save()
        return obj.category
