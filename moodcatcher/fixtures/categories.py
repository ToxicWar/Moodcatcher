# coding: utf-8
from __future__ import unicode_literals
from moodcatcher.models import MoodCategory


def load_data():
    for item in MoodCategory.MOOD_CATEGORIES:
        MoodCategory.objects.get_or_create(name=item[0])
