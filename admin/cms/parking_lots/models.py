from django.db import models

from cms.models import TimestampedModel





class ParkingLotsPage(TimestampedModel):

         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="parking_lots/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="parking_lots/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница парковок"

        verbose_name_plural = "Страница парковок"



    def __str__(self) -> str:

        return "Страница парковок"





class ParkingLotCity(TimestampedModel):

    page = models.ForeignKey(ParkingLotsPage, on_delete=models.CASCADE, related_name="cities")

    name = models.CharField("Город", max_length=255, blank=True)

    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Город (парковки)"

        verbose_name_plural = "Город (парковки)"



    def __str__(self) -> str:

        return self.name





class ParkingLot(TimestampedModel):

    page = models.ForeignKey(ParkingLotsPage, on_delete=models.CASCADE, related_name="parking_lots")

    city = models.ForeignKey(ParkingLotCity, on_delete=models.CASCADE, related_name="parking_lots")

    name = models.CharField("Название", max_length=255, blank=True)

    address = models.CharField("Адрес", max_length=500, blank=True)

    address_link = models.URLField("Ссылка на карту", blank=True)

    working_hours = models.CharField("Режим работы", max_length=255, blank=True)

    contacts = models.CharField("Контакты", max_length=255, blank=True)

    image = models.ImageField("Изображение", upload_to="parking_lots/images/", blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Парковка"

        verbose_name_plural = "Парковка"



    def __str__(self) -> str:

        return self.name



