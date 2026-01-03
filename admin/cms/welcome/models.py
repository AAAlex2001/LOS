from __future__ import annotations



from django.db import models

from ..models import TimestampedModel





class WelcomePage(TimestampedModel):

    title = models.CharField(max_length=255, blank=True, default='')

    subtitle = models.CharField(max_length=255, blank=True, default='')

    description = models.TextField(blank=True, default='')



    class Meta:

        verbose_name = 'Welcome страница'

        verbose_name_plural = 'Welcome страница'



    def __str__(self) -> str:

        return 'Welcome страница'





class WelcomeIcon(TimestampedModel):

    page = models.ForeignKey(WelcomePage, on_delete=models.CASCADE, related_name='icons')

    image = models.ImageField(upload_to='welcome/')

    order = models.PositiveIntegerField(default=0)



    class Meta:

        ordering = ['order', 'id']

        verbose_name = 'Иконка'

        verbose_name_plural = 'Иконки'



    def __str__(self) -> str:

        return f'Иконка #{self.order}'
