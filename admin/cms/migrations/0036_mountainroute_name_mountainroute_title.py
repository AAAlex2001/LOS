                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0035_remove_mountainroute_name_and_more'),

    ]



    operations = [

        migrations.AddField(

            model_name='mountainroute',

            name='name',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, verbose_name='Подзаголовок'),

        ),

        migrations.AddField(

            model_name='mountainroute',

            name='title',

            field=models.CharField(blank=True, help_text='Необязательно', max_length=255, verbose_name='Заголовок'),

        ),

    ]

