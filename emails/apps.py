from django.apps import AppConfig

class EmailsConfig(AppConfig):
    # note that I did not name this app 'email' as it conflicts with a default python package.
    name = 'emails'
