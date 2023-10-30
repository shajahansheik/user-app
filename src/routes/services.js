import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';


import AOS from 'aos';
import 'aos/dist/aos.css';

import content from "./content.json";
import ImageCarouser from '../components/image-carousel';


export default function Services() {
    const location = useLocation();

    AOS.init()

    let val = "professional";
    let email = localStorage.getItem("email")
    

    const navigate = useNavigate();

    

    let langPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);

    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setLang(localStorage.getItem('langPref'))
        });
        if(localStorage.getItem("email") === '' || localStorage.getItem("email") === null || localStorage.getItem("email") === undefined){
            localStorage.setItem("redirect", location.pathname);
            navigate('/');
    
        }
    }, [])
    console.log("email", email)
    return (
        <Container fluid>
            <div style={{ padding: "10px" }}>
                {/* <Header navPosition="right" className="reveal-from-bottom" /> */}
                <div>
                    <h2 className="servicesHeading1" data-aos="fade-up">{content.servicePage.heading[lang]}</h2>
                    <div className="servicesPara" data-aos="fade-up">{content.servicePage.mainPara[lang]}</div>
                </div>
                <div >
                    <ImageCarouser language={lang} />
                </div>
                {/* <Footer /> */}

            </div>
        </Container>
    )
}
