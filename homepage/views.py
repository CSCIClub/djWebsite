from django.shortcuts import render

# Create your views here.
def index(request):

	context = {
		# 'latest_article_list': latest_article_list,
	}
	return render(request, 'homepage/index.html', context)
