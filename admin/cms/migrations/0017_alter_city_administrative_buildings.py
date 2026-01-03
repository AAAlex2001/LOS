                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0016_city_administrative_buildings'),

    ]



    operations = [

        migrations.AlterField(

            model_name='city',

            name='administrative_buildings',

            field=models.TextField(blank=True, default='', help_text='Описание административных зданий города', verbose_name='Административные здания'),

        ),

    ]

