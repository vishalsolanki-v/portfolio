"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
const Projects = () => {
  return (
    <>
    <div className="xl:max-w-screen-xl xl:mx-auto w-full border-rose-500 border-0 sm:py-5 sm:my-[40px] flex">

    <div className='w-1/2'>
    <h1 className="text-left w-full font-heading-montserrat text-3xl font-bold">Projects</h1>
<h1 className="text-[40px] leading-[50px] sm:px-0 px-4 text-left sm:text-xl md:text-2xl lg:text-3xl xl:text-[54px] xl:leading-[60px] font-[700]">
  My <span className='gradient-text2 '>Project</span> Portfolio.
  {/* My Project Portfolio. */}
</h1>
    </div>
    <div className='w-1/2 text-right flex flex-col items-end justify-center'>
    <a href="#_" className="relative inline-flex items-center justify-center px-5 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
<span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ff7000] rounded-full group-hover:w-56 group-hover:h-56"></span>
<span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span className="relative font-heading-montserrat font-semibold">View all Projects </span>
</a>
    </div>
    </div>


    <div className="div">
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
    </>
  )
}

export default Projects