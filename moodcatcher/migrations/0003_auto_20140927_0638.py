# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('moodcatcher', '0002_auto_20140927_0556'),
    ]

    operations = [
        migrations.CreateModel(
            name='MoodCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=1000, null=True, verbose_name='Name', blank=True)),
                ('icon', models.ImageField(upload_to=b'', null=True, verbose_name='Icon', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='mood',
            name='category',
            field=models.ForeignKey(related_name='category', verbose_name='Category', blank=True, to='moodcatcher.MoodCategory', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mood',
            name='posted',
            field=models.DateTimeField(default=datetime.datetime(2014, 9, 27, 6, 38, 23, 524271), verbose_name='Posted'),
        ),
    ]
