from django.contrib import admin
from .models import Footer, FooterLink, SocialLink


class FooterLinkInline(admin.TabularInline):
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
class FooterAdmin(admin.ModelAdmin):
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
    )
    inlines = [FooterLinkInline, SocialLinkInline]
    
    def has_add_permission(self, request):
        # Разрешаем создание только если нет записей
        return not Footer.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Запрещаем удаление
        return False

