'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import { ComponentProps } from 'react';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/**
 * Link component that automatically prefixes href with current locale
 * @example
 * <LocaleLink href="/cities">Cities</LocaleLink>
 * // Renders as /ru/cities or /en/cities depending on current locale
 */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  
  // Skip locale prefix for external links, anchors, and already localized paths
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isAnchor = href.startsWith('#');
  const isAlreadyLocalized = href.startsWith('/ru/') || href.startsWith('/en/');
  
  if (isExternal || isAnchor || isAlreadyLocalized) {
    return <Link href={href} {...props} />;
  }
  
  // Add locale prefix
  const localizedHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
  
  return <Link href={localizedHref} {...props} />;
}
