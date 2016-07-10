from django.shortcuts import render
import news.views.index

# Create your views here.
def index(request):
	context = {
		# 'latest_article_list': latest_article_list,
	}
	return render(request, 'homepage/index.html', context)

def index2(request):
    context = {
            news = news.views.index(request)
    }
    return render(request, 'homepage/index2.html', context)
