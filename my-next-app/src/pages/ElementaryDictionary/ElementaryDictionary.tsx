'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ElementaryDictionary.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

interface WordPair {
  id: number;
  russian: string;
  abkhazian: string;
  order: number;
}

interface DictionaryCategory {
  id: number;
  title: string;
  split_two_columns: boolean;
  order: number;
  words: WordPair[];
}

interface ElementaryDictionaryPageData {
  categories: DictionaryCategory[];
}

const API_BASE = config.API_BASE;

const getColumns = (list: WordPair[], forceSplit = false): WordPair[][] => {
  if (forceSplit) {
    const mid = Math.ceil(list.length / 2);
    const col1 = [...list.slice(0, mid)];
    const col2 = [...list.slice(mid)];

    while (col2.length < col1.length) {
      col2.push({ id: 0, russian: '\u00A0', abkhazian: '', order: 0 });
    }
    return [col1, col2];
  }
  return [list];
};

const ElementaryDictionary: React.FC = () => {
  const { locale } = useLocale();
  const [pageData, setPageData] = useState<ElementaryDictionaryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/elementary-dictionary/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load dictionary');
        const json = (await res.json()) as ElementaryDictionaryPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale]);

  const renderTable = (items: WordPair[]) => (
    <div className={styles.dictionaryTable}>
      <div className={styles.row}>
        <div className={styles.cellHeader} style={{ textAlign: 'center' }}>На русском</div>
        <div className={styles.cellHeader} style={{ textAlign: 'center' }}>На абхазском</div>
      </div>
      {items.map((w, idx) => (
        <div key={`${w.id}-${idx}`} className={styles.row}>
          <div className={styles.cell}>{w.russian}</div>
          <div className={styles.cell}>{w.abkhazian}</div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Элементарный словарь</h1>
        </section>

        {/* Категории словаря */}
        <section className={styles.sectionsContainer}>
          {(!pageData.categories || pageData.categories.length === 0) ? (
            <div className={styles.noData}>Нет данных о словаре</div>
          ) : (
            (() => {
              const items = (pageData.categories || []).map((category) => {
                const words = category.words || [];
                const forceTwo = !!category.split_two_columns;
                const columns = getColumns(words, forceTwo);
                return { category, words, forceTwo, columns };
              });

              const rows: Array<typeof items> = [] as any;
              let currentRow: typeof items = [] as any;

              items.forEach((item) => {
                if (item.forceTwo) {
                  if (currentRow.length) {
                    rows.push(currentRow);
                    currentRow = [] as any;
                  }
                  rows.push([item]);
                } else {
                  currentRow.push(item);
                  if (currentRow.length === 2) {
                    rows.push(currentRow);
                    currentRow = [] as any;
                  }
                }
              });
              if (currentRow.length) rows.push(currentRow);

              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.tablesRow}>
                  {row.map(({ category, words, forceTwo, columns }) => {
                    const blockClass = forceTwo ? styles.sectionBlockFullWidth : styles.sectionBlock;
                    return (
                      <div key={category.id} className={blockClass}>
                        <h2 className={`${styles.sectionTitle} ${styles.titleCenter}`}>
                          {`${category.title} (${words.length} ${words.length === 1 ? 'слово' : words.length < 5 ? 'слова' : 'слов'})`}
                        </h2>
                        {forceTwo ? (
                          <div className={styles.tablesRow}>
                            {columns.map((col, idx) => (
                              <div key={idx} className={styles.sectionBlock}>
                                {renderTable(col)}
                              </div>
                            ))}
                          </div>
                        ) : (
                          renderTable(words)
                        )}
                      </div>
                    );
                  })}
                </div>
              ));
            })()
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ElementaryDictionary;
