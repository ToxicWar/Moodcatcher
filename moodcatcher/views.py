# coding: utf-8
from __future__ import unicode_literals
from django.http import HttpResponse
import os


def home(request):
    BASE_DIR = os.path.dirname(__file__)
    path = os.path.join(BASE_DIR, 'static', 'src', 'index.html')
    response = HttpResponse(content=open(path).read())
    return response
