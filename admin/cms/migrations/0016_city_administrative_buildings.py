                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0015_importantpage_importantsection_importantrule_and_more'),

    ]



    operations = [

                                                                           

        migrations.SeparateDatabaseAndState(

            database_operations=[],

            state_operations=[

                migrations.AddField(

                    model_name='city',

                    name='administrative_buildings',

                    field=models.TextField(blank=True, help_text='Описание административных зданий города', null=True, verbose_name='Административные здания'),

                ),

            ],

        ),

    ]

