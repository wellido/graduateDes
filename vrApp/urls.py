from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^vrApp/$', views.index, name='index'),
    url(r'^vrDate/$',views.vrRequst),
]
