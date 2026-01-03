                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0006_dictionaryword_position_and_more'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='dictionaryword',

            name='position',

        ),

        migrations.AddField(

            model_name='dictionarycategory',

            name='position',

            field=models.CharField(choices=[('left', 'Слева'), ('right', 'Справа'), ('center', 'По центру')], default='left', help_text='Позиция отображения', max_length=10),

        ),

    ]

