from django.conf.urls import url
from . import views

app_name = 'events'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^competitions/', views.index, {'evt_type':'CODECOMP'}, name='index'),
	url(r'^meetings/', views.index, {'evt_type':'MEETING'}, name='index'),
	url(r'^hackathons/', views.index, {'evt_type':'HACKATHON'}, name='index'),
	url(r'^(?P<event_id>[0-9]+)/$', views.detail, name='detail')
]
