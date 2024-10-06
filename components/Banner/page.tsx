import React from 'react'
import Spline from '@splinetool/react-spline/next';
import AnimationWrapper from '@/shared/AnimationInitializer';
const Banner = () => {
  return (
    <>
   <div className="cursor-custom xl:max-w-screen-xl sm:flex xl:mx-auto w-full border-rose-500 border-0 sm:py-5 sm:mt-5">
  <div className="w-full sm:w-1/2 border-0 border-rose-500">
{/* <AnimationWrapper> */}
  <h1 className="text-[40px] leading-[50px] sm:px-0 px-4 sm:text-xl md:text-2xl lg:text-3xl xl:text-[64px] xl:leading-[70px] font-[700]">
  <span className='gradient-text2 font-heading-playfairDisplay font-[900]'>I create fullstack solutions</span> that blend seamless functionality with stunning visuals<span className='gradient-text2'>.</span>
</h1>
{/* </AnimationWrapper> */}


<p className="text-base sm:text-sm md:text-lg leading-8 sm:px-0 px-4 lg:text-xl xl:text-2xl py-5 font-heading-montserrat font-[600] tracking-wide ">
  <span className="gradient-text2 font-heading-playfairDisplay text-3xl font-bold">Hi! I&apos;m Vishal Solanki</span>, a <span className="">Fullstack Web Developer</span> based in India. I specialize in building user-friendly and efficient interfaces for fast-growing startups.
</p>

<div className='btnnnndddddddd flex flex-row gap-5 sm:px-0 px-4 sm:pb-0 pb-4'>
<a href="#_" className="relative inline-block text-lg group">
<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight  transition-colors duration-300 ease-out border-2 text-[#ff7000] rounded-lg group-hover:text-white">
<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 primary-gradient group-hover:-rotate-180 ease"></span>
<span className="relative font-heading-montserrat font-semibold">Book a call</span>
</span>
{/* <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span> */}
</a>

{/* de */}
<a href="https://drive.google.com/file/d/1GeoEvSuYs_ti4mtF7Ab5Dx41ijFjrH9D/view?usp=drive_link" target='_blank' className="relative rounded-lg inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#ff7000] transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 bg-gray-50 group">
<span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out primary-gradient group-hover:h-full"></span>
<span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg className="w-5 h-5 text[#ff7000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="relative w-full text-left transition-colors duration-200 ease-in-out font-heading-montserrat font-semibold group-hover:text-white">View My CV</span>
</a>


</div>

  </div>


  <div className="w-full sm:w-1/2 border-0 border-rose-500 overflow-visible sm:block hidden"> 
  <Spline
 className='bg-black overflow-visible'
 scene="https://prod.spline.design/Uqgb6cTMtMznrKxR/scene.splinecode"
      /></div>

<div className="w-full sm:w-1/2 border-0 border-rose-500 overflow-visible sm:hidden block"> <Spline
 className='bg-black overflow-visible'
 scene="https://prod.spline.design/e9CHgpnozjqxqPOI/scene.splinecode"
      /></div>
</div>
    </>
  )
}

export default Banner

