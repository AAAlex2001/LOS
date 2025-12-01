from __future__ import annotations

from django.db import models
from ..models import TimestampedModel


class AdBanner(TimestampedModel):
    image = models.ImageField(upload_to='ad_banner/', verbose_name='Изображение')
    title = models.CharField(max_length=255, blank=True, default='', verbose_name='Заголовок')
    description = models.TextField(blank=True, default='', verbose_name='Описание')
    site = models.CharField(max_length=255, blank=True, default='', verbose_name='Сайт')
    url = models.URLField(blank=True, default='', verbose_name='Ссылка')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    notes = models.TextField(blank=True, default='', verbose_name='Заметки (только для админов)')

    class Meta:
        verbose_name = 'Рекламный баннер'
        verbose_name_plural = 'Рекламный баннер'

    def __str__(self) -> str:
        return 'Рекламный баннер'

