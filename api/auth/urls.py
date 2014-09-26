# coding: utf-8
from __future__ import unicode_literals
from rest_framework import routers
from api.auth import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
