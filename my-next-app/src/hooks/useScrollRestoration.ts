'use client';

import { useEffect } from 'react';

const CITY_KEY = 'cities_scroll_city';
const CITY_OFFSET_KEY = 'cities_scroll_city_offset';

export function saveScrollPosition(cityKey?: string): void {
  if (typeof window !== 'undefined' && cityKey) {
    sessionStorage.setItem(CITY_KEY, cityKey);

    const cityEl = document.getElementById(`city-${cityKey}`);
    if (cityEl) {
      const relativeOffset = Math.max(0, window.scrollY - cityEl.offsetTop);
      sessionStorage.setItem(CITY_OFFSET_KEY, String(relativeOffset));
    } else {
      sessionStorage.removeItem(CITY_OFFSET_KEY);
    }
  }
}

export function useRestoreScroll(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedCity = sessionStorage.getItem(CITY_KEY);
    if (!savedCity) return;
    const savedOffsetRaw = sessionStorage.getItem(CITY_OFFSET_KEY);
    const parsedOffset = savedOffsetRaw ? Number(savedOffsetRaw) : 0;
    const savedOffset = Number.isFinite(parsedOffset) ? parsedOffset : 0;
    sessionStorage.removeItem(CITY_KEY);
    sessionStorage.removeItem(CITY_OFFSET_KEY);

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let observer: MutationObserver | null = null;
    let found = false;

    const scrollToCity = () => {
      const el = document.getElementById(`city-${savedCity}`);
      if (!el) return false;

      const top = Math.max(0, el.offsetTop + savedOffset);
      window.scrollTo({ top, behavior: 'auto' });
      return true;
    };

    const startBurst = () => {
      found = true;
      if (observer) { observer.disconnect(); observer = null; }
      const delays = [0, 50, 100, 200, 350, 500, 750, 1000];
      delays.forEach(ms => {
        timers.push(setTimeout(scrollToCity, ms));
      });
    };

    requestAnimationFrame(() => {
      if (scrollToCity()) {
        startBurst();
        return;
      }

      observer = new MutationObserver(() => {
        if (!found && scrollToCity()) {
          startBurst();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      timers.push(setTimeout(() => {
        if (!found) {
          scrollToCity();
          observer?.disconnect();
        }
      }, 15000));
    });

    return () => {
      observer?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
}
