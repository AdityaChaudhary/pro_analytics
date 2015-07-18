# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Technology',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('browser_name', models.CharField(max_length=20)),
                ('browser_version', models.CharField(max_length=20)),
                ('browser_language', models.CharField(max_length=10)),
                ('system_os', models.CharField(max_length=20)),
                ('view_height', models.IntegerField()),
                ('view_width', models.IntegerField()),
                ('screen_height', models.IntegerField()),
                ('screen_width', models.IntegerField()),
                ('color_depth', models.IntegerField()),
                ('flash_version', models.CharField(max_length=20)),
                ('cookie_enabled', models.BooleanField()),
                ('quick_time_enabled', models.BooleanField()),
                ('is_mobile', models.BooleanField()),
                ('java_enabled', models.BooleanField()),
                ('user_agent', models.CharField(max_length=150)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]
