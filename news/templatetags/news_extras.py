from django import template

from ..models import Article

register = template.Library()

@register.inclusion_tag('news/feed.html')
def show_feed():
	latest_article_list = Article.objects.order_by('-pub_date')[:5]
	return {'latest_article_list': latest_article_list}
