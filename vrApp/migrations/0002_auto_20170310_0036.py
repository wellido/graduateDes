# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-10 00:36
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vrApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vrrecord',
            options={'ordering': ('vrID',)},
        ),
    ]