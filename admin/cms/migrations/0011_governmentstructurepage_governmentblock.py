                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0010_excursionspage_excursionservice'),

    ]



    operations = [

        migrations.CreateModel(

            name='GovernmentStructurePage',

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

                ('og_image', models.ImageField(blank=True, upload_to='gov/og/')),

                ('twitter_title', models.CharField(blank=True, max_length=60)),

                ('twitter_description', models.CharField(blank=True, max_length=160)),

                ('twitter_image', models.ImageField(blank=True, upload_to='gov/twitter/')),

                ('robots_index', models.BooleanField(default=True)),

                ('robots_follow', models.BooleanField(default=True)),

            ],

            options={

                'verbose_name': 'Страница: Государственное устройство',

                'verbose_name_plural': 'Страница: Государственное устройство',

            },

        ),

        migrations.CreateModel(

            name='GovernmentBlock',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(max_length=255)),

                ('content', models.TextField()),

                ('image', models.ImageField(blank=True, upload_to='gov/images/')),

                ('order', models.PositiveIntegerField(default=0)),

                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocks', to='cms.governmentstructurepage')),

            ],

            options={

                'verbose_name': 'Блок описания',

                'verbose_name_plural': 'Блоки описания',

                'ordering': ['order', 'id'],

            },

        ),

    ]

