import { VISHAL_TECH_SKILLS } from '@/shared/constants';
import React from 'react'

const Banner = () => {
  return (
    <>
<div className='w-full h-full xl:h-[60vh]  primary-gradient_2  mt-3 xl:flex xl:flex-wrap md:pb-0 pb-5'>
<div className="xl:w-[60%] w-full lg:p-10  lg:pb-0  p-5 pb-2 xl:text-left text-center  h-full">
  <h1 className="p-0 m-0 leading-relaxed xl:text-[60px] md:text-[60px] text-[30px] font-heading-lora  font-bold w-fit ">
    <mark className="p-0 m-0 w-fit  bg-slate-200 ">
      This Website Runs on Passion and JavaScript
    </mark>
  </h1>
  <div className='gap-5 flex flex-row py-5 xl:mt-6 xl:justify-start justify-center  w-full border-0'>

  <button className='px-9 py-2 border border-black text-[14px] font-semibold bg-black hover:bg-transparent hover:text-black font-heading-montserrat'>My Link Tree</button>
  <button className='px-9 py-2 border text-[14px] font-semibold border-black text-black hover:bg-black hover:text-white font-heading-montserrat'>My Latest Articles</button>
  </div>
</div>
<div style={{fontSize:'clamp(1.3125rem, 1.1951rem + 0.5872vi, 1.75rem)'}} className=' xl:w-[40%] xl:text-left text-center w-full xl:p-20   font-semibold text-pretty text-black italic font-heading-lora'>
Hi! I&lsquo;m Vishal, a Fullstack <br /> Web Developer based <br /> in India.
</div>
</div>
<SkillsScrollbar/>
    </>
  )
}

export default Banner;

const SkillsScrollbar = ()=>{
  return(
  <div className='px-10 py-5 border-red-500 border-0  bg-gray-800 flex flex-row w-full'>

  <div className='w-[10%] border-0 border-blue-500 items-top flex justify-start font-bold text-xl pt-1 font-heading-montserrat gradient-text'>My Skills</div>
  <div className='flex flex-row justify-start gap-5 items-center w-[90%] overflow-y-hidden overflow-x-scroll pb-4 skill-section-custom-scrollbar'>
    {VISHAL_TECH_SKILLS?.map((skill)=>(
      <div key={skill} className=' font-heading-montserrat border-2 border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold'>
        {skill}
      </div>
    ))}
  </div>
  </div>
  
  )
}