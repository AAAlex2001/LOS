                                               



from django.db import migrations





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0037_transportcommunicationspage_transportblock'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='transportblock',

            name='image_1_alt',

        ),

        migrations.RemoveField(

            model_name='transportblock',

            name='image_2_alt',

        ),

    ]

