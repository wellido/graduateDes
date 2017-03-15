from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    url(r'^vrApp/$', views.index, name='index'),
    url(r'^vrDate/$',views.vrRequst),
]+static(settings.STATIC_URL)
