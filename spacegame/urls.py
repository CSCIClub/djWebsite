from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.game, name='game'),
]
