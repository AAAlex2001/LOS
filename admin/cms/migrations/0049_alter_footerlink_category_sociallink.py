                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0048_remove_footer_address_remove_footer_logo_and_more'),

    ]



    operations = [

        migrations.AlterField(

            model_name='footerlink',

            name='category',

            field=models.CharField(choices=[('quick_links', 'Быстрые ссылки'), ('legal', 'Правовая информация')], help_text='Категория ссылки', max_length=20),

        ),

        migrations.CreateModel(

            name='SocialLink',

            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),

                ('created_at', models.DateTimeField(auto_now_add=True)),

                ('updated_at', models.DateTimeField(auto_now=True)),

                ('network', models.CharField(choices=[('telegram', 'Telegram'), ('instagram', 'Instagram'), ('twitter', 'Twitter (X)'), ('facebook', 'Facebook'), ('youtube', 'YouTube'), ('rutube', 'Rutube')], help_text='Социальная сеть', max_length=20)),

                ('url', models.CharField(help_text='Ссылка на профиль', max_length=500)),

                ('order', models.PositiveIntegerField(default=0, help_text='Порядок отображения')),

                ('footer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_links', to='cms.footer')),

            ],

            options={

                'verbose_name': 'Ссылка на соцсеть',

                'verbose_name_plural': 'Ссылки на соцсети',

                'ordering': ['order', 'id'],

            },

        ),

    ]

