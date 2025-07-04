'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsNewAfon.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Гуада',
        address: 'Новый Афон, пер. Псырцха, 6',
        addressLink: 'https://yandex.com/maps/-/CDxD7OI9',
        phone: '+7 (940) 753-53-53',
        workingHours: 'с 09:00 до 01:30',
        image: '/assets/RestaurantsNewAfon1.jpg',
        nameLink: null,
        website: null,
    },
    {
        id: 2,
        name: 'Panorama',
        address: 'Гудаутский район, Новый Афон, улица Лакоба',
        addressLink: 'https://yandex.com/maps/-/CDxD7T9z',
        phone: '+7 (940) 704-77-77',
        workingHours: 'с 11:00 до 23:00',
        image: '/assets/RestaurantsNewAfon2.jpg',
        nameLink: null,
        website: null,
    },
    {
        id: 3,
        name: 'Limar',
        nameLink: 'https://www.instagram.com/limar_cafe/',
        address: 'Новый Афон, ул. Эшба, 1/1',
        addressLink: 'https://yandex.com/maps/-/CDxHARkJ',
        phone: '+7 (940) 774-22-44\n+7 (940) 700-47-68\n+7 (940) 776-01-41',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsNewAfon3.jpg',
        website: null,
    },
    {
        id: 4,
        name: 'Loft',
        address: 'Новый Афон, пер. Ладария, 5',
        addressLink: 'https://yandex.com/maps/-/CDxHADzg',
        phone: '+7 (940) 921-00-55',
        workingHours: 'с 08:00 до 22:00',
        image: '/assets/RestaurantsNewAfon4.jpg',
        nameLink: null,
        website: null,
    },
    {
        id: 5,
        name: 'Мармиро',
        nameLink: 'https://www.instagram.com/marmiro.afon?igsh=MTd1MTFmYXhmZTIyaQ==',
        address: 'Новый Афон, Курортная ул., 1',
        addressLink: 'https://yandex.com/maps/-/CDxHIV~f',
        phone: '+7 (940) 967-65-45',
        workingHours: 'с 08:30 до 00:00',
        image: '/assets/RestaurantsNewAfon5.jpg',
        website: null,
    },
    {
        id: 6,
        name: 'Вкусно как у мамы',
        address: 'Гудаутский район, Новый Афон, улица Эшба',
        addressLink: 'https://yandex.com/maps/-/CDxHIHII',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsNewAfon6.jpg',
        phone: null,
        nameLink: null,
        website: null,
    },
    {
        id: 7,
        name: 'Лебедь',
        address: 'Гудаутский район, Новый Афон, Лебединое озеро',
        addressLink: 'https://yandex.com/maps/-/CDxHMEKJ',
        workingHours: 'с 12:00 до 23:00',
        image: '/assets/RestaurantsNewAfon7.jpg',
        phone: null,
        nameLink: null,
        website: null,
    },
    {
        id: 8,
        name: 'СанРайс',
        nameLink: 'https://instagram.com/sunrise_coffee_afon?igshid=MzRlODBiNWFlZA==',
        website: 'https://sunrise-afon.tilda.ws/',
        address: 'Новый Афон, ул. Ладария, 3',
        addressLink: 'https://yandex.com/maps/-/CDxHMGMC',
        phone: '+7 (940) 733-73-71',
        workingHours: 'с 08:30 до 21:00',
        image: '/assets/RestaurantsNewAfon8.jpg',
    },
    {
        id: 9,
        name: 'Три платана',
        address: 'Гудаутский район, Новый Афон, улица Харазия',
        workingHours: 'с 10:00 до 20:00',
        image: '/assets/RestaurantsNewAfon9.jpg',
        addressLink: null,
        phone: null,
        nameLink: null,
        website: null,
    },
];

const RestaurantsNewAfon: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Новый Афон: рестораны и кафе</h1>
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
                                <h2 className={`${styles.restaurantName} ${restaurant.nameLink ? styles.clickable : ''}`}>
                                    {restaurant.nameLink ? (
                                        <a href={restaurant.nameLink} target="_blank" rel="noopener noreferrer">{restaurant.name}</a>
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

export default RestaurantsNewAfon;
