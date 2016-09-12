from django import forms

class EmailForm(forms.Form):
    email_address = forms.EmailField(label='', max_length=100,
            widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}))
