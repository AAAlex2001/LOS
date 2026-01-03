                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0059_welcomepage_welcomeicon'),

    ]



    operations = [

        migrations.AddField(

            model_name='hotspring',

            name='location_link',

            field=models.URLField(blank=True, help_text='Ссылка на карту для заголовка', verbose_name='Ссылка на геолокацию'),

        ),

    ]

