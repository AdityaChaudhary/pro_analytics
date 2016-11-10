# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0011_ftemp_temp'),
    ]

    operations = [
        migrations.RenameField(
            model_name='temp',
            old_name='eventName',
            new_name='tempName',
        ),
        migrations.RenameField(
            model_name='temp',
            old_name='eventStory',
            new_name='tempStory',
        ),
    ]
