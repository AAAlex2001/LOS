from pathlib import Path
import os


BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-secret-key-change-me")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DJANGO_DEBUG", "1") == "1"

ALLOWED_HOSTS = [h for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,109.196.103.12,landofsoul-apsny.ru,www.landofsoul-apsny.ru").split(",") if h]


INSTALLED_APPS = [
    # modeltranslation must be before django.contrib.admin
    "modeltranslation",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",

    # Local apps
    "cms.apps.CmsConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "cms.middleware.APILanguageMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "data" / "db.sqlite3",
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


LANGUAGE_CODE = "ru"
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_TZ = True

# Supported languages for translation
from django.utils.translation import gettext_lazy as _
LANGUAGES = [
    ("ru", _("Русский")),
    ("en", _("English")),
]

# Default language for modeltranslation
MODELTRANSLATION_DEFAULT_LANGUAGE = "ru"
MODELTRANSLATION_FALLBACK_LANGUAGES = ("ru", "en")


STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [
    *( [BASE_DIR / "static"] if (BASE_DIR / "static").exists() else [] )
]

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}


# CORS / CSRF
_cors_env = os.environ.get(
    "DJANGO_CORS_ALLOWED_ORIGINS",
    "http://localhost,http://localhost:3000,http://localhost:8081,http://127.0.0.1,http://127.0.0.1:3000,http://127.0.0.1:8081,http://109.196.103.12,http://109.196.103.12:3000,http://landofsoul-apsny.ru,https://landofsoul-apsny.ru,http://www.landofsoul-apsny.ru,https://www.landofsoul-apsny.ru",
)
CORS_ALLOWED_ORIGINS = [o for o in _cors_env.split(",") if o]
CORS_ALLOW_CREDENTIALS = True

_csrf_env = os.environ.get(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    "http://localhost,http://localhost:3000,http://localhost:8081,http://127.0.0.1,http://127.0.0.1:3000,http://127.0.0.1:8081,http://109.196.103.12,http://109.196.103.12:3000,http://landofsoul-apsny.ru,https://landofsoul-apsny.ru,http://www.landofsoul-apsny.ru,https://www.landofsoul-apsny.ru",
)
CSRF_TRUSTED_ORIGINS = [o for o in _csrf_env.split(",") if o]

# Increase form field limits for large admin forms (dictionary page)
DATA_UPLOAD_MAX_NUMBER_FIELDS = int(os.environ.get("DJANGO_DATA_UPLOAD_MAX_NUMBER_FIELDS", "100000"))
DATA_UPLOAD_MAX_MEMORY_SIZE = int(os.environ.get("DJANGO_DATA_UPLOAD_MAX_MEMORY_SIZE", "52428800"))  # 50MB
FILE_UPLOAD_MAX_MEMORY_SIZE = int(os.environ.get("DJANGO_FILE_UPLOAD_MAX_MEMORY_SIZE", "52428800"))  # 50MB


# Behind reverse proxy (nginx) with HTTPS termination
# Ensures request.is_secure() is True and absolute URLs use https
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
USE_X_FORWARDED_HOST = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

