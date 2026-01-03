from django.db import models

from cms.models import TimestampedModel





class MusicPage(TimestampedModel):

    """
    Страница музыки
    """

                      

    intro_text = models.TextField("Текст для музыки", blank=True, help_text="Текст под описанием музыки")

    intro_bg_image = models.ImageField("Фоновая картинка для текста", upload_to="music/intro/", blank=True, help_text="Фоновая картинка для текста")

    main_image = models.ImageField("Основная картинка", upload_to="music/main/", blank=True, help_text="Основная картинка после текста")



         

    seo_title = models.CharField(max_length=60, blank=True)

    seo_description = models.CharField(max_length=160, blank=True)

    seo_keywords = models.CharField(max_length=255, blank=True)

    canonical_url = models.URLField(blank=True)



                

    og_title = models.CharField(max_length=60, blank=True)

    og_description = models.CharField(max_length=160, blank=True)

    og_image = models.ImageField(upload_to="music/og/", blank=True)



             

    twitter_title = models.CharField(max_length=60, blank=True)

    twitter_description = models.CharField(max_length=160, blank=True)

    twitter_image = models.ImageField(upload_to="music/twitter/", blank=True)



            

    robots_index = models.BooleanField(default=True)

    robots_follow = models.BooleanField(default=True)



    class Meta:

        verbose_name = "Страница музыки"

        verbose_name_plural = "Страница музыки"



    def __str__(self) -> str:

        return "Страница музыки"





class MusicTrack(TimestampedModel):

    """
    Музыкальный трек
    """

    page = models.ForeignKey(MusicPage, on_delete=models.CASCADE, related_name="tracks")

    title = models.CharField("Название трека", max_length=255)

    artist = models.CharField("Исполнитель", max_length=255)

    audio_file = models.FileField("Аудио файл", upload_to="music/tracks/%Y/%m/%d", help_text="MP3 файл")

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField("Активен", default=True)



    class Meta:

        ordering = ["order", "id"]

        verbose_name = "Музыкальный трек"

        verbose_name_plural = "Музыкальные треки"



    def __str__(self) -> str:

        return f"{self.artist} - {self.title}"



