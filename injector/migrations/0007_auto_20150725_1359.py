# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0006_auto_20150725_1352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='eventStory',
            field=models.ForeignKey(related_name='event_story', to='injector.EventStory'),
        ),
    ]
