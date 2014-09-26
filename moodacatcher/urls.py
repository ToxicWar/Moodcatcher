# coding: utf-8
from __future__ import unicode_literals
from django.conf.urls import patterns, include, url

urlpatterns = patterns('moodacatcher.views',
    url(r'^$', 'home', name='home'),
)
