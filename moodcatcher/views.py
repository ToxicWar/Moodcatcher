# coding: utf-8
from __future__ import unicode_literals
from django.http import HttpResponse


def home(request):
	f = open('moodcatcher/static/src/index.html', 'r')
	data = f.read()
	f.close()
	return HttpResponse(data)
