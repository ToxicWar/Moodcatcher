# coding: utf-8
from __future__ import unicode_literals
from django.contrib import admin
from moodcatcher.models import Mood


admin.site.register(Mood, admin.ModelAdmin)
