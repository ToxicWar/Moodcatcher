# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Mood',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'', verbose_name='Image')),
                ('text', models.CharField(max_length=1000, verbose_name='Text')),
                ('sound_media', models.CharField(max_length=1000, verbose_name='Sound media')),
                ('posted', models.DateTimeField(default=datetime.datetime(2014, 9, 27, 3, 31, 45, 84916), verbose_name='Posted')),
                ('tags', models.CharField(max_length=1000, verbose_name='Tags')),
                ('author', models.ForeignKey(related_name='moods', verbose_name='Author', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
