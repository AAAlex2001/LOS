                                               



from django.db import migrations





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0025_importantimage_page_importantrule_page'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='importantsection',

            name='content',

        ),

        migrations.RemoveField(

            model_name='importantsection',

            name='subtitle',

        ),

    ]

