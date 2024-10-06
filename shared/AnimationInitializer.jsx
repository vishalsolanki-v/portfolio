"use client"

import { useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css';
export default function AnimationWrapper({ children }) {
    useEffect(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }, []);
  
    return <>{children}</>;
  }