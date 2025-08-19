from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("cms", "0003_homepage_fields_images"),
    ]

    operations = [
        migrations.CreateModel(
            name="HomeTab",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("group", models.CharField(choices=[("about", "Об Абхазии"), ("activities", "Чем заняться"), ("booking", "Запланируйте поездку"), ("essentials", "Необходимо в поездке")], max_length=20)),
                ("label", models.CharField(max_length=100)),
                ("order", models.PositiveIntegerField(default=0)),
                ("homepage", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="tabs", to="cms.homepage")),
            ],
            options={
                "verbose_name": "Таб (верхнее меню)",
                "verbose_name_plural": "Табы (верхнее меню)",
                "ordering": ["order", "id"],
            },
        ),
    ]


