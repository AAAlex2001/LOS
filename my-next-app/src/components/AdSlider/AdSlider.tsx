
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './AdSlider.module.scss';

type SliderItem = { type: 'video' | 'image'; src: string };

const defaultSliderItems: SliderItem[] = [
  { type: 'video', src: '/assets/Video12.mp4' },
  { type: 'image', src: '/assets/Video1.JPG' },
  { type: 'image', src: '/assets/Video2.JPG' },
  { type: 'image', src: '/assets/Video3.JPG' },
  { type: 'image', src: '/assets/Video4.JPG' },
  { type: 'image', src: '/assets/Video5.PNG' },
  { type: 'image', src: '/assets/Video6.JPG' },
  { type: 'image', src: '/assets/Video7.JPG' },
  { type: 'image', src: '/assets/Video8.JPG' },
  { type: 'image', src: '/assets/Video9.JPG' },
  { type: 'image', src: '/assets/Video10.JPG' },
  { type: 'image', src: '/assets/Video11.JPG' },
];

const AdSlider: React.FC<{ items?: SliderItem[] }> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderItems = useMemo(() => (items && items.length ? items : defaultSliderItems), [items]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {sliderItems.map((item, index) => (
          <div key={index} className={styles.slide}>
            {item.type === 'video' ? (
              <div className={styles.videoWrapper}>
                <video 
                  className={styles.videoMedia} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  webkit-playsinline="true"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <Image src={item.src} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" className={styles.sliderMedia} />
            )}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className={`${styles.sliderButton} ${styles.prev}`}>&#10094;</button>
      <button onClick={nextSlide} className={`${styles.sliderButton} ${styles.next}`}>&#10095;</button>
    </div>
  );
};

export default AdSlider; 