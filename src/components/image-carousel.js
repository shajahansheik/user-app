import React, { useState,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Link } from 'react-router-dom'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ImageCarouser(pageprops) {
let usetType = localStorage.getItem('visitorType')
const [type,setType]=useState(usetType)
useEffect(() => {
    window.addEventListener('storage', () => {
        console.log("changed store");
        setType(localStorage.getItem('visitorType'))
    });
    
}, [])
    return (
        <div >
            <div className="sm:block hidden">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={-300}
                    navigation={true}
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: true,
                    }}
                    loop={true}
                    modules={[EffectCoverflow, Navigation, Pagination]}
                    className="swiper"
                >
                    <SwiperSlide>

                        <div className="rd-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "IR&D Engineering" : 'IR&D Engineering'}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/randd" }} state={{ language: pageprops?.language, subject: "randd" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="electronic-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "Conception Électroniques" : "Electronic Design"}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/electronics" }} state={{ language: pageprops?.language, subject: "electronics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="embedded-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Systèmes Embarqués' : 'Embedded Systems'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/embedded_systems" }} state={{ language: pageprops?.language, subject: "embedded_systems" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="software-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Développement de Logiciels' : 'Software Development'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/software_development" }} state={{ language: pageprops?.language, subject: "software_development" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="mechanics-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Conception Mécaniques et Systèmes ' : 'Mechanical Systems & Design'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/mechanics" }} state={{ language: pageprops?.language, subject: "mechanics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="rd-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "IR&D Engineering" : 'IR&D Engineering'}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/randd" }} state={{ language: pageprops?.language, subject: "randd" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="electronic-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "Conception Électroniques" : "Electronic Design"}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/electronics" }} state={{ language: pageprops?.language, subject: "electronics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="embedded-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Systèmes Embarqués' : 'Embedded Systems'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/embedded_systems" }} state={{ language: pageprops?.language, subject: "embedded_systems" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="software-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Développement de Logiciels' : 'Software Development'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/software_development" }} state={{ language: pageprops?.language, subject: "software_development" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="mechanics-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Conception Mécaniques et Systèmes ' : 'Mechanical Systems & Design'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/mechanics" }} state={{ language: pageprops?.language, subject: "mechanics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
            <div className="sm:hidden block">
                <Swiper
                    slidesPerView={1}

                    spaceBetween={30}
                    loop={true}

                    initialSlide={1}

                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="swiper"
                >
                    <SwiperSlide>

                        <div className="rd-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "IR&D Engineering" : 'IR&D Engineering'}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/randd" }} state={{ language: pageprops?.language, subject: "randd" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="electronic-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "Conception Électroniques" : "Electronic Design"}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/electronics" }} state={{ language: pageprops?.language, subject: "electronics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="embedded-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Systèmes Embarqués' : 'Embedded Systems'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/embedded_systems" }} state={{ language: pageprops?.language, subject: "embedded_systems" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="software-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>

                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Développement de Logiciels' : 'Software Development'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/software_development" }} state={{ language: pageprops?.language, subject: "software_development" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="mechanics-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Conception Mécaniques et Systèmes ' : 'Mechanical Systems & Design'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/mechanics" }} state={{ language: pageprops?.language, subject: "mechanics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="rd-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "IR&D Engineering" : 'IR&D Engineering'}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/randd" }} state={{ language: pageprops?.language, subject: "randd" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="electronic-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? "Conception Électroniques" : "Electronic Design"}</h2>
                                { type=== 'professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/electronics" }} state={{ language: pageprops?.language, subject: "electronics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="embedded-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Systèmes Embarqués' : 'Embedded Systems'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/embedded_systems" }} state={{ language: pageprops?.language, subject: "embedded_systems" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="software-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Développement de Logiciels' : 'Software Development'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/software_development" }} state={{ language: pageprops?.language, subject: "software_development" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className="mechanics-image" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", flexDirection: "column", padding: "2px" }}>
                                <h2 style={{ color: "white" }} className="servicesCardHeading">{pageprops?.language === 'french' ? 'Conception Mécaniques et Systèmes ' : 'Mechanical Systems & Design'}</h2>
                                {type ==='professional' ? <Link className="servicesCardLink" to={{ pathname: "/ServiceDetail/mechanics" }} state={{ language: pageprops?.language, subject: "mechanics" }} >{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</Link>:<div className="servicesCardLink" onClick={()=>alert(pageprops?.language === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{pageprops?.language === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default ImageCarouser;