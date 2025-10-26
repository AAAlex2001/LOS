from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.html import linebreaks
import re
from .models import PrivacyPolicyPage, AccessibilityAndTermsPage
from .serializers import PrivacyPolicyPageSerializer, AccessibilityAndTermsPageSerializer


def format_bold_text(text):
    """Преобразует **текст** в <strong>текст</strong>"""
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)


def format_content_with_headers(content):
    """Преобразует текст с заголовками разных уровней в HTML"""
    lines = content.split('\n')
    result = []
    current_paragraph = []
    
    for line in lines:
        line = line.strip()
        
        # Определяем уровень заголовка по количеству точек в номере
        # 1. -> h2, 1.1. -> h3, 1.8.1. -> h4, 1.8.1.1. -> h4
        header_match = re.match(r'^(\d+(?:\.\d+)*)\.\s+(.+)', line)
        
        if header_match:
            # Сохраняем предыдущий параграф
            if current_paragraph:
                paragraph_text = ' '.join(current_paragraph)
                paragraph_text = format_bold_text(paragraph_text)
                result.append('<p>' + paragraph_text + '</p>')
                current_paragraph = []
            
            # Определяем уровень заголовка
            number_parts = header_match.group(1).split('.')
            level = len(number_parts)
            
            # h2 для уровня 1, h3 для уровня 2, h4 для уровня 3+
            if level == 1:
                tag = 'h2'
            elif level == 2:
                tag = 'h3'
            else:
                tag = 'h4'
            
            # Применяем форматирование жирного текста к заголовку
            formatted_line = format_bold_text(line)
            result.append(f'<{tag}>{formatted_line}</{tag}>')
        elif line:
            current_paragraph.append(line)
        else:
            # Пустая строка - конец параграфа
            if current_paragraph:
                paragraph_text = ' '.join(current_paragraph)
                paragraph_text = format_bold_text(paragraph_text)
                result.append('<p>' + paragraph_text + '</p>')
                current_paragraph = []
    
    # Добавляем последний параграф
    if current_paragraph:
        paragraph_text = ' '.join(current_paragraph)
        paragraph_text = format_bold_text(paragraph_text)
        result.append('<p>' + paragraph_text + '</p>')
    
    return ''.join(result)


class PrivacyPolicyPageViewSet(viewsets.ModelViewSet):
    queryset = PrivacyPolicyPage.objects.all()
    serializer_class = PrivacyPolicyPageSerializer

    @action(detail=False, methods=['get'])
    def page_content(self, request):
        """Возвращает контент страницы политики конфиденциальности"""
        page = self.queryset.first()
        if not page:
            return Response({'detail': 'Страница не найдена'}, status=404)
        
        # Преобразуем контент: переносы строк -> HTML с заголовками
        content = format_content_with_headers(page.content)
        
        serializer = self.get_serializer(page)
        data = serializer.data
        data['content'] = content
        return Response(data)


class AccessibilityAndTermsPageViewSet(viewsets.ModelViewSet):
    queryset = AccessibilityAndTermsPage.objects.all()
    serializer_class = AccessibilityAndTermsPageSerializer

    @action(detail=False, methods=['get'])
    def page_content(self, request):
        """Возвращает контент страницы доступности и правил"""
        page = self.queryset.first()
        if not page:
            return Response({'detail': 'Страница не найдена'}, status=404)
        
        # Преобразуем контент: переносы строк -> HTML с заголовками
        content = format_content_with_headers(page.content)
        
        serializer = self.get_serializer(page)
        data = serializer.data
        data['content'] = content
        return Response(data)

