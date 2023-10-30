import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';

import content from "./content.json";
import myVideo from '../assets/videos/video.mp4';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function About() {
    const location = useLocation();
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

    return (
        <Container fluid>
            

            <div className=" " >
                <div className='flexwrap'>
                    <div style={{ flex: 1,marginRight:'13px'}} className="lg:h-[45vw] h-full lg:overflow-scroll">
                        <div className='container aboutContainer '>
                            <div >
                                <h2 className="aboutHeading">{content.aboutUs.h1[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p1[lang]}</p>
                                <p className="aboutPara">{content.aboutUs.p12[lang]}</p>
                            </div>
                            <div  style={{ marginTop: 20 }}>
                                <h2 className="aboutHeading">{content.aboutUs.h2[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p2[lang]}</p>
                            </div>
                            <div  style={{ marginTop: 20 }}>
                                <h2 className="aboutHeading">{content.aboutUs.h3[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p3[lang]}</p>
                            </div>
                            <div  style={{ marginTop: 20 }}>
                                <h2 className="aboutHeading">{content.aboutUs.h4[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p4[lang]}</p>
                            </div>
                            <div  style={{ marginTop: 20 }}>
                                <h2 className="aboutHeading">{content.aboutUs.h5[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p5[lang]}</p>
                            </div>
                            <div  style={{ marginTop: 20 }}>
                                <h2 className="aboutHeading">{content.aboutUs.h6[lang]}</h2>
                                <p className="aboutPara">{content.aboutUs.p6[lang]}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, }} className="aboutRightDiv ">
                        <video autoPlay muted loop id="video" className="h-full bg-black">
                        <source src='https://bondaf.com/media/videos/Logo/Logo-Animation-Blue.mp4' type="video/mp4" />
                        
                    </video>
                    </div>
                </div>
            </div>


            
        </Container>
    )
}
