# coding: utf-8
from __future__ import unicode_literals
from django.contrib import admin
from moodcatcher.models import Mood, MoodCategory


class MoodAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'category', 'image', 'text', 'posted']
    list_select_related = True
    

class MoodCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'icon']
    list_select_related = True


admin.site.register(Mood, MoodAdmin)
admin.site.register(MoodCategory, MoodCategoryAdmin)
