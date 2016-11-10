# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0013_auto_20150725_1543'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='temp',
            name='eventStory',
        ),
        migrations.DeleteModel(
            name='FTemp',
        ),
        migrations.DeleteModel(
            name='Temp',
        ),
    ]
