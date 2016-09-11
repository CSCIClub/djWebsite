# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emails', '0002_auto_20160911_0259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='address',
            field=models.EmailField(max_length=254),
        ),
    ]
