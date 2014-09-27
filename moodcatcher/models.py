# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from datetime import datetime


class Mood(models.Model):
    author = models.ForeignKey(User, verbose_name=_('Author'), related_name='moods')
    image = models.ImageField(_('Image'))
    text = models.CharField(_('Text'), max_length=1000)
    sound_media = models.CharField(_('Sound media'), max_length=1000)
    posted = models.DateTimeField(_('Posted'), default=datetime.now())
    tags = models.CharField(_('Tags'), max_length=1000)
