# coding: utf-8
from __future__ import unicode_literals

from api.auth.views import UserViewSet, AuthView, UserDetail
from api.history.views import HistoryView
from api.home.view import HomeViewSet
from api.mood_categories.views import MoodCategoryViewSet
from api.moods.views import MoodViewSet
from django.conf.urls import url, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'moods', MoodViewSet)
router.register(r'mood_categories', MoodCategoryViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/$', AuthView.as_view(), name='Authorization'),
    url(r'^histories/$', HistoryView.as_view(), name='Histories'),
    url(r'^home/$', HomeViewSet.as_view(), name='Home'),
    url(r'^user/(?P<slug>me)/$', UserDetail.as_view(), name='UserMeDetail'),
]
