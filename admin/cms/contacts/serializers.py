from rest_framework import serializers

from .models import ContactsPage


def media_relative_path(image_field) -> str:
    if not image_field:
        return ""
    return image_field.url.replace("/media/", "")


class ContactsPageSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = ContactsPage
        fields = [
            "id",
            "title",
            "description",
            "panel_title",
            "panel_text",
            "items",
            "updated_at",
        ]

    def get_items(self, obj: ContactsPage) -> list[dict]:
        out: list[dict] = []
        if obj.email:
            out.append(
                {
                    "kind": "email",
                    "role": obj.email_role or "",
                    "value": str(obj.email),
                    "href": f"mailto:{obj.email}",
                    "icon_url": media_relative_path(obj.email_image),
                }
            )
        if obj.telegram:
            display = (obj.telegram_display or "").strip() or obj.telegram
            out.append(
                {
                    "kind": "telegram",
                    "role": obj.telegram_role or "",
                    "value": display,
                    "href": obj.telegram,
                    "icon_url": media_relative_path(obj.telegram_image),
                }
            )
        return out
