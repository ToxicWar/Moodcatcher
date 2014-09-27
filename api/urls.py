# coding: utf-8
from __future__ import unicode_literals

from api.auth.views import UserViewSet
from api.moods.views import MoodList
from django.conf.urls import url, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, 'list')
router.register(r'moods', MoodList, 'list')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]
