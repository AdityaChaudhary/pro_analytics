__author__ = 'aditya'


from django.forms import widgets
from rest_framework import serializers
from injector.models import Technology


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id',
                  'browserName',
                  'browserVersion',
                  'browserLanguage',
                  'systemOS',
                  'viewHeight',
                  'viewWidth',
                  'screenHeight',
                  'screenWidth',
                  'colorDepth',
                  'flashVersion',
                  'cookieEnabled',
                  'quickTimeEnabled',
                  'isMobile',
                  'javaEnabled',
                  'userAgent')