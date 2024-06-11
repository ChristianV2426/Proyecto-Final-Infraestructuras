from rest_framework import serializers
from django.db import transaction
from ..models.task import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
