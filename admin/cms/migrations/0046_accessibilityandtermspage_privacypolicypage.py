                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0045_parkinglot_contacts_parkinglot_working_hours'),

    ]



    operations = [

        migrations.CreateModel(

            name='AccessibilityAndTermsPage',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(default='Доступность и правила пользования сайтом', max_length=255)),

                ('content', models.TextField(help_text='Основной контент страницы (HTML)')),

            ],

            options={

                'verbose_name': 'Доступность и правила пользования',

                'verbose_name_plural': 'Доступность и правила пользования',

            },

        ),

        migrations.CreateModel(

            name='PrivacyPolicyPage',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('title', models.CharField(default='Политика конфиденциальности сайта', max_length=255)),

                ('content', models.TextField(help_text='Основной контент страницы (HTML)')),

            ],

            options={

                'verbose_name': 'Политика конфиденциальности',

                'verbose_name_plural': 'Политика конфиденциальности',

            },

        ),

    ]

