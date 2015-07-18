# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0002_auto_20150718_1101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technology',
            name='browser_language',
            field=models.CharField(default=b'', max_length=10, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='browser_name',
            field=models.CharField(default=b'', max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='browser_version',
            field=models.CharField(default=b'', max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='color_depth',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='flash_version',
            field=models.CharField(default=b'', max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='screen_height',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='screen_width',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='system_os',
            field=models.CharField(default=b'', max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='user_agent',
            field=models.CharField(default=b'', max_length=150, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='view_height',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='view_width',
            field=models.IntegerField(blank=True),
        ),
    ]
