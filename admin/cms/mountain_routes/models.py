from django.db import models

from cms.models import TimestampedModel





class MountainRoutesPage(TimestampedModel):

    """
    Главная страница раздела "Горные маршруты"
    """

    main_title = models.CharField("Основной заголовок", max_length=255, default="Горные маршруты")

    section_title = models.CharField("Заголовок блока", max_length=255, default="Горные маршруты", blank=True)



         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="mountain_routes/og/", blank=True)



                   

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="mountain_routes/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница 'Горные маршруты'"

        verbose_name_plural = "Страница 'Горные маршруты'"



    def __str__(self) -> str:

        return "Страница 'Горные маршруты'"





class MountainRoute(TimestampedModel):

    page = models.ForeignKey(MountainRoutesPage, on_delete=models.CASCADE, related_name="routes")

    title = models.CharField("Заголовок", max_length=255, blank=True, help_text="Необязательно")

    name = models.CharField("Подзаголовок", max_length=255, blank=True, help_text="Необязательно")

    image = models.ImageField("Изображение", upload_to="mountain_routes/routes/", blank=True)

    site_url = models.URLField("Ссылка на сайт", blank=True)

    phone = models.CharField("Телефон", max_length=255, blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Маршрут"

        verbose_name_plural = "Маршруты"



    def __str__(self) -> str:

        return self.title or self.name or f"Маршрут {self.pk}"

