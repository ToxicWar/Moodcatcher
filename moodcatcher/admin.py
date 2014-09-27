# coding: utf-8
from __future__ import unicode_literals
from django.contrib import admin
from moodcatcher.models import Mood, MoodCategory


admin.site.register(Mood, admin.ModelAdmin)
admin.site.register(MoodCategory, admin.ModelAdmin)
