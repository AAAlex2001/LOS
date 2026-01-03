                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0044_culturalattraction_working_hours'),

    ]



    operations = [

        migrations.AddField(

            model_name='parkinglot',

            name='contacts',

            field=models.CharField(blank=True, max_length=255, verbose_name='Контакты'),

        ),

        migrations.AddField(

            model_name='parkinglot',

            name='working_hours',

            field=models.CharField(blank=True, max_length=255, verbose_name='Режим работы'),

        ),

    ]

