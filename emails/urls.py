from django.conf.urls import url
from . import views

app_name = 'emails'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^success/$', views.success, name='success'),
	url(r'^ajax/$', views.ajax, name='ajax'),
]
