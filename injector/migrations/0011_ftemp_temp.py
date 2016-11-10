# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0010_auto_20150725_1519'),
    ]

    operations = [
        migrations.CreateModel(
            name='FTemp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=50, db_column=b'name', blank=True)),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'f_temp',
            },
        ),
        migrations.CreateModel(
            name='Temp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('eventName', models.CharField(default=b'', max_length=50, db_column=b'temp_name', blank=True)),
                ('eventStory', models.ForeignKey(to='injector.FTemp', db_column=b'temp_story_id')),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'temp',
            },
        ),
    ]
