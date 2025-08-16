import React from 'react'

const Layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <React.Fragment>
    {children}
    </React.Fragment>
  )
}

export default Layout