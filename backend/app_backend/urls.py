from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views.project_view import ProjectViewSet
from .views.task_view import TaskViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('docs/', include_docs_urls(title='API Documentation')),
    path('', include(router.urls)),
]
