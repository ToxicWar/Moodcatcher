# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0007_auto_20140927_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 28, 11, 43, 11, 679403), verbose_name='Posted'),
        ),
    ]
