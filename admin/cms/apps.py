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

        # Остальные подмодули приложения CMS
        for module_name in (
            # Страницы и сущности по категориям
            'administrative_buildings',
            'beaches',
            'beauty_salons',
            'car_washes',
            'churches',
            'clothing_repair',
            'cultural_attractions',
            'gas_stations',
            'hotels',
            'parking_lots',
            'pharmacy',
            'restaurants',
            'shops_and_markets',
            'taxi',
            'wineries',
            'your_doctor',
            'cities',
            'elementary_dictionary',
        ):
            try:
                __import__(f"{self.name}.{module_name}.models")  # noqa: F401
            except Exception:
                # Модуль может отсутствовать или быть не инициализирован — не падаем
                pass


