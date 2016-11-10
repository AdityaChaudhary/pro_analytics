# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0008_auto_20150725_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='eventStory',
            field=models.ForeignKey(to='injector.EventStory', db_column=b'event_story_id'),
        ),
    ]
