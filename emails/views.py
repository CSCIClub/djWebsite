from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.db import IntegrityError

from .forms import EmailForm
from .models import Email


# Create your views here.
def index(request):
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            try:
                e = Email(address=form.cleaned_data['email_address'])
                e.save()
            except IntegrityError:
                pass
            return HttpResponseRedirect('success/')
    else:
        form = EmailForm()

    return render(request, 'emails/index.html', {'form': form})


def success(request):
    return render(request, 'emails/success.html', {})
