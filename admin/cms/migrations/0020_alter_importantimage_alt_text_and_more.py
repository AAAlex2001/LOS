                                               



import django.db.models.deletion

from django.db import migrations, models





class Migration(migrations.Migration):



    dependencies = [

        ('cms', '0019_importantimage_description_importantimage_title'),

    ]



    operations = [

        migrations.AlterField(

            model_name='importantimage',

            name='alt_text',

            field=models.CharField(blank=True, max_length=200, verbose_name='Альтернативный текст'),

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='image',

            field=models.ImageField(upload_to='important/', verbose_name='Изображение'),

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='order',

            field=models.PositiveIntegerField(default=0, verbose_name='Порядок отображения'),

        ),

        migrations.AlterField(

            model_name='importantimage',

            name='section',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='cms.importantsection', verbose_name='Секция'),

        ),

        migrations.AlterField(

            model_name='importantpage',

            name='meta_description',

            field=models.TextField(blank=True, verbose_name='SEO описание'),

        ),

        migrations.AlterField(

            model_name='importantpage',

            name='meta_title',

            field=models.CharField(blank=True, max_length=200, verbose_name='SEO заголовок'),

        ),

        migrations.AlterField(

            model_name='importantpage',

            name='title',

            field=models.CharField(default='Важно знать', max_length=200, verbose_name='Заголовок страницы'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='description',

            field=models.TextField(verbose_name='Описание'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='order',

            field=models.PositiveIntegerField(default=0, verbose_name='Порядок отображения'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='rule_type',

            field=models.CharField(choices=[('passenger', 'Правила для пассажиров'), ('driver', 'Правила для водителей')], max_length=20, verbose_name='Тип правила'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='section',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rules', to='cms.importantsection', verbose_name='Секция'),

        ),

        migrations.AlterField(

            model_name='importantrule',

            name='title',

            field=models.CharField(max_length=200, verbose_name='Заголовок'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='content',

            field=models.TextField(blank=True, verbose_name='Содержимое секции'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='order',

            field=models.PositiveIntegerField(default=0, verbose_name='Порядок отображения'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='page',

            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='cms.importantpage', verbose_name='Страница'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='section_type',

            field=models.CharField(choices=[('tourist-pharmacy', 'Туристическая аптечка'), ('emergency-phones', 'Телефоны экстренной помощи'), ('public-behavior', 'Правила поведения в общественных местах'), ('taxi-etiquette', 'Такси-этикет')], max_length=50, verbose_name='Тип секции'),

        ),

        migrations.AlterField(

            model_name='importantsection',

            name='title',

            field=models.CharField(max_length=200, verbose_name='Заголовок секции'),

        ),

    ]

