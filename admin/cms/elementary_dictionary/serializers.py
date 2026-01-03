from rest_framework import serializers

from .models import ElementaryDictionaryPage, DictionaryCategory, DictionaryWord





class DictionaryWordSerializer(serializers.ModelSerializer):

    """
    Сериализатор для слова/фразы
    """

    class Meta:

        model = DictionaryWord

        fields = ['id', 'russian', 'abkhazian', 'order']





class DictionaryCategorySerializer(serializers.ModelSerializer):

    """
    Сериализатор для категории словаря
    """

    words = DictionaryWordSerializer(many=True, read_only=True)

    

    class Meta:

        model = DictionaryCategory

        fields = ['id', 'title', 'split_two_columns', 'order', 'words']





class ElementaryDictionaryPageSerializer(serializers.ModelSerializer):

    """
    Сериализатор для страницы элементарного словаря
    """

    categories = serializers.SerializerMethodField()

    

    class Meta:

        model = ElementaryDictionaryPage

        fields = [

            'id',

            'seo_title',

            'seo_description', 

            'seo_keywords',

            'canonical_url',

            'og_title',

            'og_description',

            'og_image',

            'twitter_title',

            'twitter_description',

            'twitter_image',

            'robots_index',

            'robots_follow',

            'categories'

        ]

    

    def get_categories(self, obj):

                                        

        categories = {}

        for word in obj.words.filter(page=obj):                                        

            if word.category:

                category_id = word.category.id

                if category_id not in categories:

                    categories[category_id] = {

                        'id': word.category.id,

                        'title': word.category.title,

                        'split_two_columns': getattr(word.category, 'split_two_columns', False),

                        'order': word.category.order,

                        'words': []

                    }

                categories[category_id]['words'].append({

                    'id': word.id,

                    'russian': word.russian,

                    'abkhazian': word.abkhazian,

                    'order': word.order

                })

        

                                                

        result = []

        for category in sorted(categories.values(), key=lambda x: x['order']):

            category['words'].sort(key=lambda x: x['order'])

            result.append(category)

        

        return result

