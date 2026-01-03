from django.db import models

from cms.models import TimestampedModel





class BeachesPage(TimestampedModel):

         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="beaches/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="beaches/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница пляжей"

        verbose_name_plural = "Страница пляжей"



    def __str__(self) -> str:

        return "Страница пляжей"





class BeachCity(TimestampedModel):

    page = models.ForeignKey(BeachesPage, on_delete=models.CASCADE, related_name="cities")

    name = models.CharField("Город", max_length=255, blank=True)

    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Город (пляжи)"

        verbose_name_plural = "Город (пляжи)"



    def __str__(self) -> str:

        return self.name





class Beach(TimestampedModel):

    page = models.ForeignKey(BeachesPage, on_delete=models.CASCADE, related_name="beaches")

    city = models.ForeignKey(BeachCity, on_delete=models.CASCADE, related_name="beaches")

    name = models.CharField("Название", max_length=255, blank=True)

    name_link = models.URLField("Ссылка", blank=True)

    address = models.CharField("Адрес", max_length=500, blank=True)

    address_link = models.URLField("Ссылка на карту", blank=True)

    description = models.TextField("Описание", blank=True, help_text="Один-два абзаца; двойной Enter = новый абзац")

    phone = models.CharField("Телефон", max_length=255, blank=True)

    image = models.ImageField("Изображение", upload_to="beaches/images/", blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Пляж"

        verbose_name_plural = "Пляж"



    def __str__(self) -> str:

        return self.name





