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

        

                                                                   

                                                            

        header_match = re.match(r'^(\d+(?:\.\d+)*)\.\s+(.+)', line)

        

        if header_match:

                                           

            if current_paragraph:

                paragraph_text = ' '.join(current_paragraph)

                paragraph_text = format_bold_text(paragraph_text)

                result.append('<p>' + paragraph_text + '</p>')

                current_paragraph = []

            

                                          

            number_parts = header_match.group(1).split('.')

            level = len(number_parts)

            

                                                                

            if level == 1:

                tag = 'h2'

            elif level == 2:

                tag = 'h3'

            else:

                tag = 'h4'

            

                                                                 

            formatted_line = format_bold_text(line)

            result.append(f'<{tag}>{formatted_line}</{tag}>')

        elif line:

            current_paragraph.append(line)

        else:

                                             

            if current_paragraph:

                paragraph_text = ' '.join(current_paragraph)

                paragraph_text = format_bold_text(paragraph_text)

                result.append('<p>' + paragraph_text + '</p>')

                current_paragraph = []

    

                                  

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

        

                                                                   

        content = format_content_with_headers(page.content)

        

        serializer = self.get_serializer(page)

        data = serializer.data

        data['content'] = content

        return Response(data)



