'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsGal.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Хинкальная',
        address: 'Гал, Самурзаканская ул., 12',
        addressLink: 'https://yandex.com/maps/-/CDxduFIr',
        workingHours: 'с 09:00 до 21:00',
        image: '/assets/RestaurantsGal1.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
    {
        id: 2,
        name: "Кафе, ОлигарХ' – Хинкальная",
        address: 'Гал, улица Владислава Ардзинба',
        addressLink: 'https://yandex.com/maps/-/CDxduPlV',
        phone: '+7 (940) 775-79-70\n+7 (940) 779-75-70',
        workingHours: 'с 08:00 до 21:00',
        image: '/assets/RestaurantsGal2.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 3,
        name: 'Антре',
        address: 'Гал, Самурзаканская улица',
        addressLink: 'https://yandex.com/maps/-/CDxdyCkY',
        workingHours: 'с 09:00 до 22:00',
        image: '/assets/RestaurantsGal3.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
];

const RestaurantsGal: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Гал: рестораны и кафе</h1>
                </section>
                <section className={styles.cardsSection}>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className={styles.restaurantCard}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    fill
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
                                            <span className={`${styles.infoValue} ${restaurant.addressLink ? styles.addressLink : ''}`}>
                                                {restaurant.addressLink ? (
                                                    <a href={restaurant.addressLink} target="_blank" rel="noopener noreferrer">{restaurant.address}</a>
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
                                    {restaurant.workingHours &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Часы работы:</span>
                                            <span className={styles.infoValue}>{restaurant.workingHours}</span>
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

export default RestaurantsGal;
