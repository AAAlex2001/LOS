                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0029_importantsection_driver_conclusion_text_and_more'),

    ]



    operations = [

        migrations.AlterField(

            model_name='importantrule',

            name='rule_type',

            field=models.CharField(blank=True, choices=[('passenger', 'Для пассажиров'), ('driver', 'Для водителей')], default='passenger', max_length=20, verbose_name='Тип правила'),

        ),

    ]

