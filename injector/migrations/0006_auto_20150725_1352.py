# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('injector', '0005_auto_20150718_1149'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('eventName', models.CharField(default=b'', max_length=50, db_column=b'event_name', blank=True)),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'event',
            },
        ),
        migrations.CreateModel(
            name='EventStory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'event_story',
            },
        ),
        migrations.CreateModel(
            name='Guid',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(default=b'', max_length=50, db_column=b'guid', blank=True)),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'guid',
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.CharField(default=b'', max_length=500, db_column=b'url', blank=True)),
                ('pageTitle', models.CharField(default=b'', max_length=50, db_column=b'page_title', blank=True)),
                ('loadTime', models.IntegerField(db_column=b'load_time')),
                ('pageVisitTimeStamp', models.BigIntegerField(db_column=b'page_visit_time_stamp')),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'page_dim',
            },
        ),
        migrations.CreateModel(
            name='Referrer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('referrerUrl', models.CharField(default=b'', max_length=500, db_column=b'referrer_url', blank=True)),
            ],
            options={
                'ordering': ('id',),
                'db_table': 'referrer_dim',
            },
        ),
        migrations.AddField(
            model_name='eventstory',
            name='guid',
            field=models.ForeignKey(to='injector.Guid'),
        ),
        migrations.AddField(
            model_name='eventstory',
            name='page',
            field=models.ForeignKey(to='injector.Page'),
        ),
        migrations.AddField(
            model_name='eventstory',
            name='referrer',
            field=models.ForeignKey(to='injector.Referrer'),
        ),
        migrations.AddField(
            model_name='eventstory',
            name='technology',
            field=models.ForeignKey(to='injector.Technology'),
        ),
        migrations.AddField(
            model_name='event',
            name='eventStory',
            field=models.ForeignKey(to='injector.EventStory'),
        ),
    ]
