from rest_framework import serializers
from django.db import transaction
from ..models.project import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

    