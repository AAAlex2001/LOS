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

        try:
            from . import gas_stations  # noqa
        except ImportError:
            pass

        try:
            from . import hotels  # noqa
        except ImportError:
            pass

        try:
            from . import parking_lots  # noqa
        except ImportError:
            pass

        try:
            from . import pharmacy  # noqa
        except ImportError:
            pass

        try:
            from . import restaurants  # noqa
        except ImportError:
            pass

        try:
            from . import shops_and_markets  # noqa
        except ImportError:
            pass

        try:
            from . import wineries  # noqa
        except ImportError:
            pass

