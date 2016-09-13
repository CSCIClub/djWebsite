from datetime import date

from django import template

from ..models import Event

register = template.Library()

@register.inclusion_tag('events/mtng.html')
def get_next_meeting():
	upcoming_meeting = [d for d in Event.objects.order_by('-date') if
            (d.end_date and d.end_date >= date.today() ) or
            d.date >= date.today() and d.event_type == 'MEETING'][::-1][0]

	return {'upcoming_meeting' : upcoming_meeting}
