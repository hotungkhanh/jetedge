from django.db import models

# Create your models here.
class Campus(models.Model):

    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return f"Campus Name: {self.name}"