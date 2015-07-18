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