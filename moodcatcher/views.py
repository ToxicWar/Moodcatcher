# coding: utf-8
from __future__ import unicode_literals
from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = 'moodcatcher/index.html'
home = Home.as_view()
