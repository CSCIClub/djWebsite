from django import template

from ..models import Event

register = template.Library()

@register.inclusion_tag('events/index.html')
def get_next_meeting():
	meetings = [d for d in Event.objects.order_by('-date') if
            (d.end_date and d.end_date >= date.today() ) or
            d.date >= date.today()][::-1]
    	
	meetings = [event for event in event_list if
            event.event_type == evt_type]

	upcoming_meeting = meeting[0] 
	return {'upcomming_meeting' : upcoming_meeting}
