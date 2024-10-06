import Image from 'next/image'
import React from 'react'

const MyService = () => {
  return (
    <>
    <div className="cursor-custom xl:max-w-screen-xl xl:mx-auto w-full border-rose-500 border-0 sm:py-5 sm:my-[40px]">
<h1 className="text-center w-full font-heading-montserrat text-3xl font-bold">What I Offer</h1>
<h1 className="text-[40px] leading-[50px] sm:px-0 px-4 text-center sm:text-xl md:text-2xl lg:text-3xl xl:text-[54px] xl:leading-[60px] font-[700]">
  <span className='gradient-text2 '>Crafting Solutions!<br /></span> That Transform&lsquo;s Ideas into Reality.
</h1>
    </div>

<div className='xl:max-w-screen-xl xl:mx-auto w-full text-left  gap-10 sm:flex p-0 m-0 border-0  border-orange-500'>

<div className="sm:w-1/3 w-full relative border-0 px-6 py-6 group rounded-2xl hover:shadow-[rgba(255,_255,_255,_1)_0px_0px_16px]  shadow-[rgba(255,_255,_255,_0.5)_0px_0px_16px] overflow-hidden z-10 border-rose-500 mb-[40px]">
<Image src={"/assets/icons/icon4.png"} alt="icon" width={50} height={50}/>
<h2 className=' gradient-text2 text-2xl my-4 font-bold'>Here’s what I offer</h2>
<p className='text-base mb-3  text-gray-500'>Deliver high-quality, user-centric solutions with efficiency and precision. Here’s what I offer.</p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Web and Mobile App Design :</span><span> Crafting engaging and intuitive designs for both web and mobile platforms.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Front-end Development :</span><span> Creating responsive, dynamic user interfaces using React.js, Next.js, and modern frontend technologies.</span></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Back-end Development :</span><span> Building robust server-side logic and integrating APIs to ensure seamless functionality.</span></p>
{/* <p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Fullstack Development :</span><span> Offering comprehensive solutions from initial concept to final deployment, ensuring a cohesive product.</span></p> */}
{/* <div className="absolute right-0 top-0 w-[20px] h-[20px] bg-rose-500 animate-grow"></div> */}
{/* <div className="absolute right-[-5px] top-[-5px] h-[20px] w-[20px]  bg-[#ff7000] group-hover:h-[110%] z-0 group-hover:w-[100%] transition-all duration-500 ease-in-out"></div> */}


</div>




<div className="sm:w-1/3 w-full  border-0 px-6 py-6  rounded-2xl  hover:shadow-[rgba(255,_255,_255,_1)_0px_0px_16px] shadow-[rgba(255,_255,_255,_0.5)_0px_0px_16px] border-rose-500 mb-[40px]">
<Image src={"/assets/icons/icon2.png"} alt="icon" width={50} height={50}/>
<h2 className=' gradient-text2 text-2xl my-4 font-bold'>What You Can Expect</h2>
<p className='text-base mb-3  text-gray-500'>My approach ensures that your product is not only visually appealing but also highly functional.</p>
<p className='mb-3 '><span className='text-lg p-0 m-0 font-bold gradient-text2 '>Design Strategy :</span><span className=''> Developing strategies that align with your business goals and user needs.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Clean and Functional :</span><span className=''> Designs that prioritize usability and clarity for an enhanced user experience.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Device and User Friendly :</span><span> Ensuring seamless performance across all devices and screen sizes.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Efficient and Maintainable :</span><span> Writing clean, scalable code that is easy to manage and adapt.</span></p>
</div>

<div className="sm:w-1/3 w-full  border-0 px-6 py-6  rounded-2xl hover:shadow-[rgba(255,_255,_255,_1)_0px_0px_16px]  shadow-[rgba(255,_255,_255,_0.5)_0px_0px_16px] border-rose-500 mb-[40px]">
<Image src={"/assets/icons/icon3.png"} alt="icon" width={50} height={50}/>
<h2 className=' gradient-text2 text-2xl my-4 font-bold'>Tools I Excel In</h2>
<p className='text-base mb-3  text-gray-500'>To bring your vision to life, I leverage the following platforms.</p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2 break-words'>React JS | Next JS :</span><span> Developing strategies that align with your business goals and user needs.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>Tailwind CSS :</span><span> Crafting custom, responsive designs with a utility-first approach to CSS.</span><br /></p>
<p className='mb-3'><span className='text-lg p-0 m-0 font-bold gradient-text2'>GSAP :</span><span> Implementing smooth, complex animations to enhance user engagement..</span></p>
</div>
</div>

    </>
  )
}

export default MyService