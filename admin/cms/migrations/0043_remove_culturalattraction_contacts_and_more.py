                                               



from django.db import migrations





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0042_partyslideritem'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='culturalattraction',

            name='contacts',

        ),

        migrations.RemoveField(

            model_name='culturalattraction',

            name='working_hours',

        ),

    ]

