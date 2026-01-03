                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0005_dictionaryword_page'),

    ]



    operations = [

        migrations.AddField(

            model_name='dictionaryword',

            name='position',

            field=models.CharField(choices=[('left', 'Слева'), ('right', 'Справа'), ('center', 'По центру')], default='left', help_text='Позиция отображения', max_length=10),

        ),

        migrations.AlterField(

            model_name='dictionaryword',

            name='abkhazian',

            field=models.CharField(help_text='Перевод на абхазском языке', max_length=500),

        ),

        migrations.AlterField(

            model_name='dictionaryword',

            name='russian',

            field=models.CharField(help_text='Перевод на русском языке', max_length=500),

        ),

    ]

