from django.db import models
from cms.models import TimestampedModel


class ElementaryDictionaryPage(TimestampedModel):
    """
    Главная страница элементарного словаря
    """
    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")
    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")
    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")
    canonical_url = models.URLField(blank=True, help_text="Канонический URL")
    
    # Open Graph
    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")
    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")
    og_image = models.ImageField(upload_to="elementary_dictionary/og/", blank=True, help_text="Open Graph изображение")
    
    # Twitter Cards
    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")
    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")
    twitter_image = models.ImageField(upload_to="elementary_dictionary/twitter/", blank=True, help_text="Twitter Card изображение")
    
    # Robots
    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")
    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")

    class Meta:
        verbose_name = "Страница элементарного словаря"
        verbose_name_plural = "Страница элементарного словаря"

    def __str__(self) -> str:
        return "Страница элементарного словаря"


class DictionaryCategory(TimestampedModel):
    """
    Категория словаря (например: "Общие фразы", "Знакомство", "Приветствие")
    """
    page = models.ForeignKey(ElementaryDictionaryPage, on_delete=models.CASCADE, related_name="categories")
    title = models.CharField(max_length=255, help_text="Название категории")
    split_two_columns = models.BooleanField(
        default=False,
        help_text="Всегда разбивать слова на две колонки"
    )
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Категория словаря"
        verbose_name_plural = "Категории словаря"

    def __str__(self) -> str:
        return self.title


class DictionaryWord(TimestampedModel):
    """
    Слово/фраза в словаре
    """
    page = models.ForeignKey(ElementaryDictionaryPage, on_delete=models.CASCADE, related_name="words", null=True, blank=True)
    category = models.ForeignKey(DictionaryCategory, on_delete=models.CASCADE, related_name="words")
    russian = models.CharField(max_length=500, help_text="Перевод на русском языке")
    abkhazian = models.CharField(max_length=500, help_text="Перевод на абхазском языке")
    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Слово/фраза"
        verbose_name_plural = "Слова/фразы"

    def __str__(self) -> str:
        return f"{self.russian} - {self.abkhazian}"
