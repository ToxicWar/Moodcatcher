# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0004_auto_20140927_0715'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='moodcategory',
            options={'verbose_name': 'Mood category', 'verbose_name_plural': 'Mood categories'},
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 7, 28, 31, 524858), verbose_name='Posted'),
        ),
    ]
