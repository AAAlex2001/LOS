                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0004_dictionarycategory_elementarydictionarypage_and_more'),

    ]



    operations = [

        migrations.AddField(

            model_name='dictionaryword',

            name='page',

            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='words', to='cms.elementarydictionarypage'),

        ),

    ]

