import json

from django.shortcuts import render
from django.http import HttpResponse
from django.db import IntegrityError

from .forms import EmailForm
from .models import Email


def index(request):
    return render(request, 'emails/index.html', {'form': form})


def subscribe(request):
    print(request.POST)
    form = EmailForm(request.POST)
    if form.is_valid():
        try:
            e = Email(address=form.cleaned_data['email_address'])
            e.save()
            msg = "success"
        except IntegrityError:
            msg = "failure"
    else:
        msg = "invalid"

    return HttpResponse(json.dumps(msg), content_type='application/json')


def unsubscribe(request):
    form = EmailForm(request.POST)
    if form.is_valid():
        try:
            e = Email(address=form.cleaned_data['email_address'])
            e.save()
            msg = "success"
        except IntegrityError:
            msg = "failure"
    else:
        msg = "invalid"

    return HttpResponse(json.dumps(msg), content_type='application/json')


def success(request):
    return render(request, 'emails/success.html', {})
