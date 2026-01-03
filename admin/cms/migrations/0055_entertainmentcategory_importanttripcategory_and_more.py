                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0054_aboutabkhaziacategory'),

    ]



    operations = [

        migrations.CreateModel(

            name='EntertainmentCategory',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(max_length=100, verbose_name='Название категории')),

                ('slug', models.SlugField(help_text='Уникальный идентификатор для API', max_length=100, unique=True, verbose_name='Слаг')),

                ('order', models.PositiveIntegerField(default=0)),

                ('is_active', models.BooleanField(default=True, verbose_name='Активна')),

                ('homepage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entertainment_categories', to='cms.homepage')),

            ],

            options={

                'verbose_name': 'Категория (Развлечения)',

                'verbose_name_plural': 'Категории (Развлечения)',

                'ordering': ['order', 'id'],

            },

        ),

        migrations.CreateModel(

            name='ImportantTripCategory',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(max_length=100, verbose_name='Название категории')),

                ('slug', models.SlugField(help_text='Уникальный идентификатор для API', max_length=100, unique=True, verbose_name='Слаг')),

                ('order', models.PositiveIntegerField(default=0)),

                ('is_active', models.BooleanField(default=True, verbose_name='Активна')),

                ('homepage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='important_trip_categories', to='cms.homepage')),

            ],

            options={

                'verbose_name': 'Категория (Необходимо в поездке)',

                'verbose_name_plural': 'Категории (Необходимо в поездке)',

                'ordering': ['order', 'id'],

            },

        ),

        migrations.CreateModel(

            name='PlanTripCategory',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(max_length=100, verbose_name='Название категории')),

                ('slug', models.SlugField(help_text='Уникальный идентификатор для API', max_length=100, unique=True, verbose_name='Слаг')),

                ('order', models.PositiveIntegerField(default=0)),

                ('is_active', models.BooleanField(default=True, verbose_name='Активна')),

                ('homepage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plan_trip_categories', to='cms.homepage')),

            ],

            options={

                'verbose_name': 'Категория (Запланируйте поездку)',

                'verbose_name_plural': 'Категории (Запланируйте поездку)',

                'ordering': ['order', 'id'],

            },

        ),

    ]

