from rest_framework import serializers

from .models import ContactItem, ContactsPage


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
            "eyebrow",
            "title",
            "description",
            "panel_title",
            "panel_text",
            "items",
            "updated_at",
        ]

    def get_items(self, obj: ContactsPage) -> list[dict]:
        out: list[dict] = []
        for item in obj.items.all():
            href = (item.href or "").strip()
            if not href and item.kind == ContactItem.KIND_EMAIL and item.value:
                href = f"mailto:{item.value}"
            out.append(
                {
                    "kind": item.kind,
                    "role": item.role or "",
                    "value": item.value or "",
                    "href": href,
                    "icon_url": media_relative_path(item.icon),
                }
            )
        return out
