from django.apps import AppConfig





class CmsConfig(AppConfig):

    default_auto_field = 'django.db.models.BigAutoField'

    name = 'cms'

    verbose_name = 'CMS'



    def ready(self):

                                       

        try:

            from . import homepage        

        except ImportError:

            pass

        

        try:

            from . import banks        

        except ImportError:

            pass

            

        try:

            from . import history_and_culture        

        except ImportError:

            pass

            

        try:

            from . import abkhazian_cuisine        

        except ImportError:

            pass

            

        try:

            from . import abkhazian_customs        

        except ImportError:

            pass



                                            

        try:

            from . import welcome        

        except ImportError:

            pass

        for module_name in (

                                               

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

            'sports_gyms',

            'taxi',

            'wineries',

            'your_doctor',

            'cities',

            'elementary_dictionary',

            'excursions',

            'government_structure',

            'hot_springs',

            'important',

            'mobile_communication',

            'mountain_routes',

            'transport_communications',

            'parties',

            'music',

            'contacts',

        ):

            try:

                __import__(f"{self.name}.{module_name}.models")              

            except Exception:

                                                                                    

                pass





