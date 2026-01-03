                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0030_alter_importantrule_rule_type'),

    ]



    operations = [

        migrations.AddField(

            model_name='importantsection',

            name='driver_background_image',

            field=models.ImageField(blank=True, help_text='Фоновая картинка для блока водителей', upload_to='important/taxi/', verbose_name='Фоновое изображение для блока водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_background_image',

            field=models.ImageField(blank=True, help_text='Фоновая картинка для блока пассажиров', upload_to='important/taxi/', verbose_name='Фоновое изображение для блока пассажиров'),

        ),

    ]

