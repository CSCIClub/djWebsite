from django.conf.urls import url
from . import views

app_name = 'news'
urlpatterns = [
	url(r'^$', views.index, name='index'),
  url(r'^ajax$', views.ajax, name='ajax'),
	url(r'^(?P<article_id>[0-9]+)/$', views.detail, name='detail')
]
