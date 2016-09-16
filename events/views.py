from datetime import date

from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse

from .models import Event

# Create your views here.
def index(request, evt_type = ''):
    event_list = [d for d in Event.objects.order_by('-date') if
            (d.end_date and d.end_date >= date.today() ) or
            d.date >= date.today()][::-1]
    if evt_type != '':
      event_list = [event for event in event_list if
        event.event_type == evt_type]
    return render(request, 'events/index.html', {'event_list': event_list})

def detail(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    return render(request, 'events/detail.html', {'event': event})

