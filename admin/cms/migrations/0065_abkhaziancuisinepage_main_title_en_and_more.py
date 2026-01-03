                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0064_adbanner_notes'),

    ]



    operations = [

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='main_title_en',

            field=models.CharField(default='Абхазская кухня: традиции, вкус и атмосфера', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='main_title_ru',

            field=models.CharField(default='Абхазская кухня: традиции, вкус и атмосфера', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancuisinepage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='intro_text_en',

            field=models.TextField(blank=True, help_text='Вводный текст на фоновом изображении', null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='intro_text_ru',

            field=models.TextField(blank=True, help_text='Вводный текст на фоновом изображении', null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='main_title_en',

            field=models.CharField(default='Абхазские национальные обычаи', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='main_title_ru',

            field=models.CharField(default='Абхазские национальные обычаи', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='abkhaziancustomspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='aboutabkhaziacategory',

            name='title_en',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='aboutabkhaziacategory',

            name='title_ru',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='accessibilityandtermspage',

            name='content_en',

            field=models.TextField(help_text='Основной контент страницы (HTML)', null=True),

        ),

        migrations.AddField(

            model_name='accessibilityandtermspage',

            name='content_ru',

            field=models.TextField(help_text='Основной контент страницы (HTML)', null=True),

        ),

        migrations.AddField(

            model_name='accessibilityandtermspage',

            name='title_en',

            field=models.CharField(default='Доступность и правила пользования сайтом', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='accessibilityandtermspage',

            name='title_ru',

            field=models.CharField(default='Доступность и правила пользования сайтом', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='description_en',

            field=models.TextField(blank=True, default='', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='description_ru',

            field=models.TextField(blank=True, default='', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='site_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True, verbose_name='Сайт'),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='site_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True, verbose_name='Сайт'),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True, verbose_name='Заголовок'),

        ),

        migrations.AddField(

            model_name='adbanner',

            name='title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True, verbose_name='Заголовок'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='administrativebuilding',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='administrativebuildingcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='administrativebuildingcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='administrativebuildingcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='administrativebuildingcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='administrativebuildingspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='address_en',

            field=models.TextField(help_text='Адрес банка', null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='address_ru',

            field=models.TextField(help_text='Адрес банка', null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='contacts_en',

            field=models.CharField(help_text='Контактные данные', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='contacts_ru',

            field=models.CharField(help_text='Контактные данные', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='name_en',

            field=models.CharField(help_text='Название банка', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='name_ru',

            field=models.CharField(help_text='Название банка', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='working_hours_en',

            field=models.TextField(blank=True, help_text='Режим работы', null=True),

        ),

        migrations.AddField(

            model_name='bank',

            name='working_hours_ru',

            field=models.TextField(blank=True, help_text='Режим работы', null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='bankspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beach',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='beach',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='beach',

            name='description_en',

            field=models.TextField(blank=True, help_text='Один-два абзаца; двойной Enter = новый абзац', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='beach',

            name='description_ru',

            field=models.TextField(blank=True, help_text='Один-два абзаца; двойной Enter = новый абзац', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='beach',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='beach',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='beachcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='beachcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='beachcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='beachcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beachespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='services_en',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='services_ru',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='beautysalon',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='beautysaloncity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='beautysaloncity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='beautysaloncity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='beautysaloncity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='beautysalonspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwash',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='services_en',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='services_ru',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='carwash',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='carwashcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='carwashcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='carwashcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='carwashcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='carwashespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='church',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='church',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='church',

            name='description_en',

            field=models.TextField(blank=True, help_text='Описание церкви, история, особенности', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='church',

            name='description_ru',

            field=models.TextField(blank=True, help_text='Описание церкви, история, особенности', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='church',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='church',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='church',

            name='services_en',

            field=models.TextField(blank=True, help_text='Расписание богослужений, через запятую или с новой строки', null=True, verbose_name='Богослужения'),

        ),

        migrations.AddField(

            model_name='church',

            name='services_ru',

            field=models.TextField(blank=True, help_text='Расписание богослужений, через запятую или с новой строки', null=True, verbose_name='Богослужения'),

        ),

        migrations.AddField(

            model_name='church',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='church',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='churchcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='churchcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='churchcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='churchcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='churchespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='citiespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='city',

            name='administrative_buildings_en',

            field=models.TextField(blank=True, default='', help_text='Описание административных зданий города', null=True, verbose_name='Административные здания'),

        ),

        migrations.AddField(

            model_name='city',

            name='administrative_buildings_ru',

            field=models.TextField(blank=True, default='', help_text='Описание административных зданий города', null=True, verbose_name='Административные здания'),

        ),

        migrations.AddField(

            model_name='city',

            name='description_en',

            field=models.TextField(blank=True, null=True, verbose_name='Описание города'),

        ),

        migrations.AddField(

            model_name='city',

            name='description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Описание города'),

        ),

        migrations.AddField(

            model_name='city',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название города'),

        ),

        migrations.AddField(

            model_name='city',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название города'),

        ),

        migrations.AddField(

            model_name='city',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='city',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='citycategory',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='citycategory',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='description_en',

            field=models.TextField(blank=True, help_text='Описание услуг, специализация', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='description_ru',

            field=models.TextField(blank=True, help_text='Описание услуг, специализация', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='services_en',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='services_ru',

            field=models.TextField(blank=True, help_text='Список услуг, через запятую или с новой строки', null=True, verbose_name='Услуги'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='clothingrepair',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='clothingrepaircity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='clothingrepaircity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='clothingrepaircity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='clothingrepaircity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='clothingrepairpage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='cuisinesection',

            name='text_en',

            field=models.TextField(help_text='Текст секции', null=True),

        ),

        migrations.AddField(

            model_name='cuisinesection',

            name='text_ru',

            field=models.TextField(help_text='Текст секции', null=True),

        ),

        migrations.AddField(

            model_name='cuisinesection',

            name='title_en',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='cuisinesection',

            name='title_ru',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='description_en',

            field=models.TextField(help_text='Подробное описание достопримечательности', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='description_ru',

            field=models.TextField(help_text='Подробное описание достопримечательности', null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='culturalattraction',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='culturalattractioncity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='culturalattractioncity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='culturalattractioncity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='culturalattractioncity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturalattractionspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='culturesection',

            name='content_en',

            field=models.TextField(help_text='Содержимое секции', null=True),

        ),

        migrations.AddField(

            model_name='culturesection',

            name='content_ru',

            field=models.TextField(help_text='Содержимое секции', null=True),

        ),

        migrations.AddField(

            model_name='culturesection',

            name='title_en',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='culturesection',

            name='title_ru',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='customsection',

            name='text_en',

            field=models.TextField(help_text='Текст секции', null=True),

        ),

        migrations.AddField(

            model_name='customsection',

            name='text_ru',

            field=models.TextField(help_text='Текст секции', null=True),

        ),

        migrations.AddField(

            model_name='customsection',

            name='title_en',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='customsection',

            name='title_ru',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='dentistry',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='dictionarycategory',

            name='title_en',

            field=models.CharField(help_text='Название категории', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='dictionarycategory',

            name='title_ru',

            field=models.CharField(help_text='Название категории', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='dictionaryword',

            name='abkhazian_en',

            field=models.CharField(help_text='Перевод на абхазском языке', max_length=500, null=True),

        ),

        migrations.AddField(

            model_name='dictionaryword',

            name='abkhazian_ru',

            field=models.CharField(help_text='Перевод на абхазском языке', max_length=500, null=True),

        ),

        migrations.AddField(

            model_name='dictionaryword',

            name='russian_en',

            field=models.CharField(help_text='Перевод на русском языке', max_length=500, null=True),

        ),

        migrations.AddField(

            model_name='dictionaryword',

            name='russian_ru',

            field=models.CharField(help_text='Перевод на русском языке', max_length=500, null=True),

        ),

        migrations.AddField(

            model_name='doctorsgroup',

            name='doctors_raw_en',

            field=models.TextField(blank=True, help_text='По одному врачу на строку', null=True, verbose_name='Список врачей'),

        ),

        migrations.AddField(

            model_name='doctorsgroup',

            name='doctors_raw_ru',

            field=models.TextField(blank=True, help_text='По одному врачу на строку', null=True, verbose_name='Список врачей'),

        ),

        migrations.AddField(

            model_name='doctorsgroup',

            name='hospital_name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Учреждение'),

        ),

        migrations.AddField(

            model_name='doctorsgroup',

            name='hospital_name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Учреждение'),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='elementarydictionarypage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='entertainmentcategory',

            name='title_en',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='entertainmentcategory',

            name='title_ru',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='excursionservice',

            name='contacts_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='excursionservice',

            name='contacts_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='excursionspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='contact_info_en',

            field=models.TextField(blank=True, default='', help_text='Контактная информация (часы работы, телефон и т.д.)', null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='contact_info_ru',

            field=models.TextField(blank=True, default='', help_text='Контактная информация (часы работы, телефон и т.д.)', null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='copyright_text_en',

            field=models.CharField(blank=True, default='', help_text='Текст копирайта', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='copyright_text_ru',

            field=models.CharField(blank=True, default='', help_text='Текст копирайта', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='description_en',

            field=models.TextField(blank=True, default='', help_text='Описание сервиса (О сервисе)', null=True),

        ),

        migrations.AddField(

            model_name='footer',

            name='description_ru',

            field=models.TextField(blank=True, default='', help_text='Описание сервиса (О сервисе)', null=True),

        ),

        migrations.AddField(

            model_name='footerlink',

            name='label_en',

            field=models.CharField(help_text='Текст ссылки', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='footerlink',

            name='label_ru',

            field=models.CharField(help_text='Текст ссылки', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='gasstation',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='gasstationcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='gasstationcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='gasstationcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='gasstationcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='gasstationspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentblock',

            name='content_en',

            field=models.TextField(blank=True, null=True),

        ),

        migrations.AddField(

            model_name='governmentblock',

            name='content_ru',

            field=models.TextField(blank=True, null=True),

        ),

        migrations.AddField(

            model_name='governmentblock',

            name='title_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='governmentblock',

            name='title_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='governmentstructurepage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historyandculturepage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='historysection',

            name='content_en',

            field=models.TextField(help_text='Содержимое секции', null=True),

        ),

        migrations.AddField(

            model_name='historysection',

            name='content_ru',

            field=models.TextField(help_text='Содержимое секции', null=True),

        ),

        migrations.AddField(

            model_name='historysection',

            name='title_en',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='historysection',

            name='title_ru',

            field=models.CharField(help_text='Заголовок секции', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeactionbutton',

            name='label_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeactionbutton',

            name='label_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeactivity',

            name='title_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeactivity',

            name='title_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homecity',

            name='description_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homecity',

            name='description_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homecity',

            name='title_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homecity',

            name='title_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='actions_section_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='actions_section_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='activities_section_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='activities_section_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cities_section_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cities_section_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_button_label_en',

            field=models.CharField(blank=True, default='', max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_button_label_ru',

            field=models.CharField(blank=True, default='', max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_card_description_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_card_description_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_card_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_card_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_hero_text_en',

            field=models.TextField(blank=True, default='', help_text='Текст над карточкой. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_hero_text_ru',

            field=models.TextField(blank=True, default='', help_text='Текст над карточкой. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='cta_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='hero_text_primary_en',

            field=models.TextField(blank=True, default='', help_text='Геро-текст №1. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='hero_text_primary_ru',

            field=models.TextField(blank=True, default='', help_text='Геро-текст №1. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='hero_text_secondary_en',

            field=models.TextField(blank=True, default='', help_text='Геро-текст №2. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='hero_text_secondary_ru',

            field=models.TextField(blank=True, default='', help_text='Геро-текст №2. Перенос строки через Enter', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='og_description_en',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='og_description_ru',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='og_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='og_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_description_en',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_description_ru',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='seo_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='twitter_description_en',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='twitter_description_ru',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='twitter_title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepopupitem',

            name='label_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homepopupitem',

            name='label_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeslideritem',

            name='alt_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='homeslideritem',

            name='alt_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hometab',

            name='label_en',

            field=models.CharField(max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='hometab',

            name='label_ru',

            field=models.CharField(max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='hospital',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='hospital',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='price_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Цена'),

        ),

        migrations.AddField(

            model_name='hotel',

            name='price_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Цена'),

        ),

        migrations.AddField(

            model_name='hotelcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='hotelcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='hotelcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='hotelcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotelspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspring',

            name='description_en',

            field=models.TextField(blank=True, null=True),

        ),

        migrations.AddField(

            model_name='hotspring',

            name='description_ru',

            field=models.TextField(blank=True, null=True),

        ),

        migrations.AddField(

            model_name='hotspring',

            name='title_en',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotspring',

            name='title_ru',

            field=models.CharField(max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='hero_text_en',

            field=models.TextField(blank=True, help_text='Текст на плашке вверху страницы (поддержка переносов и **жирного**)', null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='hero_text_ru',

            field=models.TextField(blank=True, help_text='Текст на плашке вверху страницы (поддержка переносов и **жирного**)', null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='alt_text_en',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Альтернативный текст'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='alt_text_ru',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Альтернативный текст'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='description_en',

            field=models.TextField(blank=True, null=True, verbose_name='Описание изображения'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Описание изображения'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='title_en',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Заголовок изображения'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='title_ru',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Заголовок изображения'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='og_description_en',

            field=models.TextField(blank=True, null=True, verbose_name='OG описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='og_description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='OG описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='OG заголовок'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='OG заголовок'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_description_en',

            field=models.TextField(blank=True, null=True, verbose_name='SEO описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='SEO описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='SEO ключевые слова'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='SEO ключевые слова'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='SEO заголовок'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='SEO заголовок'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='title_en',

            field=models.CharField(default='Важно знать', max_length=200, null=True, verbose_name='Заголовок страницы'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='title_ru',

            field=models.CharField(default='Важно знать', max_length=200, null=True, verbose_name='Заголовок страницы'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='twitter_description_en',

            field=models.TextField(blank=True, null=True, verbose_name='Twitter описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='twitter_description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Twitter описание'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Twitter заголовок'),

        ),

        migrations.AddField(

            model_name='importantpage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Twitter заголовок'),

        ),

        migrations.AddField(

            model_name='importantrule',

            name='description_en',

            field=models.TextField(null=True, verbose_name='Описание правила'),

        ),

        migrations.AddField(

            model_name='importantrule',

            name='description_ru',

            field=models.TextField(null=True, verbose_name='Описание правила'),

        ),

        migrations.AddField(

            model_name='importantrule',

            name='title_en',

            field=models.CharField(max_length=200, null=True, verbose_name='Заголовок правила'),

        ),

        migrations.AddField(

            model_name='importantrule',

            name='title_ru',

            field=models.CharField(max_length=200, null=True, verbose_name='Заголовок правила'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='content_en',

            field=models.TextField(blank=True, null=True, verbose_name='Основной текст секции'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='content_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Основной текст секции'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_conclusion_text_en',

            field=models.TextField(blank=True, help_text='Финальный текст для водителей', null=True, verbose_name='Заключительный текст для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_conclusion_text_ru',

            field=models.TextField(blank=True, help_text='Финальный текст для водителей', null=True, verbose_name='Заключительный текст для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_description_text_en',

            field=models.TextField(blank=True, help_text='Текст перед правилами водителей', null=True, verbose_name='Описание для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_description_text_ru',

            field=models.TextField(blank=True, help_text='Текст перед правилами водителей', null=True, verbose_name='Описание для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_intro_text_en',

            field=models.TextField(blank=True, help_text='Текст с фоном для водителей', null=True, verbose_name='Текст для блока водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_intro_text_ru',

            field=models.TextField(blank=True, help_text='Текст с фоном для водителей', null=True, verbose_name='Текст для блока водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_conclusion_text_en',

            field=models.TextField(blank=True, help_text='Текст после правил пассажиров', null=True, verbose_name='Заключительный текст для пассажиров'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_conclusion_text_ru',

            field=models.TextField(blank=True, help_text='Текст после правил пассажиров', null=True, verbose_name='Заключительный текст для пассажиров'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_intro_text_en',

            field=models.TextField(blank=True, help_text='Текст с фоном для пассажиров', null=True, verbose_name='Текст для блока пассажиров'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_intro_text_ru',

            field=models.TextField(blank=True, help_text='Текст с фоном для пассажиров', null=True, verbose_name='Текст для блока пассажиров'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='subtitle_en',

            field=models.CharField(blank=True, help_text='Для телефонов экстренной помощи', max_length=255, null=True, verbose_name='Подзаголовок'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='subtitle_ru',

            field=models.CharField(blank=True, help_text='Для телефонов экстренной помощи', max_length=255, null=True, verbose_name='Подзаголовок'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='title_en',

            field=models.CharField(max_length=200, null=True, verbose_name='Заголовок секции'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='title_ru',

            field=models.CharField(max_length=200, null=True, verbose_name='Заголовок секции'),

        ),

        migrations.AddField(

            model_name='importanttripcategory',

            name='title_en',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='importanttripcategory',

            name='title_ru',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='internetprovider',

            name='description_en',

            field=models.TextField(blank=True, null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='internetprovider',

            name='description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='internetprovider',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название провайдера'),

        ),

        migrations.AddField(

            model_name='internetprovider',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название провайдера'),

        ),

        migrations.AddField(

            model_name='maindish',

            name='description_en',

            field=models.TextField(help_text='Описание блюда', null=True),

        ),

        migrations.AddField(

            model_name='maindish',

            name='description_ru',

            field=models.TextField(help_text='Описание блюда', null=True),

        ),

        migrations.AddField(

            model_name='maindish',

            name='name_en',

            field=models.CharField(help_text='Название блюда', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='maindish',

            name='name_ru',

            field=models.CharField(help_text='Название блюда', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='internet_section_title_en',

            field=models.CharField(blank=True, default='Интернет', max_length=255, null=True, verbose_name="Заголовок раздела 'Интернет'"),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='internet_section_title_ru',

            field=models.CharField(blank=True, default='Интернет', max_length=255, null=True, verbose_name="Заголовок раздела 'Интернет'"),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='intro_text_en',

            field=models.TextField(blank=True, help_text='Текст в блоке с фоновым изображением', null=True, verbose_name='Вводный текст'),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='intro_text_ru',

            field=models.TextField(blank=True, help_text='Текст в блоке с фоновым изображением', null=True, verbose_name='Вводный текст'),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='main_title_en',

            field=models.CharField(default='Интернет и мобильная связь', help_text='Основной заголовок страницы', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='main_title_ru',

            field=models.CharField(default='Интернет и мобильная связь', help_text='Основной заголовок страницы', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='mobile_section_title_en',

            field=models.CharField(blank=True, default='Мобильная связь', max_length=255, null=True, verbose_name="Заголовок раздела 'Мобильная связь'"),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='mobile_section_title_ru',

            field=models.CharField(blank=True, default='Мобильная связь', max_length=255, null=True, verbose_name="Заголовок раздела 'Мобильная связь'"),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilecommunicationpage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mobilehometab',

            name='label_en',

            field=models.CharField(max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='mobilehometab',

            name='label_ru',

            field=models.CharField(max_length=100, null=True),

        ),

        migrations.AddField(

            model_name='mobileprovider',

            name='description_en',

            field=models.TextField(blank=True, null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='mobileprovider',

            name='description_ru',

            field=models.TextField(blank=True, null=True, verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='mobileprovider',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название оператора'),

        ),

        migrations.AddField(

            model_name='mobileprovider',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название оператора'),

        ),

        migrations.AddField(

            model_name='mountainroute',

            name='name_en',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, null=True, verbose_name='Подзаголовок'),

        ),

        migrations.AddField(

            model_name='mountainroute',

            name='name_ru',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, null=True, verbose_name='Подзаголовок'),

        ),

        migrations.AddField(

            model_name='mountainroute',

            name='title_en',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, null=True, verbose_name='Заголовок'),

        ),

        migrations.AddField(

            model_name='mountainroute',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, null=True, verbose_name='Заголовок'),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='main_title_en',

            field=models.CharField(default='Горные маршруты', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='main_title_ru',

            field=models.CharField(default='Горные маршруты', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='section_title_en',

            field=models.CharField(blank=True, default='Горные маршруты', max_length=255, null=True, verbose_name='Заголовок блока'),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='section_title_ru',

            field=models.CharField(blank=True, default='Горные маршруты', max_length=255, null=True, verbose_name='Заголовок блока'),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='mountainroutespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='intro_text_en',

            field=models.TextField(blank=True, help_text='Текст под описанием музыки', null=True, verbose_name='Текст для музыки'),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='intro_text_ru',

            field=models.TextField(blank=True, help_text='Текст под описанием музыки', null=True, verbose_name='Текст для музыки'),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musicpage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='musictrack',

            name='artist_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Исполнитель'),

        ),

        migrations.AddField(

            model_name='musictrack',

            name='artist_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Исполнитель'),

        ),

        migrations.AddField(

            model_name='musictrack',

            name='title_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название трека'),

        ),

        migrations.AddField(

            model_name='musictrack',

            name='title_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название трека'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='parkinglotcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='parkinglotcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='parkinglotcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='parkinglotcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='parkinglotspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='intro_text_en',

            field=models.TextField(blank=True, help_text='Поддерживаются переносы строк', null=True, verbose_name='Текст баннера'),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='intro_text_ru',

            field=models.TextField(blank=True, help_text='Поддерживаются переносы строк', null=True, verbose_name='Текст баннера'),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='main_title_en',

            field=models.CharField(default='Вечеринки и яркие впечатления', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='main_title_ru',

            field=models.CharField(default='Вечеринки и яркие впечатления', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partiespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='partycity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название города'),

        ),

        migrations.AddField(

            model_name='partycity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название города'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='date_info_en',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Информация о дате'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='date_info_ru',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Информация о дате'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='description_en',

            field=models.TextField(blank=True, help_text='Поддерживаются переносы строк', null=True, verbose_name='Описание события'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='description_ru',

            field=models.TextField(blank=True, help_text='Поддерживаются переносы строк', null=True, verbose_name='Описание события'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='location_en',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Местоположение'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='location_ru',

            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Местоположение'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='title_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название события'),

        ),

        migrations.AddField(

            model_name='partyevent',

            name='title_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название события'),

        ),

        migrations.AddField(

            model_name='pharmacycity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='pharmacycity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='pharmacycity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='pharmacycity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='pharmacyitem',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='pharmacypage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='plantripcategory',

            name='title_en',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='plantripcategory',

            name='title_ru',

            field=models.CharField(max_length=100, null=True, verbose_name='Название категории'),

        ),

        migrations.AddField(

            model_name='privacypolicypage',

            name='content_en',

            field=models.TextField(help_text='Основной контент страницы (HTML)', null=True),

        ),

        migrations.AddField(

            model_name='privacypolicypage',

            name='content_ru',

            field=models.TextField(help_text='Основной контент страницы (HTML)', null=True),

        ),

        migrations.AddField(

            model_name='privacypolicypage',

            name='title_en',

            field=models.CharField(default='Политика конфиденциальности сайта', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='privacypolicypage',

            name='title_ru',

            field=models.CharField(default='Политика конфиденциальности сайта', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='privateclinic',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='restaurant',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='restaurantcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='restaurantcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='restaurantcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='restaurantcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='restaurantspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopcity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='shopcity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='shopcity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='shopcity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='shopormarket',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='shopsandmarketspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='sportsgym',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='sportsgymspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='intro_text_en',

            field=models.TextField(blank=True, help_text='Текст поверх фонового изображения (двойной Enter = новая строка)', null=True, verbose_name='Вводный текст'),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='intro_text_ru',

            field=models.TextField(blank=True, help_text='Текст поверх фонового изображения (двойной Enter = новая строка)', null=True, verbose_name='Вводный текст'),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='main_title_en',

            field=models.CharField(default='Такси', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='main_title_ru',

            field=models.CharField(default='Такси', help_text='Основной заголовок страницы', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxipage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='name_en',

            field=models.CharField(help_text='Название службы такси', max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='name_ru',

            field=models.CharField(help_text='Название службы такси', max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='phones_raw_en',

            field=models.TextField(blank=True, help_text='Один номер на строку', null=True, verbose_name='Телефоны'),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='phones_raw_ru',

            field=models.TextField(blank=True, help_text='Один номер на строку', null=True, verbose_name='Телефоны'),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='working_hours_en',

            field=models.CharField(blank=True, help_text='Например: круглосуточно', max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='taxiservice',

            name='working_hours_ru',

            field=models.CharField(blank=True, help_text='Например: круглосуточно', max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='transportblock',

            name='title_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Заголовок блока'),

        ),

        migrations.AddField(

            model_name='transportblock',

            name='title_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Заголовок блока'),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='main_title_en',

            field=models.CharField(default='Транспортное сообщение республики Абхазия', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='main_title_ru',

            field=models.CharField(default='Транспортное сообщение республики Абхазия', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='transportcommunicationspage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='vetclinic',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Режим работы'),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='description_en',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='description_ru',

            field=models.TextField(blank=True, default='', null=True),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='subtitle_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='subtitle_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='title_en',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='welcomepage',

            name='title_ru',

            field=models.CharField(blank=True, default='', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='og_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='og_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='og_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='og_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='seo_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='twitter_description_en',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='twitter_title_en',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='wineriespage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='winery',

            name='address_en',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='winery',

            name='address_ru',

            field=models.CharField(max_length=500, null=True, verbose_name='Адрес'),

        ),

        migrations.AddField(

            model_name='winery',

            name='contacts_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='winery',

            name='contacts_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='winery',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='winery',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Название'),

        ),

        migrations.AddField(

            model_name='winery',

            name='working_hours_en',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='winery',

            name='working_hours_ru',

            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Часы работы'),

        ),

        migrations.AddField(

            model_name='winerycity',

            name='name_en',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='winerycity',

            name='name_ru',

            field=models.CharField(max_length=255, null=True, verbose_name='Город'),

        ),

        migrations.AddField(

            model_name='winerycity',

            name='title_en',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='winerycity',

            name='title_ru',

            field=models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, null=True, verbose_name='Заголовок страницы города'),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='main_title_en',

            field=models.CharField(default='Ваш доктор', help_text='Основной заголовок страницы', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='main_title_ru',

            field=models.CharField(default='Ваш доктор', help_text='Основной заголовок страницы', max_length=255, null=True, verbose_name='Основной заголовок'),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='og_description_en',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='og_description_ru',

            field=models.CharField(blank=True, help_text='Open Graph описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='og_title_en',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='og_title_ru',

            field=models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_description_en',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_description_ru',

            field=models.CharField(blank=True, help_text='SEO описание страницы', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_keywords_en',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_keywords_ru',

            field=models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_title_en',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='seo_title_ru',

            field=models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='twitter_description_en',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='twitter_description_ru',

            field=models.CharField(blank=True, help_text='Twitter Card описание', max_length=160, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='twitter_title_en',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

        migrations.AddField(

            model_name='yourdoctorpage',

            name='twitter_title_ru',

            field=models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60, null=True),

        ),

    ]

