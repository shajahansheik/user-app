import React from 'react'
import Footer from './footer'
import Header from './header'

export default function Layout({children}) {
  return (
    <div>
        <Header navPosition="right" className="reveal-from-bottom"/>
        <div>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
