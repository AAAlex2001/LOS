                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0051_sportsgymspage_sportsgym'),

    ]



    operations = [

        migrations.AddField(

            model_name='hometab',

            name='platform',

            field=models.CharField(choices=[('web', 'Веб-сайт'), ('mobile', 'Мобильное приложение'), ('both', 'Оба (веб и мобильное)')], default='both', max_length=10),

        ),

    ]

