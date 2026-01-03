                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0040_remove_partiespage_intro_text_1_and_more'),

    ]



    operations = [

        migrations.AddField(

            model_name='partyevent',

            name='page',

            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='events', to='cms.partiespage'),

        ),

    ]

