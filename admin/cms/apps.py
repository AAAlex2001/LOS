from django.apps import AppConfig


class CmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms'
    verbose_name = 'CMS'

    def ready(self):
        # Импортируем модели из модулей
        try:
            from . import homepage  # noqa
        except ImportError:
            pass
        
        try:
            from . import banks  # noqa
        except ImportError:
            pass
            
        try:
            from . import history_and_culture  # noqa
        except ImportError:
            pass
            
        try:
            from . import abkhazian_cuisine  # noqa
        except ImportError:
            pass
            
        try:
            from . import abkhazian_customs  # noqa
        except ImportError:
            pass

        try:
            from . import taxi  # noqa
        except ImportError:
            pass

        try:
            from . import your_doctor  # noqa
        except ImportError:
            pass

        try:
            from . import administrative_buildings  # noqa
        except ImportError:
            pass

        try:
            from . import beaches  # noqa
        except ImportError:
            pass

