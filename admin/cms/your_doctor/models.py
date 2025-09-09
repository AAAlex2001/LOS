from django.db import models
from cms.models import TimestampedModel


class YourDoctorPage(TimestampedModel):
    """
    Главная страница "Ваш доктор"
    """
    main_title = models.CharField("Основной заголовок", max_length=255, default="Ваш доктор", help_text="Основной заголовок страницы")
    logo_image = models.ImageField("Логотип раздела", upload_to="your_doctor/logo/", blank=True, help_text="Логотип, отображаемый вверху страницы")
    hospitals_hero_image = models.ImageField("Изображение для блока 'Больницы'", upload_to="your_doctor/hospitals_hero/", blank=True, help_text="Широкое изображение над разделом Больницы")

    # SEO
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")

    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="your_doctor/og/", blank=True, help_text="Open Graph изображение")

    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="your_doctor/twitter/", blank=True, help_text="Twitter Card изображение")

    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница 'Ваш доктор'"
        verbose_name_plural = "Страница 'Ваш доктор'"

    def __str__(self) -> str:
        return "Страница 'Ваш доктор'"


class Hospital(TimestampedModel):
    page = models.ForeignKey(YourDoctorPage, on_delete=models.CASCADE, related_name="hospitals")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="your_doctor/hospitals/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Больница"
        verbose_name_plural = "Больница"

    def __str__(self) -> str:
        return self.name


class PrivateClinic(TimestampedModel):
    page = models.ForeignKey(YourDoctorPage, on_delete=models.CASCADE, related_name="private_clinics")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="your_doctor/private_clinics/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Частная клиника"
        verbose_name_plural = "Частная клиника"

    def __str__(self) -> str:
        return self.name


class Dentistry(TimestampedModel):
    page = models.ForeignKey(YourDoctorPage, on_delete=models.CASCADE, related_name="dentistries")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="your_doctor/dentistry/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Стоматологическая клиника"
        verbose_name_plural = "Стоматологическая клиника"

    def __str__(self) -> str:
        return self.name


class VetClinic(TimestampedModel):
    page = models.ForeignKey(YourDoctorPage, on_delete=models.CASCADE, related_name="vet_clinics")
    name = models.CharField("Название", max_length=255)
    name_link = models.URLField("Ссылка на сайт", blank=True)
    working_hours = models.CharField("Режим работы", max_length=255, blank=True)
    address = models.CharField("Адрес", max_length=500)
    address_link = models.URLField("Ссылка на карту", blank=True)
    contacts = models.CharField("Контакты", max_length=255, blank=True)
    image = models.ImageField("Изображение", upload_to="your_doctor/vet_clinics/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Ветеринарная клиника"
        verbose_name_plural = "Ветеринарная клиника"

    def __str__(self) -> str:
        return self.name


class DoctorsGroup(TimestampedModel):
    page = models.ForeignKey(YourDoctorPage, on_delete=models.CASCADE, related_name="doctors_groups")
    hospital_name = models.CharField("Учреждение", max_length=255)
    doctors_raw = models.TextField("Список врачей", blank=True, help_text="По одному врачу на строку")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Группа врачей"
        verbose_name_plural = "Группа врачей"

    def __str__(self) -> str:
        return self.hospital_name


