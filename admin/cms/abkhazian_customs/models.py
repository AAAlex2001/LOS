from django.db import models

from cms.models import TimestampedModel





class AbkhazianCustomsPage(TimestampedModel):

    """
    Главная страница абхазских обычаев
    """

                                 

    main_title = models.CharField(max_length=255, default="Абхазские национальные обычаи", help_text="Основной заголовок страницы")

    

                   

    intro_text = models.TextField(blank=True, help_text="Вводный текст на фоновом изображении")

    

    seo_title = models.CharField(max_length=60, blank=True, help_text="SEO заголовок страницы")

    seo_description = models.CharField(max_length=160, blank=True, help_text="SEO описание страницы")

    seo_keywords = models.CharField(max_length=255, blank=True, help_text="SEO ключевые слова (через запятую)")

    canonical_url = models.URLField(blank=True, help_text="Канонический URL")

    

                

    og_title = models.CharField(max_length=60, blank=True, help_text="Open Graph заголовок")

    og_description = models.CharField(max_length=160, blank=True, help_text="Open Graph описание")

    og_image = models.ImageField(upload_to="abkhazian_customs/og/", blank=True, help_text="Open Graph изображение")

    

                   

    twitter_title = models.CharField(max_length=60, blank=True, help_text="Twitter Card заголовок")

    twitter_description = models.CharField(max_length=160, blank=True, help_text="Twitter Card описание")

    twitter_image = models.ImageField(upload_to="abkhazian_customs/twitter/", blank=True, help_text="Twitter Card изображение")

    

            

    robots_index = models.BooleanField(default=True, help_text="Разрешить индексацию")

    robots_follow = models.BooleanField(default=True, help_text="Разрешить следование по ссылкам")



                                   

    hero_image = models.ImageField(upload_to="abkhazian_customs/hero/", blank=True, help_text="Главное изображение страницы")



    class Meta:

        verbose_name = "Страница абхазских обычаев"

        verbose_name_plural = "Страницы абхазских обычаев"



    def __str__(self) -> str:

        return "Страница абхазских обычаев"





class CustomSection(TimestampedModel):

    """
    Секция контента на странице абхазских обычаев
    """

    page = models.ForeignKey(AbkhazianCustomsPage, on_delete=models.CASCADE, related_name="sections")

    title = models.CharField(max_length=255, help_text="Заголовок секции")

    text = models.TextField(help_text="Текст секции")

    order = models.PositiveIntegerField(default=0, help_text="Порядок сортировки")



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Секция обычаев"

        verbose_name_plural = "Секции обычаев"



    def __str__(self) -> str:

        return self.title



