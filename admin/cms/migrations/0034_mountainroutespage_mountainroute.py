                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0033_mobilecommunicationpage_internetprovider_and_more'),

    ]



    operations = [

        migrations.CreateModel(

            name='MountainRoutesPage',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('main_title', models.CharField(default='Горные маршруты', max_length=255, verbose_name='Основной заголовок')),

                ('section_title', models.CharField(blank=True, default='Горные маршруты', max_length=255, verbose_name='Заголовок блока')),

                ('seo_title', models.CharField(blank=True, max_length=60)),

                ('seo_description', models.CharField(blank=True, max_length=160)),

                ('seo_keywords', models.CharField(blank=True, max_length=255)),

                ('canonical_url', models.URLField(blank=True)),

                ('og_title', models.CharField(blank=True, max_length=60)),

                ('og_description', models.CharField(blank=True, max_length=160)),

                ('og_image', models.ImageField(blank=True, upload_to='mountain_routes/og/')),

                ('twitter_title', models.CharField(blank=True, max_length=60)),

                ('twitter_description', models.CharField(blank=True, max_length=160)),

                ('twitter_image', models.ImageField(blank=True, upload_to='mountain_routes/twitter/')),

                ('robots_index', models.BooleanField(default=True)),

                ('robots_follow', models.BooleanField(default=True)),

            ],

            options={

                'verbose_name': "Страница 'Горные маршруты'",

                'verbose_name_plural': "Страница 'Горные маршруты'",

            },

        ),

        migrations.CreateModel(

            name='MountainRoute',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(blank=True, max_length=255, verbose_name='Заголовок')),

                ('name', models.CharField(blank=True, max_length=255, verbose_name='Имя/название')),

                ('phone', models.CharField(blank=True, max_length=255, verbose_name='Телефон')),

                ('text', models.TextField(blank=True, help_text='Поддерживаются переносы строк', verbose_name='Текст')),

                ('site_url', models.URLField(blank=True, verbose_name='Ссылка на сайт')),

                ('site_label', models.CharField(blank=True, help_text="Напр.: 'САЙТ:'", max_length=255, verbose_name='Подпись ссылки')),

                ('image', models.ImageField(blank=True, upload_to='mountain_routes/routes/', verbose_name='Изображение')),

                ('order', models.PositiveIntegerField(default=0)),

                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='routes', to='cms.mountainroutespage')),

            ],

            options={

                'verbose_name': 'Маршрут',

                'verbose_name_plural': 'Маршруты',

                'ordering': ['order', 'id'],

            },

        ),

    ]

