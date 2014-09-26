# coding: utf-8
from __future__ import unicode_literals
from django.conf.urls import url, include
from api.auth.urls import router

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]
