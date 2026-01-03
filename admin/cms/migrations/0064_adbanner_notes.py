                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0063_adbanner'),

    ]



    operations = [

        migrations.AddField(

            model_name='adbanner',

            name='notes',

            field=models.TextField(blank=True, default='', verbose_name='Заметки (только для админов)'),

        ),

    ]

