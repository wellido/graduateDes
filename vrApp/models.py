from __future__ import unicode_literals
from django.db import models

# Create your models here.
class vrRecord(models.Model):
    vrID=models.AutoField(primary_key=True)
    audioFile=models.TextField()
    textFile=models.TextField()
    def __str__(self):              # __unicode__ on Python 2
        return self.textFile
    class Meta:
        ordering = ('vrID',)
