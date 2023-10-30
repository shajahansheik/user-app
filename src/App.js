
import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useParams, Router } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

import Home from './routes/home';
import Services from './routes/services';
import About from './routes/about';
import Contact from './routes/contact';
import ServiceDetail from './routes/serviceDetail';
import ServiceComplete from './routes/serviceComplete';
import BlogPost from './routes/blogPost';
import Career from './routes/career';
import ScrollToTop from './scrollToTop';
import ServiceDetails from './routes/serviceDetails';

import './App.css';
import ServiceFile from './routes/servicefile';
import Header from './components/header';
import Footer from './components/footer';
import BoundHeader from './components/bound_header';
import Careers from './routes/careers';
import Verification from './routes/verification';



const App = () => {

  localStorage.setItem("langPref", 'french');
  // let user = localStorage.getItem("visitorType");
  return (
    <>
    <Router>
      <div className='relative flex flex-col'>
        <ScrollToTop />
        <div className='sticky top-0 z-50' >
          <BoundHeader />
        </div>
        <div className=''>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="servicefile" element={<ServiceFile />} />
            <Route path='ServiceDetail/:id' element={<ServiceDetails />} />
            <Route path="ServiceComplete/:id" element={<ServiceComplete />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="career" element={<Career />} />
            <Route path="verification" element={<Verification />} />
          </Routes>
          
        </div>
        <div >
          <Footer />
        </div>
      </div>
    </Router>
    </>
  )
};

export default App;
