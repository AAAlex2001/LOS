'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsGudauta.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Веранда',
        name_link: 'https://www.instagram.com/cafe_veranda_gudauta',
        address: 'Гудаута, ул. Лакербай, 9А',
        addressLink: 'https://yandex.com/maps/-/CDxKYR4F',
        phone: '+7 (940) 722-00-25',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsGudauta1.jpg',
        website: null,
    },
    {
        id: 2,
        name: 'Балкон',
        address: 'г.Гудаута, Центральный парк',
        addressLink: 'https://yandex.com/maps/-/CDxK4R9Y',
        phone: '+7 (940) 936-00-00',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsGudauta2.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 3,
        name: 'Гудаута',
        address: 'Гудаута, ул. Чанба, 1',
        addressLink: 'https://yandex.com/maps/-/CDxKaH5t',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsGudauta3.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
    {
        id: 4,
        name: 'Апра',
        website: 'http://apra.info/',
        address: 'Гудаута, улица Махаджиров',
        addressLink: 'https://yandex.com/maps/-/CDxKeB3P',
        phone: '+7 (940) 995-74-95',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsGudauta4.jpg',
        name_link: null,
    },
    {
        id: 5,
        name: 'Simona Food',
        address: 'Гудаута, Гагрское шоссе,д.20',
        addressLink: 'https://yandex.com/maps/-/CDxKqE-K',
        phone: '+7 (940) 992-00-00',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsGudauta5.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 6,
        name: 'Жар Пицца',
        address: 'ул. Владислава Ардзинба, 36, Гудаута',
        addressLink: 'https://yandex.com/maps/-/CDxKqF1A',
        phone: '+7 (940) 775-82-75\n+7 (940) 951-07-70',
        workingHours: 'с 10:00 до 21:00',
        image: '/assets/RestaurantsGudauta6.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 7,
        name: 'Бриз',
        address: 'Гудаута, улица Пушкина',
        addressLink: 'https://yandex.com/maps/-/CDxKy85H',
        phone: '+7 (940) 919-44-44',
        workingHours: 'с 11:00 до 23:00',
        image: '/assets/RestaurantsGudauta7.jpg',
        name_link: null,
        website: null,
    },
];

const RestaurantsGudauta: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Гудаута: рестораны и кафе</h1>
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

export default RestaurantsGudauta;
