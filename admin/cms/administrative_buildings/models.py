from django.db import models

from cms.models import TimestampedModel





class AdministrativeBuildingsPage(TimestampedModel):

         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="administrative_buildings/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="administrative_buildings/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница административных зданий"

        verbose_name_plural = "Страница административных зданий"



    def __str__(self) -> str:

        return "Страница административных зданий"





class AdministrativeBuildingCity(TimestampedModel):

    page = models.ForeignKey(AdministrativeBuildingsPage, on_delete=models.CASCADE, related_name="cities")

    name = models.CharField("Город", max_length=255, blank=True)

    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Город (административные здания)"

        verbose_name_plural = "Город (административные здания)"



    def __str__(self) -> str:

        return self.name





class AdministrativeBuilding(TimestampedModel):

    page = models.ForeignKey(AdministrativeBuildingsPage, on_delete=models.CASCADE, related_name="buildings")

    city = models.ForeignKey(AdministrativeBuildingCity, on_delete=models.CASCADE, related_name="buildings")

    name = models.CharField("Название", max_length=255, blank=True)

    name_link = models.URLField("Ссылка на сайт", blank=True)

    working_hours = models.CharField("Режим работы", max_length=255, blank=True)

    address = models.CharField("Адрес", max_length=500, blank=True)

    address_link = models.URLField("Ссылка на карту", blank=True)

    contacts = models.CharField("Контакты", max_length=255, blank=True)

    image = models.ImageField("Изображение", upload_to="administrative_buildings/images/", blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Административное здание"

        verbose_name_plural = "Административное здание"



    def __str__(self) -> str:

        return self.name





