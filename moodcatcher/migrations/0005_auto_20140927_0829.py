# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0004_auto_20140927_0754'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mood',
            options={'verbose_name': 'Mood', 'verbose_name_plural': 'Moods'},
        ),
        migrations.AlterField(
            model_name='mood',
            name='category',
            field=models.ForeignKey(related_name='category', verbose_name='Category', blank=True, to='moodcatcher.MoodCategory', null=True),
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 8, 29, 39, 443845), verbose_name='Posted'),
        ),
    ]
