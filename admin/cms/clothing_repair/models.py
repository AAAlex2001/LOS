from django.db import models

from cms.models import TimestampedModel





class ClothingRepairPage(TimestampedModel):

         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="clothing_repair/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="clothing_repair/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница ремонта одежды"

        verbose_name_plural = "Страница ремонта одежды"



    def __str__(self) -> str:

        return "Страница ремонта одежды"





class ClothingRepairCity(TimestampedModel):

    page = models.ForeignKey(ClothingRepairPage, on_delete=models.CASCADE, related_name="cities")

    name = models.CharField("Город", max_length=255, blank=True)

    title = models.CharField("Заголовок страницы города", max_length=255, blank=True, help_text="Если пусто, будет сформирован автоматически")

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Город (ремонт одежды)"

        verbose_name_plural = "Город (ремонт одежды)"



    def __str__(self) -> str:

        return self.name





class ClothingRepair(TimestampedModel):

    page = models.ForeignKey(ClothingRepairPage, on_delete=models.CASCADE, related_name="repairs")

    city = models.ForeignKey(ClothingRepairCity, on_delete=models.CASCADE, related_name="repairs")

    name = models.CharField("Название", max_length=255, blank=True)

    name_link = models.URLField("Ссылка на сайт", blank=True)

    address = models.CharField("Адрес", max_length=500, blank=True)

    address_link = models.URLField("Ссылка на карту", blank=True)

    working_hours = models.CharField("Режим работы", max_length=255, blank=True)

    contacts = models.CharField("Контакты", max_length=255, blank=True)

    description = models.TextField("Описание", blank=True, help_text="Описание услуг, специализация")

    services = models.TextField("Услуги", blank=True, help_text="Список услуг, через запятую или с новой строки")

    image = models.ImageField("Изображение", upload_to="clothing_repair/images/", blank=True)

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Мастерская ремонта одежды"

        verbose_name_plural = "Мастерская ремонта одежды"



    def __str__(self) -> str:

        return self.name

