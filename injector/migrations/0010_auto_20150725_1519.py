# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0009_auto_20150725_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='loadTime',
            field=models.CharField(default=b'', max_length=50, db_column=b'load_time', blank=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='pageVisitTimeStamp',
            field=models.CharField(max_length=50, db_column=b'page_visit_time_stamp'),
        ),
    ]
