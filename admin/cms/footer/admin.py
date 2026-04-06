from django.contrib import admin

from modeltranslation.admin import TranslationAdmin, TranslationTabularInline

from .models import Footer, FooterLink, SocialLink





class FooterLinkInline(TranslationTabularInline):

    model = FooterLink

    extra = 1

    fields = ('category', 'label', 'url', 'order')

    verbose_name = "Ссылка"

    verbose_name_plural = "Быстрые ссылки и правовая информация"





class SocialLinkInline(admin.TabularInline):

    model = SocialLink

    extra = 1

    fields = ('network', 'url', 'order')

    verbose_name = "Соцсеть"

    verbose_name_plural = "Ссылки на социальные сети"





@admin.register(Footer)

class FooterAdmin(TranslationAdmin):

    list_display = ('id', 'email', 'updated_at')

    fieldsets = (

        ('О сервисе', {

            'fields': ('description',),

            'description': 'Текст в блоке "О сервисе"'

        }),

        ('Контактная информация', {

            'fields': ('contact_info', 'email'),

            'description': 'Блок "Связаться с нами"'

        }),

        ('Копирайт', {

            'fields': ('copyright_text',),

            'description': 'Текст внизу футера'

        }),

        ('Ссылки на приложения', {

            'fields': ('app_store_url', 'google_play_url'),

            'description': 'Если поле пустое, соответствующая иконка в футере не показывается'

        }),

    )

    inlines = [FooterLinkInline, SocialLinkInline]

    

    def has_add_permission(self, request):

                                                    

        return not Footer.objects.exists()

    

    def has_delete_permission(self, request, obj=None):

                            

        return False



