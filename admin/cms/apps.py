from django.apps import AppConfig


class CmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms'
    verbose_name = 'CMS'

    def ready(self):
        # Импортируем модели из homepage модуля
        try:
            from . import homepage  # noqa
        except ImportError:
            pass


