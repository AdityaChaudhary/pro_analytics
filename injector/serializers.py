__author__ = 'aditya'


from django.forms import widgets
from rest_framework import serializers
from injector.models import *


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



class ReferrerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referrer
        fields = ('id',
                  'referrerUrl')



class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('id',
                  'url',
                  'pageTitle',
                  'loadTime',
                  'pageVisitTimeStamp')




class GuidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guid
        fields = ('id',
                  'guid')


class EventStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStory
        fields = ('id',
                  'guid',
                  'page',
                  'referrer',
                  'technology')



class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id',
                  'eventName',
                  'eventStory')