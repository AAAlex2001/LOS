from django.contrib import admin
from .models import PrivacyPolicyPage, AccessibilityAndTermsPage


@admin.register(PrivacyPolicyPage)
class PrivacyPolicyPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title',)
    

@admin.register(AccessibilityAndTermsPage)
class AccessibilityAndTermsPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title',)


