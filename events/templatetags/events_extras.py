from datetime import date

from django import template

from ..models import Event

register = template.Library()

@register.inclusion_tag('events/mtng.html')
def get_next_meeting():
    meetings = [d for d in Event.objects.order_by('-date') if
            ((d.end_date and d.end_date >= date.today() ) or
            d.date >= date.today()) and d.event_type == 'MEETING'][::-1]

    upcoming_meeting = meetings[0] if len(meetings) > 0 else None

    return {'upcoming_meeting' : upcoming_meeting}
