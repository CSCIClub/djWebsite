from django.conf.urls import url
from . import views

app_name = 'emails'
urlpatterns = [
    url(r'^$', views.index),
    url(r'^subscribe/$', views.subscribe),
    url(r'^unsubscribe/$', views.unsubscribe),
    url(r'^success/$', views.success),
]
