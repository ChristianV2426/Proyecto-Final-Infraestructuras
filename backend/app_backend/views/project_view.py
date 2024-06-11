from rest_framework import viewsets
# from rest_framework.response import Response
from ..serializers.project_serializer import ProjectSerializer
from ..models.project import Project


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()