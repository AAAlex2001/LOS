                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0024_importantsection_image'),

    ]



    operations = [

        migrations.AddField(

            model_name='importantimage',

            name='page',

            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='cms.importantpage'),

        ),

        migrations.AddField(

            model_name='importantrule',

            name='page',

            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rules', to='cms.importantpage'),

        ),

    ]

