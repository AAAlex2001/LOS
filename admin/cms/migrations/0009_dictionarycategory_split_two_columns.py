                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0008_remove_dictionarycategory_position'),

    ]



    operations = [

        migrations.AddField(

            model_name='dictionarycategory',

            name='split_two_columns',

            field=models.BooleanField(default=False, help_text='Всегда разбивать слова на две колонки'),

        ),

    ]

