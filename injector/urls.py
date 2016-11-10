__author__ = 'aditya'

from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from injector import views

"""
urlpatterns = [
    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)$', views.snippet_detail),
]
"""

urlpatterns = [
    url(r'^analytics/$', views.DataInjector.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)