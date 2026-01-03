                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0012_alter_governmentblock_content_and_more'),

    ]



    operations = [

        migrations.CreateModel(

            name='HotSpringsPage',

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

                ('og_image', models.ImageField(blank=True, upload_to='hot_springs/og/')),

                ('twitter_title', models.CharField(blank=True, max_length=60)),

                ('twitter_description', models.CharField(blank=True, max_length=160)),

                ('twitter_image', models.ImageField(blank=True, upload_to='hot_springs/twitter/')),

                ('robots_index', models.BooleanField(default=True)),

                ('robots_follow', models.BooleanField(default=True)),

            ],

            options={

                'verbose_name': 'Страница: Горячие источники',

                'verbose_name_plural': 'Страница: Горячие источники',

            },

        ),

        migrations.CreateModel(

            name='HotSpring',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(max_length=255)),

                ('description', models.TextField(blank=True)),

                ('image', models.ImageField(blank=True, upload_to='hot_springs/images/')),

                ('order', models.PositiveIntegerField(default=0)),

                ('page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='springs', to='cms.hotspringspage')),

            ],

            options={

                'verbose_name': 'Горячий источник',

                'verbose_name_plural': 'Горячие источники',

                'ordering': ['order', 'id'],

            },

        ),

    ]

