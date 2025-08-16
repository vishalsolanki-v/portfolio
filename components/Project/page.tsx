"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { PROJECTS } from '@/shared/constants';
const Projects = () => {
  return (
    <>
    <div  className="border-2 border-x-0 border-b-2">
  <div className="w-full flex flex-row">
    <div className="w-1/2"><p className="px-10 py-5 text-[length:var(--text-size-heading-2)]  font-bold font-heading-montserrat">Latest Projects</p></div>
    <div></div>
  </div>
</div>

{PROJECTS?.map((project)=>(
  <div key={project.name} className='flex flex-row border-b-2 h-[370px]'>
  <div className='w-1/4 border-r-2 p-10 text-[length:var(--text-size-base)]'><p className='font-semibold font-heading-lora'>Role: {project.role}</p><p>{project.date}</p></div>
  <div className='w-3/4 p-10 flex flex-col justify-between'>
  <p className='text-[length:var(--size-step-4)] font-heading-lora navLink w-fit'>{project.name}</p>
  <p className='text-[length:var(--text-size-base)]'>{project.description}</p>
  <div className='flex flex-row gap-2'>
  {project?.tags?.map((tag,index)=>(
                    <div key={tag+index} className="border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{tag}</div>
  ))}
  </div>
  </div>
</div>
))}


    </>
  )
}

export default Projects