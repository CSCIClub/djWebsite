from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse

from .models import Article

# Create your views here.
def index(request):
	return render(request, 'news/index.html', {})

def ajax(request):
  return render(request, 'news/ajax.html', {})

def detail(request, article_id):
	article = get_object_or_404(Article, pk=article_id)
	return render(request, 'news/detail.html', {'article': article})

