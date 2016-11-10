# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0012_auto_20150725_1542'),
    ]

    operations = [
        migrations.RenameField(
            model_name='temp',
            old_name='tempName',
            new_name='eventName',
        ),
        migrations.RenameField(
            model_name='temp',
            old_name='tempStory',
            new_name='eventStory',
        ),
    ]
