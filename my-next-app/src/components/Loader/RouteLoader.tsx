"use client";

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './RouteLoader.module.scss';

const RouteLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');
  
  // Функция для отображения лоадера
  const showLoader = useCallback(() => {
    setLoading(true);
  }, []);
  
  // Функция для скрытия лоадера
  const hideLoader = useCallback(() => {
    setLoading(false);
  }, []);
  
  // Эффект для отслеживания изменений маршрута
  useEffect(() => {
    // Инициализация prevPathname при первом рендере
    if (prevPathname === '' && pathname) {
      setPrevPathname(pathname);
      return;
    }
    
    // Проверяем, изменился ли маршрут
    if (pathname !== prevPathname) {
      // Показываем лоадер только при реальной навигации
      showLoader();
      
      // Небольшая задержка для отображения лоадера
      const timer = setTimeout(() => {
        hideLoader();
        // Обновляем предыдущее значение после скрытия лоадера
        setPrevPathname(pathname || '');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname, showLoader, hideLoader]);
  
  // Добавляем обработчики событий начала и окончания навигации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Событие перед началом навигации
      const handleBeforeNavigate = () => {
        showLoader();
      };
      
      // Добавляем обработчики к событиям истории браузера
      window.addEventListener('popstate', handleBeforeNavigate);
      
      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.getAttribute('href')?.startsWith('/')) {
          const href = link.getAttribute('href');
          // Не показываем лоадер если кликаем на текущую страницу
          if (href !== pathname) {
            showLoader();
          }
        }
      };
      
      document.addEventListener('click', handleLinkClick);
      
      return () => {
        window.removeEventListener('popstate', handleBeforeNavigate);
        document.removeEventListener('click', handleLinkClick);
      };
    }
  }, [showLoader, pathname]);
  
  if (!loading) return null;
  
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default RouteLoader; 