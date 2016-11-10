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
    guid = serializers.CharField(max_length=50)
    """
    def create(self, validated_data):
        print validated_data
        guid = Guid.objects.create(guid=validated_data['guid'])

        return guid
        """
    class Meta:
        model = Guid
        fields = ('id',
                  'guid')


class EventStorySerializer(serializers.Serializer):

    guid = GuidSerializer()
    page = PageSerializer()
    referrer = ReferrerSerializer()
    technology = TechnologySerializer()


    def create(self, validated_data):

        #print validated_data['page']
        guid = GuidSerializer(data=validated_data['guid'])
        page = PageSerializer(data=validated_data['page'])
        referrer = ReferrerSerializer(data=validated_data['referrer'])
        technology = TechnologySerializer(data=validated_data['technology'])

        if guid.is_valid():
            print "Saving Guid"
            guid.save()

        if page.is_valid():
            page.save()

        if referrer.is_valid():
            referrer.save()

        if technology.is_valid():
            technology.save()

        #print guid

        eventStory = EventStory.objects.create(guid=guid, page=page,
                                               referrer=referrer,
                                               techology=technology)

        return eventStory


    class Meta:
        model = EventStory
        fields = ('id',
                  'guid',
                  'page',
                  'referrer',
                  'technology')


class EventSerializer(serializers.Serializer):
    eventName = serializers.CharField(max_length=50)
    eventStory = EventStorySerializer()

    def create(self, validated_data):


        #print validated_data['eventStory']
        eventStory = EventStorySerializer(data=validated_data['eventStory'])

        if eventStory.is_valid():
            eventStory.save()

        event = Event.objects.create(eventName=validated_data['eventName'], eventStory=validated_data['eventStory'])

        return event


    class Meta:
        model = Event
        fields = ('id',
              'eventName',
              'eventStory')


    #event = Event.objects.create(eventName=eventName, eventStory=eventStory)

    #if eventStory.is_valid():
     #   eventStory.save()





"""
class FTempSerializer(serializers.Serializer):
    class Meta:
        model = FTemp
        fields = ('id',
                  'name')


class TempSerializer(serializers.Serializer):
    def create(self, validated_data):
        print validated_data

    class Meta:
        model = Temp
        fields = ('id',
                  'eventName',
                  'eventStory')
"""