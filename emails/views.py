from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import EmailForm
from .models import Email

# Create your views here.
def index(request):
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            e = Email(address = form.cleaned_data['email_address'])
            e.save()
            return  HttpResponseRedirect('success/')
    else:
        form = EmailForm()

    return render(request, 'emails/index.html', {'form': form})

def success(request):
    return render(request, 'emails/success.html', {})
