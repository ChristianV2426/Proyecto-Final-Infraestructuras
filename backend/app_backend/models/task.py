from django.db import models
from .project import Project
import logging

logger = logging.getLogger(__name__)


class Task(models.Model):
    id_task = models.AutoField('ID de la tarea', primary_key=True)
    id_project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name='Proyecto')
    task_name = models.CharField('Nombre de la tarea', max_length=300)
    task_description = models.TextField(
        'Descripción de la tarea', blank=True, null=True)
    start_date = models.DateField('Fecha de inicio', blank=False, null=False)
    end_date = models.DateField('Fecha de finalización', blank=True, null=True)

    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'
        ordering = ['id_task']

    def save(self, *args, **kwargs):
        if self.end_date is not None and self.start_date > self.end_date:
            raise ValueError(
                'La fecha de inicio no puede ser mayor a la fecha de finalización')

        project = Project.objects.get(id_project=self.id_project.id_project)

        if self.pk is None:
            logger.debug(
                f'Creando la siguiente tarea:\n'
                f'Nombre: {self.task_name}\n'
                f'Proyecto asociado: {project.project_name}\n'
                f'Fecha de inicio: {self.start_date}\n'
                f'Fecha de finalización: {self.end_date}\n\n')
        else:
            logger.debug(
                f'Actualizando la tarea con ID {self.id_task} a los valores:\n'
                f'Nombre: {self.task_name}\n'
                f'Proyecto asociado: {project.project_name}\n'
                f'Fecha de inicio: {self.start_date}\n'
                f'Fecha de finalización: {self.end_date}\n\n')

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        logger.debug(
            f'Eliminando la tarea con ID {self.id_task}\n'
            f'(Nombre: {self.task_name})\n\n')

        super().delete(*args, **kwargs)
