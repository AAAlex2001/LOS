from django.contrib import admin

from modeltranslation.admin import TranslationAdmin

from .models import PrivacyPolicyPage, AccessibilityAndTermsPage





@admin.register(PrivacyPolicyPage)

class PrivacyPolicyPageAdmin(TranslationAdmin):

    list_display = ('title', 'created_at', 'updated_at')

    list_filter = ('created_at', 'updated_at')

    search_fields = ('title',)

    



@admin.register(AccessibilityAndTermsPage)

class AccessibilityAndTermsPageAdmin(TranslationAdmin):

    list_display = ('title', 'created_at', 'updated_at')

    list_filter = ('created_at', 'updated_at')

    search_fields = ('title',)











