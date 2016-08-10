from django.shortcuts import render
import news.views

# Create your views here.
def index(request):
    return render(request, 'homepage/index.html', {})
