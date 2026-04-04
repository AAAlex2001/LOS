"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./Contacts.module.scss";
import { useLocale, useTranslations } from "@/i18n/LocaleContext";
import { getApiUrl } from "@/utils/api";
import config from "@/config";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const API_BASE = config.API_BASE;

export type ContactsPageItem = {
  kind: "email" | "telegram";
  role: string;
  value: string;
  href: string;
  icon_url: string;
};

export type ContactsPageData = {
  title: string;
  description: string;
  panel_title: string;
  panel_text: string;
  items: ContactsPageItem[];
};

function mediaUrl(path: string) {
  if (!path) return "";
  const clean = path.replace(/^\//, "");
  return `${API_BASE}/media/${clean}`;
}

const Contacts: React.FC = () => {
  const { locale } = useLocale();
  const tPage = useTranslations("contactsPage");
  const tCommon = useTranslations("common");
  const [data, setData] = useState<ContactsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl("/api/contacts/page/content/", locale);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load contacts");
        const json = (await res.json()) as ContactsPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(tCommon("error"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale, tCommon]);

  const heroTitle = data?.title?.trim() || tPage("title");
  const heroDescription = data?.description?.trim() || tPage("description");
  const panelTitle = data?.panel_title?.trim() || tPage("panelTitle");
  const panelText = data?.panel_text?.trim() || tPage("panelText");
  const items = data?.items ?? [];

  if (loading) {
    return (
      <>
        <Header />
        <main className={`${styles.main} ${montserrat.className}`}>
          <section className={styles.heroCard}>
            <p className={styles.title}>{tCommon("loading")}</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Header />
        <main className={`${styles.main} ${montserrat.className}`}>
          <section className={styles.heroCard}>
            <p className={styles.title}>{error || tCommon("error")}</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={`${styles.main} ${montserrat.className}`}>
        <section className={styles.heroCard}>
          <div className={styles.backdrop} />

          <div className={styles.heroContent}>
            <div className={styles.infoPane}>
              <span className={styles.badge}>{tPage("eyebrow")}</span>
              <h1 className={styles.title}>{heroTitle}</h1>
              <p className={styles.description}>{heroDescription}</p>
            </div>

            <div className={styles.contactPane}>
              <div className={styles.contactPaneHeader}>
                <h2 className={styles.contactPaneTitle}>{panelTitle}</h2>
                <p className={styles.contactPaneText}>{panelText}</p>
              </div>

              <div className={styles.contactList}>
                {items.length === 0 ? (
                  <p className={styles.contactPaneText}>{tCommon("noData")}</p>
                ) : (
                  items.map((item) => (
                    <a
                      key={`${item.kind}-${item.href}`}
                      href={item.href}
                      className={styles.contactItem}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                    >
                      <span className={styles.iconBadge} aria-hidden>
                        {item.icon_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={mediaUrl(item.icon_url)}
                            alt=""
                            width={22}
                            height={22}
                            className={styles.customIcon}
                          />
                        ) : item.kind === "email" ? (
                          <svg viewBox="0 0 24 24" className={styles.mailIcon}>
                            <path
                              d="M4 6.5H20C20.8284 6.5 21.5 7.17157 21.5 8V16C21.5 16.8284 20.8284 17.5 20 17.5H4C3.17157 17.5 2.5 16.8284 2.5 16V8C2.5 7.17157 3.17157 6.5 4 6.5Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                            />
                            <path
                              d="M3.5 8L10.9635 13.3304C11.5794 13.7703 12.4206 13.7703 13.0365 13.3304L20.5 8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <Image
                            src="/assets/telegram.svg"
                            alt="Telegram"
                            width={20}
                            height={20}
                          />
                        )}
                      </span>

                      <span className={styles.contactMeta}>
                        <span className={styles.contactRole}>{item.role}</span>
                        <span className={styles.contactValue}>{item.value}</span>
                      </span>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacts;
