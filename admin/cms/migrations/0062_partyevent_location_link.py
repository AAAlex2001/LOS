                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0061_transportblock_location_link'),

    ]



    operations = [

        migrations.AddField(

            model_name='partyevent',

            name='location_link',

            field=models.URLField(blank=True, help_text='Ссылка на карту для местоположения', verbose_name='Ссылка на геолокацию'),

        ),

    ]

