# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0006_auto_20140927_0919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 10, 15, 0, 906569), null=True, verbose_name='Posted', blank=True),
        ),
    ]
