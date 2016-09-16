from django.conf.urls import url
from . import views

app_name = 'events'
urlpatterns = [
	url(r'^competitions/', views.index, {'evt_type':'CODECOMP'}, name='index'),
	url(r'^meetings/', views.index, {'evt_type':'MEETING'}, name='index'),
	url(r'^hackathons/', views.index, {'evt_type':'HACKATHON'}, name='index'),
	url(r'^$', views.index, name='index'),
    #I changed the order because apparently {{url 'events:index'}} will resolve to the last one of
    #these listed, which seems kind of dumb so we should fix that eventually but for now this works

	url(r'^(?P<event_id>[0-9]+)/$', views.detail, name='detail')
]
