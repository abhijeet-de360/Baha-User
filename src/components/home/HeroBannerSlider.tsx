import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface HeroBannerSliderProps {
  onSelectCategory?: (category: string) => void;
  onPromoClick?: (code: string) => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({
  onSelectCategory,
  onPromoClick,
}) => {
  const slides = [
    {
      id: 'summer-sale-slide-1',
      image: '/banners/banner2.png',
      alt: 'Summer Sale Flat 50% Off - Baha Fashion',
      tag: 'Special Drop 1',
      category: 'sale',
      promoCode: 'LITTLEJOY10',
    },
    {
      id: 'summer-sale-slide-2',
      image: '/banners/banner3.png',
      alt: 'Summer Sale Flat 50% Off - Baha Fashion',
      tag: 'Special Drop 2',
      category: 'all',
      promoCode: 'WELCOME15',
    },
    {
      id: 'summer-sale-slide-3',
      image: '/banners/banner1.png',
      alt: 'Summer Sale Flat 50% Off - Baha Fashion',
      tag: 'Special Drop 3',
      category: 'sale',
      promoCode: 'LITTLEJOY10',
    },
  ];

  const handleSlideClick = (slide: typeof slides[0]) => {
    if (slide.category && onSelectCategory) {
      onSelectCategory(slide.category);
    }
    if (slide.promoCode && onPromoClick) {
      onPromoClick(slide.promoCode);
    }
    document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#FFFDF8] group/slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: '.hero-prev-btn',
          nextEl: '.hero-next-btn',
        }}
        loop={true}
        className="hero-swiper w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              onClick={() => handleSlideClick(slide)}
              className="w-full relative cursor-pointer group select-none overflow-hidden"
            >
              {/* Full Width Banner Graphic */}
              <div className="w-full sm:aspect-[2.6/1] lg:aspect-[2.8/1] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[500px] xl:min-h-[560px] bg-background relative flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full object-cover object-center transform transition-transform duration-700 ease-out"
                  loading="eager"
                />
              </div>

              {/* Subtle overlay indicator on hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons using Shadcn Button component */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hero-prev-btn absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 backdrop-blur-md border-white/60 shadow-sm text-text-main opacity-20 hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.2] -ml-0.5" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hero-next-btn absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 backdrop-blur-md border-white/60 shadow-sm text-text-main opacity-20 hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.2] -mr-0.5" />
      </Button>
    </section>
  );
};
