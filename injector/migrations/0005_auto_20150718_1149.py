# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0004_auto_20150718_1136'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='technology',
            name='browser_language',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='browser_name',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='browser_version',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='color_depth',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='cookie_enabled',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='flash_version',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='is_mobile',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='java_enabled',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='quick_time_enabled',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='screen_height',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='screen_width',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='system_os',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='user_agent',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='view_height',
        ),
        migrations.RemoveField(
            model_name='technology',
            name='view_width',
        ),
        migrations.AddField(
            model_name='technology',
            name='browserLanguage',
            field=models.CharField(default=b'', max_length=10, db_column=b'browser_language', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='browserName',
            field=models.CharField(default=b'', max_length=20, db_column=b'browser_name', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='browserVersion',
            field=models.CharField(default=b'', max_length=20, db_column=b'browser_version', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='colorDepth',
            field=models.IntegerField(default=-1, db_column=b'color_depth', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='cookieEnabled',
            field=models.CharField(default=b'', max_length=5, db_column=b'cookie_enabled', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='flashVersion',
            field=models.CharField(default=b'', max_length=20, db_column=b'flash_version', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='isMobile',
            field=models.CharField(default=b'', max_length=5, db_column=b'is_mobile', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='javaEnabled',
            field=models.CharField(default=b'', max_length=5, db_column=b'java_enabled', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='quickTimeEnabled',
            field=models.CharField(default=b'', max_length=5, db_column=b'quick_time_enabled', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='screenHeight',
            field=models.IntegerField(default=-1, db_column=b'screen_height', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='screenWidth',
            field=models.IntegerField(default=-1, db_column=b'screen_width', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='systemOS',
            field=models.CharField(default=b'', max_length=20, db_column=b'system_os', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='userAgent',
            field=models.CharField(default=b'', max_length=150, db_column=b'user_agent', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='viewHeight',
            field=models.IntegerField(default=-1, db_column=b'view_height', blank=True),
        ),
        migrations.AddField(
            model_name='technology',
            name='viewWidth',
            field=models.IntegerField(default=-1, db_column=b'view_width', blank=True),
        ),
    ]
