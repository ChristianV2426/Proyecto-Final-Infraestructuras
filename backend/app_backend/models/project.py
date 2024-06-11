from django.db import models
import logging

logger = logging.getLogger(__name__)


class Project(models.Model):
    id_project = models.AutoField('ID del proyecto', primary_key=True)
    project_name = models.CharField(
        'Nombre del proyecto', max_length=300, unique=True)
    project_description = models.TextField(
        'Descripción del proyecto', blank=True, null=True)
    start_date = models.DateField('Fecha de inicio', blank=False, null=False)
    end_date = models.DateField('Fecha de finalización', blank=True, null=True)

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['id_project']
    
    # def get_project_name(self):
    #     return self.project_name

    def save(self, *args, **kwargs):
        if self.end_date is not None and self.start_date > self.end_date:
            raise ValueError(
                'La fecha de inicio no puede ser mayor a la fecha de finalización')

        if self.pk is None:
            logger.debug(
                f'Creando el siguiente proyecto:\n'
                f'Nombre: {self.project_name}\n'
                f'Fecha de inicio: {self.start_date}\n'
                f'Fecha de finalización: {self.end_date}\n\n')
        else:
            logger.debug(
                f'Actualizando el proyecto con ID {self.id_project} a los valores:\n'
                f'Nombre: {self.project_name}\n'
                f'Fecha de inicio: {self.start_date}\n'
                f'Fecha de finalización: {self.end_date}\n\n')

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        logger.debug(
            f'Eliminando el proyecto con ID {self.id_project}\n'
            f'(Nombre: {self.project_name})\n\n')
        
        for task in self.task_set.all():
            task.delete()

        super().delete(*args, **kwargs)
