# coding: utf-8
from __future__ import unicode_literals

from api.auth.views import UserViewSet, AuthView
from api.moods.views import MoodViewSet
from api.mood_categories.views import MoodCategoryViewSet
from django.conf.urls import url, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'moods', MoodViewSet)
router.register(r'mood_categories', MoodCategoryViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/$', AuthView.as_view(), name='Authorization')
]
