# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mood',
            name='author',
            field=models.ForeignKey(related_name='moods', verbose_name='Author', blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='mood',
            name='image',
            field=models.ImageField(upload_to=b'', null=True, verbose_name='Image', blank=True),
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 5, 56, 11, 498904), verbose_name='Posted'),
        ),
        migrations.AlterField(
            model_name='mood',
            name='sound_media',
            field=models.CharField(max_length=1000, null=True, verbose_name='Sound media', blank=True),
        ),
        migrations.AlterField(
            model_name='mood',
            name='tags',
            field=models.CharField(max_length=1000, null=True, verbose_name='Tags', blank=True),
        ),
        migrations.AlterField(
            model_name='mood',
            name='text',
            field=models.CharField(max_length=1000, null=True, verbose_name='Text', blank=True),
        ),
    ]
