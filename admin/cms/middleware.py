"""
Language middleware for API requests.
Activates the language based on the 'lang' query parameter or 'Accept-Language' header.
"""

from django.utils import translation

from django.conf import settings





class APILanguageMiddleware:

    """
    Middleware to switch language based on:
    1. ?lang=en or ?lang=ru query parameter
    2. Accept-Language header
    3. Falls back to default language (ru)

    Works with django-modeltranslation to automatically return translated fields.
    """



    def __init__(self, get_response):

        self.get_response = get_response



    def __call__(self, request):

                                          

        lang = request.GET.get('lang')



                                                       

        if not lang:

            accept_lang = request.META.get('HTTP_ACCEPT_LANGUAGE', '')

            if accept_lang:

                                                                                    

                lang = accept_lang.split(',')[0].split('-')[0].lower()



                                        

        supported_languages = [code for code, name in settings.LANGUAGES]

        if lang not in supported_languages:

            lang = settings.MODELTRANSLATION_DEFAULT_LANGUAGE



                               

        translation.activate(lang)

        request.LANGUAGE_CODE = lang



        response = self.get_response(request)



                                     

        response['Content-Language'] = lang



        return response

