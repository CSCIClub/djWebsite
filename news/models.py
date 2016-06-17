from django.db import models

# Create your models here.
class Article(models.Model):
	headline = models.CharField(max_length=200)
	author = models.CharField(max_length=200)
	pub_date = models.DateTimeField('date published')
	content = models.TextField()
	def __str__(self):
		return self.headline
