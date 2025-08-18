from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="HomePage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("hero_text_primary", models.TextField(blank=True, default="", help_text="Геро-текст №1. Перенос строки через Enter")),
                ("hero_text_secondary", models.TextField(blank=True, default="", help_text="Геро-текст №2. Перенос строки через Enter")),
                ("tab_about_label", models.CharField(default="Об Абхазии", max_length=100)),
                ("tab_activities_label", models.CharField(default="Чем заняться", max_length=100)),
                ("tab_booking_label", models.CharField(default="Запланируйте поездку", max_length=100)),
                ("tab_essentials_label", models.CharField(default="Необходимо в поездке", max_length=100)),
                ("cta_title", models.CharField(blank=True, default="", max_length=255)),
                ("cta_hero_text", models.TextField(blank=True, default="", help_text="Текст над карточкой. Перенос строки через Enter")),
                ("cta_card_image", models.ImageField(blank=True, null=True, upload_to="homepage/cta/%Y/%m/%d")),
                ("cta_card_title", models.CharField(blank=True, default="", max_length=255)),
                ("cta_card_description", models.CharField(blank=True, default="", max_length=255)),
                ("cta_button_label", models.CharField(blank=True, default="", max_length=100)),
                ("cta_button_href", models.CharField(blank=True, default="", max_length=255)),
            ],
            options={
                "verbose_name": "Главная страница (данные)",
                "verbose_name_plural": "Главная страница (данные)",
            },
        ),
        migrations.CreateModel(
            name="Page",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("slug", models.SlugField(help_text="URL-идентификатор страницы", max_length=120, unique=True)),
                ("title", models.CharField(max_length=255)),
                ("subtitle", models.CharField(blank=True, max_length=255)),
                ("body", models.TextField(blank=True)),
            ],
            options={
                "verbose_name": "Страница",
                "verbose_name_plural": "Страницы",
                "ordering": ["slug"],
            },
        ),
        migrations.CreateModel(
            name="HomeCity",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("image", models.ImageField(upload_to="homepage/cities/%Y/%m/%d")),
                ("title", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="cities", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Город (карточка)",
                "verbose_name_plural": "Города (карточки)",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="HomeActivity",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("image", models.ImageField(upload_to="homepage/activities/%Y/%m/%d")),
                ("title", models.CharField(max_length=255)),
                ("href", models.CharField(help_text="Ссылка внутри сайта, например /parties", max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="activities", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Активность",
                "verbose_name_plural": "Активности",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="HomeActionButton",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("label", models.CharField(max_length=255)),
                ("href", models.CharField(max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="action_buttons", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Кнопка (действие)",
                "verbose_name_plural": "Кнопки (действия)",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="HomePopupItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("group", models.CharField(choices=[("about", "Об Абхазии"), ("activities", "Чем заняться"), ("booking", "Запланируйте поездку"), ("essentials", "Необходимо в поездке")], max_length=20)),
                ("label", models.CharField(max_length=255)),
                ("href", models.CharField(max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="popup_items", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Пункт всплывающего меню",
                "verbose_name_plural": "Пункты всплывающего меню",
                "ordering": ["group", "order", "id"],
            },
        ),
        migrations.CreateModel(
            name="HomeSliderItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("media_type", models.CharField(choices=[("image", "Изображение"), ("video", "Видео")], default="image", max_length=10)),
                ("image", models.ImageField(blank=True, null=True, upload_to="homepage/slider/images/%Y/%m/%d")),
                ("video", models.FileField(blank=True, null=True, upload_to="homepage/slider/videos/%Y/%m/%d")),
                ("alt", models.CharField(blank=True, max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="slider_items", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Слайд",
                "verbose_name_plural": "Слайды",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="ImageAsset",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("alt", models.CharField(blank=True, max_length=255)),
                ("image", models.ImageField(upload_to="uploads/%Y/%m/%d")),
                ("order", models.PositiveIntegerField(default=0)),
                ("page", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="images", to="cms.page")),
            ],
            options={
                "verbose_name": "Изображение",
                "verbose_name_plural": "Изображения",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="AdSlider",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(default="Ad Slider", max_length=255)),
            ],
            options={
                "verbose_name": "Рекламный слайдер",
                "verbose_name_plural": "Рекламные слайдеры",
            },
        ),
        migrations.CreateModel(
            name="AdSlide",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("media_type", models.CharField(choices=[("image", "Изображение"), ("video", "Видео")], default="image", max_length=10)),
                ("image", models.ImageField(blank=True, null=True, upload_to="adslider/images/%Y/%m/%d")),
                ("video", models.FileField(blank=True, null=True, upload_to="adslider/videos/%Y/%m/%d")),
                ("alt", models.CharField(blank=True, max_length=255)),
                ("order", models.PositiveIntegerField(default=0)),
                ("slider", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="slides", to="cms.adslider")),
            ],
            options={
                "verbose_name": "Слайд рекламного слайдера",
                "verbose_name_plural": "Слайды рекламного слайдера",
                "ordering": ["order", "id"],
            },
        ),
    ]


