from django.db import models

# Create your models here.


class Technology(models.Model):
    browserName = models.CharField(db_column='browser_name', max_length=20, blank=True, default='')
    browserVersion = models.CharField(db_column='browser_version', max_length=20, blank=True, default='')
    browserLanguage = models.CharField(db_column='browser_language', max_length=10, blank=True, default='')
    systemOS = models.CharField(db_column='system_os', max_length=20, blank=True, default='')
    viewHeight = models.IntegerField(db_column='view_height', blank=True, default=-1)
    viewWidth = models.IntegerField(db_column='view_width', blank=True, default=-1)
    screenHeight = models.IntegerField(db_column='screen_height', blank=True, default=-1)
    screenWidth = models.IntegerField(db_column='screen_width', blank=True, default=-1)
    colorDepth = models.IntegerField(db_column='color_depth', blank=True, default=-1)
    flashVersion = models.CharField(db_column='flash_version', max_length=20, blank=True, default='')
    cookieEnabled = models.CharField(db_column='cookie_enabled', max_length=5, blank=True, default='')
    quickTimeEnabled = models.CharField(db_column='quick_time_enabled', max_length=5, blank=True, default='')
    isMobile = models.CharField(db_column='is_mobile', max_length=5, blank=True, default='')
    javaEnabled = models.CharField(db_column='java_enabled', max_length=5, blank=True, default='')
    userAgent = models.CharField(db_column='user_agent', max_length=150, blank=True, default='')

    class Meta:
        db_table = 'technology_dim'
        ordering = ('id',)



class Referrer(models.Model):
    referrerUrl = models.CharField(db_column='referrer_url', max_length=500, blank=True, default='')

    class Meta:
        db_table = 'referrer_dim'
        ordering = ('id',)



class Page(models.Model):
    url = models.CharField(db_column='url', max_length=500, blank=True, default='')
    pageTitle = models.CharField(db_column='page_title', max_length=50, blank=True, default='')
    loadTime = models.IntegerField(db_column='load_time')
    pageVisitTimeStamp = models.BigIntegerField(db_column='page_visit_time_stamp')


    class Meta:
        db_table = 'page_dim'
        ordering = ('id',)


class Guid(models.Model):
    guid = models.CharField(db_column='guid', max_length=50, blank=True, default='')

    class Meta:
        db_table = 'guid'
        ordering = ('id',)


class EventStory(models.Model):
    guid = models.ForeignKey(Guid)
    page = models.ForeignKey(Page)
    referrer = models.ForeignKey(Referrer)
    technology = models.ForeignKey(Technology)

    class Meta:
        db_table = 'event_story'
        ordering = ('id',)



class Event(models.Model):
    eventName = models.CharField(db_column='event_name', max_length=50, blank=True, default='')
    eventStory = models.ForeignKey(EventStory, db_column='event_story_id')

    class Meta:
        db_table = 'events'
        ordering = ('id',)