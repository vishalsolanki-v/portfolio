// import React from 'react'

// const Navbar = () => {
//   return (
//     <>
//     <div className="xl:max-w-screen-xl sm:px-0 px-4 flex xl:mx-auto w-full border-rose-500 border-0">
//       <div className="w-1/2 border-0 font-bold text-[28px]  font-heading-montserrat py-2 leading-loose tracking-wider italic">
//        <span className=''>{'{<Vis'}
//         <span className="gradient-text font-extrabold font-heading-lora ">
//           {'haL/>}'}
//         </span></span>
        
//       </div>

//       <div className="w-1/2 hidden sm:block border-0 py-2">
//         <ul className="list-none p-0 flex border-0 font-heading-montserrat font-semibold h-full items-center justify-end gap-10">
//           <li className='hover:gradient-text navLink'>About</li>
//           <li className='hover:gradient-text navLink'>Services</li>
//           <li className='hover:gradient-text navLink'>Projects</li>
//           <li className='hover:gradient-text navLink'>Article</li>
//           <li className='hover:gradient-text navLink'>Book a call</li>
//         </ul>
//       </div>
//       <div className="w-1/2 sm:hidden border-0 flex justify-end py-2">  <div>
//       <button className="relative group">
//         <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-[#ff7000] ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
//           <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
//             <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg]"></div>
//             <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-translate-x-10"></div>
//             <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]"></div>
//           </div>
//         </div>
//       </button>
//     </div></div>
//     </div>
//   </>
//   )
// }

// export default Navbar

import { NAV_LINKS } from '@/shared/constants'
import { li } from 'framer-motion/client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div><ul className='flex xl:justify-start justify-center gap-5 md:pl-0 pl-2 flex-wrap'>
      {NAV_LINKS.map((n,i)=><li key={i} className='text-xl font-heading-lora font-extrabold navLink gradient-text'><Link   target={n.name === "My Resume" || n.name === "Contact" ? "_blank" : undefined} 
          rel={n.name === "My Resume" || n.name === "Contact" ? "noopener noreferrer" : undefined} href={n.href || ""}>{n.name}</Link></li>)}
      </ul></div>
  )
}

export default Navbar