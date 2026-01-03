                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0013_hotspringspage_hotspring'),

    ]



    operations = [

        migrations.AddField(

            model_name='hotspringspage',

            name='hero_background',

            field=models.ImageField(blank=True, help_text='Фоновое изображение для плашки', upload_to='hot_springs/hero/'),

        ),

        migrations.AddField(

            model_name='hotspringspage',

            name='hero_text',

            field=models.TextField(blank=True, help_text='Текст на плашке вверху страницы (поддержка переносов и **жирного**)'),

        ),

    ]

