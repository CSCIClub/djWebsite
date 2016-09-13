from django.conf.urls import url
from . import views

app_name = 'events'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^competitions/', views.index, name='index', {'evt_type':'CODECOMP'}),
	url(r'^meetings/', views.index, name='index', {'evt_type':'MEETING'}),	
	url(r'^hackathons/', views.index, name='index'{'evt_type':'HACKATHON'}),	
	url(r'^(?P<event_id>[0-9]+)/$', views.detail, name='detail')
]
