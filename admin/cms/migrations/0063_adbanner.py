                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0062_partyevent_location_link'),

    ]



    operations = [

        migrations.CreateModel(

            name='AdBanner',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('image', models.ImageField(upload_to='ad_banner/', verbose_name='Изображение')),

                ('title', models.CharField(blank=True, default='', max_length=255, verbose_name='Заголовок')),

                ('description', models.TextField(blank=True, default='', verbose_name='Описание')),

                ('site', models.CharField(blank=True, default='', max_length=255, verbose_name='Сайт')),

                ('url', models.URLField(blank=True, default='', verbose_name='Ссылка')),

                ('is_active', models.BooleanField(default=True, verbose_name='Активен')),

            ],

            options={

                'verbose_name': 'Рекламный баннер',

                'verbose_name_plural': 'Рекламный баннер',

            },

        ),

    ]

