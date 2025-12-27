import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import { LocaleProvider } from '@/i18n/LocaleContext';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  
  // Import messages dynamically
  const messages = await import(`../../../messages/${locale}.json`);
  const meta = messages.metadata;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: '/assets/Video1.JPG',
          width: 1200,
          height: 630,
          alt: meta.landscapes,
        },
      ],
      siteName: 'LANDOFSOUL-APSNY.RU',
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/assets/Video1.JPG'],
    },
    alternates: {
      canonical: `https://landofsoul-apsny.ru/${locale}`,
      languages: {
        'ru': '/ru',
        'en': '/en',
      },
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LocaleProvider defaultLocale={locale as Locale}>
      {children}
    </LocaleProvider>
  );
}
