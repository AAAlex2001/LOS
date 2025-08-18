from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cms", "0002_update_homepage_adslider"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="hero_bg_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/bg/%Y/%m/%d"),
        ),
        migrations.AddField(
            model_name="homepage",
            name="cities_section_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="activities_section_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="actions_section_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="cta_bg_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/cta_bg/%Y/%m/%d"),
        ),
        migrations.AddField(
            model_name="homepage",
            name="cta_overlay_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/cta_overlay/%Y/%m/%d"),
        ),
        migrations.AddField(
            model_name="homepage",
            name="activities_bg_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/bg/%Y/%m/%d"),
        ),
    ]


