# coding: utf-8
from __future__ import unicode_literals

from api.auth.views import UserViewSet
from api.moods.views import MoodViewSet
from django.conf.urls import url, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'moods', MoodViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]
