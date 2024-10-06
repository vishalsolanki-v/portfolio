import Navbar from '@/components/Navbar/page'
import CustomCursor from '@/shared/CustomCursor'
import React from 'react'

const Layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <React.Fragment>
    <Navbar/>
    {children}
    {/* <CustomCursor/> */}
    </React.Fragment>
  )
}

export default Layout