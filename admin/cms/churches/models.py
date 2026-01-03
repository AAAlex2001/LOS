from django.db import models

from cms.models import TimestampedModel





class ChurchesPage(TimestampedModel):

         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="churches/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="churches/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница церквей"

        verbose_name_plural = "Страница церквей"



    def __str__(self) -> str:

        return "Страница церквей"





class ChurchCity(TimestampedModel):

    page = models.ForeignKey(ChurchesPage, on_delete=models.CASCADE, related_name="cities")

    name = models.CharField("Город", max_length=255, blank=True)

    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Город (церкви)"

        verbose_name_plural = "Город (церкви)"



    def __str__(self) -> str:

        return self.name





class Church(TimestampedModel):

    page = models.ForeignKey(ChurchesPage, on_delete=models.CASCADE, related_name="churches")

    city = models.ForeignKey(ChurchCity, on_delete=models.CASCADE, related_name="churches")

    name = models.CharField("Название", max_length=255, blank=True)

    name_link = models.URLField("Ссылка на сайт", blank=True)

    address = models.CharField("Адрес", max_length=500, blank=True)

    address_link = models.URLField("Ссылка на карту", blank=True)

    working_hours = models.CharField("Режим работы", max_length=255, blank=True)

    description = models.TextField("Описание", blank=True, help_text="Описание церкви, история, особенности")

    services = models.TextField("Богослужения", blank=True, help_text="Расписание богослужений, через запятую или с новой строки")

    image = models.ImageField("Изображение", upload_to="churches/images/", blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Церковь"

        verbose_name_plural = "Церковь"



    def __str__(self) -> str:

        return self.name

