                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0001_initial'),

    ]



    operations = [

        migrations.CreateModel(

            name='CitiesPage',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('seo_title', models.CharField(blank=True, max_length=60)),

                ('seo_description', models.CharField(blank=True, max_length=160)),

                ('seo_keywords', models.CharField(blank=True, max_length=255)),

                ('canonical_url', models.URLField(blank=True)),

                ('og_title', models.CharField(blank=True, max_length=60)),

                ('og_description', models.CharField(blank=True, max_length=160)),

                ('og_image', models.ImageField(blank=True, upload_to='cities/og/')),

                ('twitter_title', models.CharField(blank=True, max_length=60)),

                ('twitter_description', models.CharField(blank=True, max_length=160)),

                ('twitter_image', models.ImageField(blank=True, upload_to='cities/twitter/')),

                ('robots_index', models.BooleanField(default=True)),

                ('robots_follow', models.BooleanField(default=True)),

            ],

            options={

                'verbose_name': 'Страница городов',

                'verbose_name_plural': 'Страница городов',

            },

        ),

        migrations.AlterModelOptions(

            name='abkhaziancustomspage',

            options={'verbose_name': 'Страница абхазских обычаев', 'verbose_name_plural': 'Страницы абхазских обычаев'},

        ),

        migrations.AlterModelOptions(

            name='customsection',

            options={'ordering': ['order', 'id'], 'verbose_name': 'Секция обычаев', 'verbose_name_plural': 'Секции обычаев'},

        ),

        migrations.CreateModel(

            name='City',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('name', models.CharField(max_length=255, verbose_name='Название города')),

                ('title', models.CharField(blank=True, help_text='Если пусто, будет сформирован автоматически', max_length=255, verbose_name='Заголовок страницы города')),

                ('description', models.TextField(blank=True, verbose_name='Описание города')),

                ('image', models.ImageField(blank=True, upload_to='cities/images/', verbose_name='Изображение города')),

                ('order', models.PositiveIntegerField(default=0)),

                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to='cms.citiespage')),

            ],

            options={

                'verbose_name': 'Город',

                'verbose_name_plural': 'Города',

                'ordering': ['order', 'id'],

            },

        ),

    ]

