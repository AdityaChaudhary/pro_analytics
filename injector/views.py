from injector.models import Technology
from injector.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


class DataInjector(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Technology.objects.all()
        serializer = TechnologySerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        eventSerializer = EventSerializer()
        eventStorySerializer = EventStorySerializer()
        guidSerializer = GuidSerializer()
        pageSerializer = PageSerializer()
        referrerSerializer = ReferrerSerializer()
        technologySerializer = TechnologySerializer()
        """

        #return Response(request.data)

        #serializer = TechnologySerializer(data=request.data)
        """
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                """

        eventSerializer = EventSerializer(data=request.data)
        if eventSerializer.is_valid():
            eventSerializer.save()
            return Response(eventSerializer.data, status=status.HTTP_201_CREATED)
        return Response(eventSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
        eventSerializer = TempSerializer(data=request.data)
        if eventSerializer.is_valid():
            eventSerializer.save()
            return Response(eventSerializer.data, status=status.HTTP_201_CREATED)
        return Response(eventSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """