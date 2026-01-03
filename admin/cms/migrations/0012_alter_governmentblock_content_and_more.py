                                               



from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0011_governmentstructurepage_governmentblock'),

    ]



    operations = [

        migrations.AlterField(

            model_name='governmentblock',

            name='content',

            field=models.TextField(blank=True),

        ),

        migrations.AlterField(

            model_name='governmentblock',

            name='title',

            field=models.CharField(blank=True, max_length=255),

        ),

    ]

