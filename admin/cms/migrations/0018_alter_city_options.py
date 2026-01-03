                                               



from django.db import migrations





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0017_alter_city_administrative_buildings'),

    ]



    operations = [

        migrations.AlterModelOptions(

            name='city',

            options={'ordering': ['order', 'id'], 'verbose_name': 'Город', 'verbose_name_plural': 'Страница Городов'},

        ),

    ]

