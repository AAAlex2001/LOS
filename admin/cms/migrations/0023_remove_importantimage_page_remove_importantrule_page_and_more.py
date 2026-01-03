                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0022_importantsection_hero_image_and_more'),

    ]



    operations = [

        migrations.RemoveField(

            model_name='importantimage',

            name='page',

        ),

        migrations.RemoveField(

            model_name='importantrule',

            name='page',

        ),

        migrations.RemoveField(

            model_name='importantrule',

            name='rule_type',

        ),

        migrations.RemoveField(

            model_name='importantsection',

            name='hero_image',

        ),

        migrations.RemoveField(

            model_name='importantsection',

            name='hero_image_alt',

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='description',

            field=models.TextField(blank=True, verbose_name='Описание изображения'),

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='section',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='cms.importantsection'),

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='title',

            field=models.CharField(blank=True, max_length=200, verbose_name='Заголовок изображения'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='description',

            field=models.TextField(verbose_name='Описание правила'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='section',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rules', to='cms.importantsection'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='title',

            field=models.CharField(max_length=200, verbose_name='Заголовок правила'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='content',

            field=models.TextField(blank=True, verbose_name='Основной текст секции'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='page',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='cms.importantpage'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='subtitle',

            field=models.CharField(blank=True, help_text='Для телефонов экстренной помощи', max_length=255, verbose_name='Подзаголовок'),

        ),

    ]

