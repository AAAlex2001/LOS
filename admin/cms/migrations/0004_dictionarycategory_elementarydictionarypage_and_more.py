                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0003_citycategory'),

    ]



    operations = [

        migrations.CreateModel(

            name='DictionaryCategory',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(help_text='Название категории', max_length=255)),

                ('order', models.PositiveIntegerField(default=0, help_text='Порядок сортировки')),

            ],

            options={

                'verbose_name': 'Категория словаря',

                'verbose_name_plural': 'Категории словаря',

                'ordering': ['order', 'id'],

            },

        ),

        migrations.CreateModel(

            name='ElementaryDictionaryPage',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('seo_title', models.CharField(blank=True, help_text='SEO заголовок страницы', max_length=60)),

                ('seo_description', models.CharField(blank=True, help_text='SEO описание страницы', max_length=160)),

                ('seo_keywords', models.CharField(blank=True, help_text='SEO ключевые слова (через запятую)', max_length=255)),

                ('canonical_url', models.URLField(blank=True, help_text='Канонический URL')),

                ('og_title', models.CharField(blank=True, help_text='Open Graph заголовок', max_length=60)),

                ('og_description', models.CharField(blank=True, help_text='Open Graph описание', max_length=160)),

                ('og_image', models.ImageField(blank=True, help_text='Open Graph изображение', upload_to='elementary_dictionary/og/')),

                ('twitter_title', models.CharField(blank=True, help_text='Twitter Card заголовок', max_length=60)),

                ('twitter_description', models.CharField(blank=True, help_text='Twitter Card описание', max_length=160)),

                ('twitter_image', models.ImageField(blank=True, help_text='Twitter Card изображение', upload_to='elementary_dictionary/twitter/')),

                ('robots_index', models.BooleanField(default=True, help_text='Разрешить индексацию')),

                ('robots_follow', models.BooleanField(default=True, help_text='Разрешить следование по ссылкам')),

            ],

            options={

                'verbose_name': 'Страница элементарного словаря',

                'verbose_name_plural': 'Страница элементарного словаря',

            },

        ),

        migrations.CreateModel(

            name='DictionaryWord',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('russian', models.TextField(help_text='Перевод на русском языке')),

                ('abkhazian', models.TextField(help_text='Перевод на абхазском языке')),

                ('order', models.PositiveIntegerField(default=0, help_text='Порядок сортировки')),

                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='words', to='cms.dictionarycategory')),

            ],

            options={

                'verbose_name': 'Слово/фраза',

                'verbose_name_plural': 'Слова/фразы',

                'ordering': ['order', 'id'],

            },

        ),

        migrations.AddField(

            model_name='dictionarycategory',

            name='page',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='cms.elementarydictionarypage'),

        ),

    ]

