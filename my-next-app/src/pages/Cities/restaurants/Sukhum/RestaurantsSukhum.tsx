'use client';

import React from 'react';
// next/image убираем; используем <img> как в банках
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsSukhum.module.scss';
import config from '@/config';
type Restaurant = {
    id: number;
    name: string;
    name_link?: string;
    website?: string;
    address: string;
    address_link?: string;
    phone?: string;
    working_hours?: string;
    image_url?: string;
    order: number;
};

type CityPayload = {
    title: string;
    restaurants: Restaurant[];
};

const API_BASE = config.API_BASE;

const RestaurantsSukhum: React.FC = () => {
    const [data, setData] = React.useState<CityPayload | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/restaurants/page/city/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load');
                const json = (await res.json()) as CityPayload;
                setData(json);
            } catch (e) {
                console.error(e);
                setError('Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className={styles.pageWrapper}>
                <Header />
                <main className={styles.mainContent}>
                    <section className={styles.titleSection}>
                        <h1 className={styles.mainTitle}>Загрузка...</h1>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={styles.pageWrapper}>
                <Header />
                <main className={styles.mainContent}>
                    <section className={styles.titleSection}>
                        <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>{data.title || 'Сухум: рестораны и кафе'}</h1>
                </section>
                <section className={styles.cardsSection}>
                    {data.restaurants.map((restaurant) => (
                        <div key={restaurant.id} className={styles.restaurantCard}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={restaurant.image_url ? `${API_BASE}/media/${restaurant.image_url}` : '/assets/placeholder.png'}
                                    alt={restaurant.name}
                                    className={styles.restaurantImage}
                                />
                            </div>
                            <div className={styles.infoContainer}>
                                <h2 className={`${styles.restaurantName} ${restaurant.name_link ? styles.clickable : ''}`}>
                                    {restaurant.name_link ? (
                                        <a href={restaurant.name_link} target="_blank" rel="noopener noreferrer">{restaurant.name}</a>
                                    ) : (
                                        restaurant.name
                                    )}
                                </h2>
                                <div className={styles.infoBlock}>
                                    {restaurant.address &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Адрес:</span>
                                            <span className={`${styles.infoValue} ${restaurant.address_link ? styles.addressLink : ''}`}>
                                                {restaurant.address_link ? (
                                                    <a href={restaurant.address_link} target="_blank" rel="noopener noreferrer">{restaurant.address}</a>
                                                ) : (
                                                    restaurant.address
                                                )}
                                            </span>
                                        </div>
                                    }
                                    {restaurant.phone &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Телефон:</span>
                                            <span className={styles.infoValue}>{restaurant.phone}</span>
                                        </div>
                                    }
                                    {restaurant.website &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Сайт:</span>
                                            <span className={styles.infoValue}>
                                                <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a>
                                            </span>
                                        </div>
                                    }
                                    {restaurant.working_hours &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Часы работы:</span>
                                            <span className={styles.infoValue}>{restaurant.working_hours}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default RestaurantsSukhum;
