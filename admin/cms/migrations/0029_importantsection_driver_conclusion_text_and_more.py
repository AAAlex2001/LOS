                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0028_importantrule_rule_type'),

    ]



    operations = [

        migrations.AddField(

            model_name='importantsection',

            name='driver_conclusion_text',

            field=models.TextField(blank=True, help_text='Финальный текст для водителей', verbose_name='Заключительный текст для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_description_text',

            field=models.TextField(blank=True, help_text='Текст перед правилами водителей', verbose_name='Описание для водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='driver_intro_text',

            field=models.TextField(blank=True, help_text='Текст с фоном для водителей', verbose_name='Текст для блока водителей'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_conclusion_text',

            field=models.TextField(blank=True, help_text='Текст после правил пассажиров', verbose_name='Заключительный текст для пассажиров'),

        ),

        migrations.AddField(

            model_name='importantsection',

            name='passenger_intro_text',

            field=models.TextField(blank=True, help_text='Текст с фоном для пассажиров', verbose_name='Текст для блока пассажиров'),

        ),

    ]

