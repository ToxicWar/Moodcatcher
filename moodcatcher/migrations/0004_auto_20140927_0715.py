# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0003_auto_20140927_0638'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mood',
            name='category',
            field=models.ForeignKey(related_name='category', verbose_name='Category', to='moodcatcher.MoodCategory'),
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 7, 15, 34, 267972), verbose_name='Posted'),
        ),
        migrations.AlterField(
            model_name='moodcategory',
            name='name',
            field=models.CharField(default='normal', max_length=100, verbose_name='Name', choices=[('normal', 'normal'), ('aggresive', 'aggresive'), ('peaceful', 'peaceful'), ('energetic', 'energetic'), ('positive', 'positive'), ('sad', 'sad'), ('creative', 'creative')]),
        ),
    ]
