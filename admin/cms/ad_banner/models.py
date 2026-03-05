from __future__ import annotations



from django.db import models

from ..models import TimestampedModel





class AdBanner(TimestampedModel):

    image = models.ImageField(
        upload_to='ad_banner/',
        verbose_name='Изображение',
        blank=True, null=True,
        help_text=(
            'Формат: JPEG или PNG. '
            'Рекомендуемый размер — 600×1200 пкс (мин. 300×600 пкс). '
            'Максимальный вес — 2 МБ. '
            'Не располагайте важный контент по бокам изображения. '
            'Кнопка «Подробнее» размещается внизу экрана.'
        ),
    )

    video = models.FileField(
        upload_to='ad_banner/videos/',
        verbose_name='Видео',
        blank=True, null=True,
        help_text=(
            'Формат: MP4 или MOV, вертикальная ориентация 9:16. '
            'Разрешение: 720×1280 (HD) или 1080×1920 (Full HD). '
            'Рекомендуемая длительность — 5–15 сек (до 20 сек). '
            'Кнопка Skip появляется через 5 сек. '
            'Вес файла — 2–5 МБ. '
            'Битрейт: Full HD — 4–6 Мбит/с, HD — 2,5–4 Мбит/с, SD — 1,5–2,5 Мбит/с. '
            'Если загружено видео, изображение будет проигнорировано.'
        ),
    )

    title = models.CharField(
        max_length=30,
        blank=True, default='',
        verbose_name='Заголовок',
        help_text='До 30 символов включительно.',
    )

    description = models.TextField(
        blank=True, default='',
        verbose_name='Описание',
        help_text='До 45 символов включительно.',
    )

    site = models.CharField(max_length=255, blank=True, default='', verbose_name='Сайт')

    url = models.URLField(blank=True, default='', verbose_name='Ссылка',
                          help_text='Ссылка/пиксель — куда ведёт кнопка «Подробнее».')

    age_restriction = models.CharField(
        max_length=50,
        blank=True, default='',
        verbose_name='Возрастное ограничение',
        help_text='Необязательно. Например: 6+, 12+, 18+.',
    )

    is_active = models.BooleanField(default=True, verbose_name='Активен')

    notes = models.TextField(blank=True, default='', verbose_name='Заметки (только для админов)')



    class Meta:

        verbose_name = 'Рекламный баннер'

        verbose_name_plural = 'Рекламный баннер'



    def __str__(self) -> str:

        return 'Рекламный баннер'



