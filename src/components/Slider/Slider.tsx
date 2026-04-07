"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AppButton from "../shared/AppButton/AppButton";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// تعريف شكل البيانات
interface SlideData {
  title?: React.ReactNode;
  description?: string;
  button1?: string;
  button2?: string;
  img: any; 
}

interface SliderProps {
  imageList: SlideData[];
  spaceBetween?: number;
  slidesPerView?: number;
}

export default function Slider({ imageList, spaceBetween = 0, slidesPerView = 1 }: SliderProps) {
  // حل مشكلة الـ Hydration Error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // لو لسه بنحمل على السيرفر، بنعرض Loader أو مساحة فاضية
  if (!mounted) {
    return (
      <div className="home-slider-container h-[400px] w-full  animate-pulse flex items-center justify-center">
        <span className="">Loading Slider...</span>
      </div>
    );
  }

  return (
    <div className="home-slider-container">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
        loop={true}
        
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {imageList.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* استبدلت h-400px بـ h-[400px] لأنها الطريقة الصحيحة في Tailwind */}
            <div className="relative h-[400px] w-full">
              {/* الصورة */}
              <div className="h-full w-full relative">
                <Image 
                  src={slide.img} 
                  alt="Slider Image" 
                  fill 
                  className="object-cover"
                  priority={index === 0} 
                />
              </div>

              {/* طبقة اللون الأخضر (Overlay) */}
              <div className="bg-main-color absolute inset-0 opacity-70"></div>

              {/* المحتوى النصي */}
              <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-center z-10">
                <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight">
                  {slide.title}
                </h2>
                <p className="text-white pt-5 text-xl">
                  {slide.description}
                </p>
                <div className="mt-8 gap-5 flex">
                  <AppButton className="bg-white text-[18px] font-semibold text-main-color px-8 py-3 rounded-lg hover:bg-white shadow-md border-none">
                    {slide.button1}
                  </AppButton>
                  <AppButton className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                    {slide.button2}
                  </AppButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تنسيقات CSS مخصصة */}
      <style jsx global>{`
        /* 1. النقاط (Pagination) */
        .home-slider-container .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.6;
          transition: all 0.3s ease;
        }
        .home-slider-container .swiper-pagination-bullet-active {
          width: 30px !important;
          border-radius: 5px !important;
          opacity: 1 !important;
        }

        /* 2. الدايرة (Navigation Buttons) */
        .home-slider-container .swiper-button-next,
        .home-slider-container .swiper-button-prev {
          background: white !important; 
          color: #22c55e !important;   
          width: 40px !important;      
          height: 40px !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* 3. شكل وحجم السهم */
        .home-slider-container .swiper-button-next:after,
        .home-slider-container .swiper-button-prev:after {
          font-size: 14px !important;   
          font-weight: 900 !important;  
        }
        .home-slider-container .swiper-button-prev {
          left: 20px !important;
        }
        .home-slider-container .swiper-button-next {
          right: 20px !important;
        }
      `}</style>
    </div>
  );
}