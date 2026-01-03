                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0023_remove_importantimage_page_remove_importantrule_page_and_more'),

    ]



    operations = [

        migrations.AddField(

            model_name='importantsection',

            name='image',

            field=models.ImageField(blank=True, help_text='Картинка для секции', upload_to='important/sections/', verbose_name='Изображение секции'),

        ),

    ]

