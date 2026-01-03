                                               



from django.db import migrations





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0007_remove_dictionaryword_position_and_more'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='dictionarycategory',

            name='position',

        ),

    ]

