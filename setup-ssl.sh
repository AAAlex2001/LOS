#!/bin/bash

# Скрипт для установки SSL сертификата Let's Encrypt
# Запускать на сервере где размещен сайт

echo "🔒 Настройка SSL сертификата для landofsoul-apsny.ru"

# Проверяем, что домен указывает на этот сервер
echo "📡 Проверяем DNS..."
DOMAIN_IP=$(dig +short landofsoul-apsny.ru)
SERVER_IP=$(curl -s -4 ifconfig.me)  # Принудительно получаем IPv4

echo "🌐 Домен указывает на: $DOMAIN_IP"
echo "🖥️  Сервер имеет IP: $SERVER_IP"

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    echo "⚠️  Предупреждение: Домен указывает на $DOMAIN_IP, а сервер имеет $SERVER_IP"
    echo "📋 Проверьте, что $DOMAIN_IP - это правильный IP вашего сервера"
    echo "❓ Продолжить установку SSL? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Установка отменена"
        exit 1
    fi
else
    echo "✅ DNS настроен корректно"
fi

# Устанавливаем certbot если не установлен
if ! command -v certbot &> /dev/null; then
    echo "📦 Устанавливаем certbot..."
    
    # Для Ubuntu/Debian
    if command -v apt &> /dev/null; then
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    # Для CentOS/RHEL
    elif command -v yum &> /dev/null; then
        sudo yum install -y certbot python3-certbot-nginx
    else
        echo "❌ Неизвестная система. Установите certbot вручную."
        exit 1
    fi
fi

# Останавливаем nginx для получения сертификата
echo "🛑 Останавливаем nginx..."
sudo systemctl stop nginx

# Получаем сертификат
echo "🔐 Получаем SSL сертификат..."
sudo certbot certonly --standalone \
    --email admin@landofsoul-apsny.ru \
    --agree-tos \
    --no-eff-email \
    -d landofsoul-apsny.ru \
    -d www.landofsoul-apsny.ru

if [ $? -eq 0 ]; then
    echo "✅ SSL сертификат успешно получен!"
    
    # Настраиваем автообновление
    echo "🔄 Настраиваем автообновление сертификата..."
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    echo "🎉 SSL сертификат настроен!"
    echo "Теперь перезапустите docker-compose:"
    echo "docker-compose down && docker-compose up -d"
    
else
    echo "❌ Ошибка при получении сертификата"
    exit 1
fi
