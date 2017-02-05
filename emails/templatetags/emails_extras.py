from django import template

from ..forms import EmailForm

register = template.Library()


@register.inclusion_tag('emails/signup.html', takes_context=True)
def show_signup(context):
    form = EmailForm()
    return {'form': form}
