from django.db import models
from cms.models import TimestampedModel


class ImportantPage(TimestampedModel):
    """Страница 'Важно знать'"""
    title = models.CharField(max_length=200, default="Важно знать", help_text="Заголовок страницы")
    meta_title = models.CharField(max_length=200, blank=True, help_text="SEO заголовок")
    meta_description = models.TextField(blank=True, help_text="SEO описание")
    
    class Meta:
        verbose_name = "Страница 'Важно знать'"
        verbose_name_plural = "Страница 'Важно знать'"


class ImportantSection(TimestampedModel):
    """Секция на странице 'Важно знать'"""
    SECTION_CHOICES = [
        ('tourist-pharmacy', 'Туристическая аптечка'),
        ('emergency-phones', 'Телефоны экстренной помощи'),
        ('public-behavior', 'Правила поведения в общественных местах'),
        ('taxi-etiquette', 'Такси-этикет'),
    ]
    
    page = models.ForeignKey(ImportantPage, on_delete=models.CASCADE, related_name='sections')
    section_type = models.CharField(max_length=50, choices=SECTION_CHOICES, help_text="Тип секции")
    title = models.CharField(max_length=200, help_text="Заголовок секции")
    content = models.TextField(blank=True, help_text="Содержимое секции")
    order = models.PositiveIntegerField(default=0, help_text="Порядок отображения")
    
    class Meta:
        verbose_name = "Секция"
        verbose_name_plural = "Секции"
        ordering = ['order']


class ImportantRule(TimestampedModel):
    """Правило в секции (для такси-этикета)"""
    RULE_TYPE_CHOICES = [
        ('passenger', 'Правила для пассажиров'),
        ('driver', 'Правила для водителей'),
    ]
    
    section = models.ForeignKey(ImportantSection, on_delete=models.CASCADE, related_name='rules')
    rule_type = models.CharField(max_length=20, choices=RULE_TYPE_CHOICES, help_text="Тип правила")
    title = models.CharField(max_length=200, help_text="Заголовок правила")
    description = models.TextField(help_text="Описание правила")
    order = models.PositiveIntegerField(default=0, help_text="Порядок отображения")
    
    class Meta:
        verbose_name = "Правило"
        verbose_name_plural = "Правила"
        ordering = ['order']


class ImportantImage(TimestampedModel):
    """Изображения для секций"""
    section = models.ForeignKey(ImportantSection, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="important/", help_text="Изображение")
    alt_text = models.CharField(max_length=200, blank=True, help_text="Альтернативный текст")
    order = models.PositiveIntegerField(default=0, help_text="Порядок отображения")
    
    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
        ordering = ['order']
