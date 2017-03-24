from __future__ import unicode_literals
from django.db import models

class vrRecord(models.Model):
    vrID=models.AutoField(primary_key=True)
    audioFile=models.TextField()
    textFile=models.TextField()
    audioBinary=models.BinaryField()
    def __str__(self):              # __unicode__ on Python 2
        return self.audioBinary
    class Meta:
        ordering = ('vrID',)

