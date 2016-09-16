from django.db import models

# Create your models here.
class Event(models.Model):
    EVENT_TYPE_CHOICES = (
        ('HACKATHON', 'Hackathon'),
        ('CODECOMP',  'Coding Competition'),
        ('MEETING',  'Meeting'),
	('OTHER',     'Other'),
	
    )

    title = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    event_type = models.CharField(max_length=200, choices=EVENT_TYPE_CHOICES)
    date = models.DateField('start date')
    end_date = models.DateField('end date', blank=True, null=True)
    location = models.CharField(max_length=200)
    description  = models.TextField(blank=True, default='')
    def __str__(self):
        return self.title
