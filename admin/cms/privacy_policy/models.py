from __future__ import annotations

from django.db import models
from ..models import TimestampedModel


class PrivacyPolicyPage(TimestampedModel):
    title = models.CharField(max_length=255, default="Политика конфиденциальности сайта")
    content = models.TextField(help_text="Основной контент страницы (HTML)")
    
    class Meta:
        verbose_name = "Политика конфиденциальности"
        verbose_name_plural = "Политика конфиденциальности"
    
    def __str__(self) -> str:
        return self.title


class AccessibilityAndTermsPage(TimestampedModel):
    title = models.CharField(max_length=255, default="Доступность и правила пользования сайтом")
    content = models.TextField(help_text="Основной контент страницы (HTML)")
    
    class Meta:
        verbose_name = "Доступность и правила пользования"
        verbose_name_plural = "Доступность и правила пользования"
    
    def __str__(self) -> str:
        return self.title



