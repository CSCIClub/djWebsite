from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse

from .models import Article

# Create your views here.
def index(request):
	return render(request, 'navbar/index.html', {})

def navbarRender(request, article_id):
	return render(request, 'navbar/navbar.html', {})
