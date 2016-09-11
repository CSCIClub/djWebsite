from django import template

from ..models import Email
from ..forms import EmailForm

register = template.Library()

@register.inclusion_tag('emails/signup.html', takes_context=True)
def show_signup(context):
    request = context['request']
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            e = Email(address = form.cleaned_data['email_address'])
            e.save()
            return  HttpResponseRedirect('success/')
    else:
        form = EmailForm()

    return {'form': form}
