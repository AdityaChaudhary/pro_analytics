# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0003_auto_20150718_1123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technology',
            name='color_depth',
            field=models.IntegerField(default=-1, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='cookie_enabled',
            field=models.CharField(default=b'', max_length=5, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='is_mobile',
            field=models.CharField(default=b'', max_length=5, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='java_enabled',
            field=models.CharField(default=b'', max_length=5, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='quick_time_enabled',
            field=models.CharField(default=b'', max_length=5, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='screen_height',
            field=models.IntegerField(default=-1, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='screen_width',
            field=models.IntegerField(default=-1, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='view_height',
            field=models.IntegerField(default=-1, blank=True),
        ),
        migrations.AlterField(
            model_name='technology',
            name='view_width',
            field=models.IntegerField(default=-1, blank=True),
        ),
    ]
