from rest_framework import viewsets
# from rest_framework.response import Response
from ..serializers.task_serializer import TaskSerializer
from ..models.task import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()