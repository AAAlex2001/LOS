from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cms", "0005_hometab_href"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="seo_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="seo_description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="homepage",
            name="seo_keywords",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="canonical_url",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="og_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="og_description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="homepage",
            name="og_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/seo/og/%Y/%m/%d"),
        ),
        migrations.AddField(
            model_name="homepage",
            name="twitter_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="homepage",
            name="twitter_description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="homepage",
            name="twitter_image",
            field=models.ImageField(blank=True, null=True, upload_to="homepage/seo/twitter/%Y/%m/%d"),
        ),
        migrations.AddField(
            model_name="homepage",
            name="robots_index",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="homepage",
            name="robots_follow",
            field=models.BooleanField(default=True),
        ),
    ]


