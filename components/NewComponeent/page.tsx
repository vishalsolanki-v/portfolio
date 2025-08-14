import { PRIMARY_COLOR_CODE } from '@/shared/constants'
import React from 'react'

const NewComponent = () => {
  return (
    <>
    {/* <div className='w-full h-10 xl:block hidden'></div> */}
<div className="w-full flex flex-col xl:flex-row ">
  <div className={`w-full font-bold font-heading-montserrat  xl:w-[60%] lg:h-[200px] md:h-[150px] h-[120px] xl:border-b-2  text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[9rem] xl:text-[7rem] flex justify-center items-center`} > <span className=''>{'{<Vis'}
        <span className="gradient-text font-extrabold  ">
          {'haL/>}'}
        </span></span></div>
  <div className="w-full xl:p-10 xl:w-[30%]  h-[60px] xl:h-[200px] border-2 xl:border-x-2 border-x-0 border-t-0 flex items-center xl:block">
    <h2 className='font-heading-montserrat text-xl leading-7 hidden xl:block'>Web Developer | Programmer | Listener 🚀. </h2>
    <p className='font-heading-lora mt-8 text-lg hidden xl:block navLink'>Since 2022.</p>
    <h2 className='font-heading-montserrat mx-5 pb-5 text-xl block xl:hidden text-center w-full'>Web Developer | Programmer | Listener 🚀. <span className='font-heading-lora'>Since 2022.</span></h2>
  </div>
  <div className="w-full xl:w-[30%] h-[60px] xl:h-[200px] overflow-visible border-b-2 xl:p-10 flex xl:items-end justify-center xl:justify-start items-center">
  <div className='flex items-center'>
 <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600  shadow-lg animate-[glow_1.5s_infinite_linear]"></div>

&nbsp;&nbsp;<span className='xl:text-lg text-xl font-heading-lora'>Available For Work 🧑‍💻.&nbsp;<span className=' font-heading-lora  navLink md:inline-block hidden xl:hidden'>Build With - Next JS - Typescript 🚀</span></span>
 </div>
 </div>
</div>
<div className="w-1/2 border-0  text-[28px]   py-2 leading-loose tracking-wider italic">
      </div>
    </>
  )
}

export default NewComponent