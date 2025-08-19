from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cms", "0004_home_tabs"),
    ]

    operations = [
        migrations.AddField(
            model_name="hometab",
            name="href",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]


