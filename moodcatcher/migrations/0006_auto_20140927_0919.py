# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('moodcatcher', '0005_auto_20140927_0829'),
    ]

    operations = [
        migrations.AddField(
            model_name='mood',
            name='received',
            field=models.ManyToManyField(related_name='received', null=True, verbose_name='Received', to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 9, 19, 51, 43050), verbose_name='Posted'),
        ),
    ]
