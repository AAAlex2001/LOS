                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0018_alter_city_options'),

    ]



    operations = [

        migrations.AddField(

            model_name='importantimage',

            name='description',

            field=models.TextField(blank=True, help_text='Описание изображения', verbose_name='Описание'),

        ),

        migrations.AddField(

            model_name='importantimage',

            name='title',

            field=models.CharField(blank=True, help_text='Заголовок изображения', max_length=200, verbose_name='Заголовок'),

        ),

    ]

