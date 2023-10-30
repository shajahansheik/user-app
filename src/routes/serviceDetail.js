import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom'

import content from "./content.json";
import serviceResponse from "./response.json";

import img2 from '../assets/Image-2.png'
import img3 from '../assets/Image-3.png'
import img4 from '../assets/Image-4.png'
import img6 from '../assets/Image-6.png'
import img7 from '../assets/Image-7.png'


let imgMap = {
    "electronics": img7,
    "embedded_systems": img3,
    "mechanics": img4,
    "randd": img6,
    "software_development": img2
}




export default function ServiceDetail() {
    const location = useLocation();


    let langPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);

    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setLang(localStorage.getItem('langPref'))
        });
    }, [])
    console.log("props: ", lang,location, serviceResponse[location.state.subject]);

    return (
        <Container fluid>
            <Header navPosition="right" className="reveal-from-bottom" />

            <div style={{ background: '#1E1E1E', margin: 'auto', width: '100%', padding: '2% 7.5%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
                    <div style={{
                        flex: 1, padding: '10px', backgroundImage: `url(${imgMap[location.state.subject]})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        minHeight: '50vh',
                        minWidth: 350,
                        marginBottom: '0 !important'
                    }}
                    className="serviceDetailImgResponsive"
                    >
                    </div>

                    <div style={{ flex: 1, padding: '10px' }}>
                        <div className='sContainer'>
                            <div className='row'>
                                <h2 className="sdHeading">{serviceResponse[location.state.subject].title[lang]}</h2>
                                <p className="aboutParaService aboutParaService1">{content.servicePageDetail.eds_p1[lang]}</p>
                                {/* <p className="aboutParaService">{content.servicePageDetail.eds_p2[lang]}</p> */}

                                <Link to="/servicecomplete" state={{ subject: location.state.subject }} ><button className="learnMoreBtn">{content.servicePageDetail.learnMore[lang]}</button></Link>
                            </div>

                            <div className='row'>
                                <h2 className="sdHeading" style={{ marginTop: 20 }}>{content.servicePageDetail.recent[lang]}</h2>

                                <div className='postsList'>

                                    <div className="card " style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div >
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} {"->"}</a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card" style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div >
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} {"->"}</a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card" style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div >
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} {"->"}</a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/* <div className="row" style={{ background: '#1E1E1E', margin: 'auto', width: '100%', paddingBottom: 100, padding: '2% 7.5%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{
                        flex: 1, padding: '10px', backgroundImage: `url(${imgMap[location.state.subject]})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        minWidth: '450px',
                        width: '100%',
                        height: '100%'
                    }}>
                    </div>

                    <div style={{ flex: 1, padding: '10px' }}>
                        <div className='container sContainer'>
                            <div className='row'>
                                <h2 className="sdHeading">{serviceResponse[location.state.subject].title[lang]}</h2>
                                <p className="aboutPara">{content.servicePageDetail.eds_p1[lang]}</p>
                                <p className="aboutPara">{content.servicePageDetail.eds_p2[lang]}</p>

                                <Link to="/servicecomplete" state={{ subject: location.state.subject }} ><button className="learnMoreBtn">{content.servicePageDetail.learnMore[lang]}</button></Link>
                            </div>

                            <div className='row'>
                                <h2 className="sdHeading" style={{ marginTop: 50 }}>{content.servicePageDetail.recent[lang]}</h2>

                                <div className='postsList'>

                                    <div className="card mb-3" style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} -></a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3" style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} -></a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3" style={{ background: '#283036', marginBottom: 12, overflowX: 'hidden', overflow: 'hidden' }}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={require('../assets/Image-5.png')} className="card-img" alt="..." style={{ height: '100%' }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="card-text recentPostCardCategory">{content.servicePageDetail.category[lang]} &middot; {content.servicePageDetail.monthPre[lang]} 1 {content.servicePageDetail.monthPost[lang]}</p>
                                                    <h5 className="card-title recentPostCardTitle">Cum metus nunc in odio.</h5>
                                                    <p className="card-text recentPostCardContent">lit. Phasellus aliquet nibh id iaculis pharetra. Maecenas  </p>
                                                    <span className="recentPostCardTag" style={{ marginBottom: 12 }}>12 {content.servicePageDetail.minRead[lang]}</span> <Link to="/blog"><a href="#" className="recentPostCardMore">{content.servicePageDetail.learnMore[lang]} -></a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div> */}

            <Footer />
        </Container>
    )
}
