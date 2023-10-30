import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';


// import img2 from 'https://bondaf.com/media/images/pictures/Image-2.png';
// import img3 from 'https://bondaf.com/media/images/pictures/Image-3.png';
// import img4 from 'https://bondaf.com/media/images/pictures/Image-4.png';
// import img6 from 'https://bondaf.com/media/images/pictures/Image-6.png';
// import img7 from 'https://bondaf.com/media/images/pictures/Image-7.png';

import serviceResponse from "./response.json";
import content from "./content.json";

let imgMap = {
    "electronics": 'https://bondaf.com/media/images/pictures/HW/HW-square.svg',
    "embedded_systems": 'https://bondaf.com/media/images/pictures/FW/FW-square.svg',
    "mechanics": 'https://bondaf.com/media/images/pictures/MC/MC-square.svg',
    "randd": 'https://bondaf.com/media/images/pictures/IRD/IRD-square.svg',
    "software_development": 'https://bondaf.com/media/images/pictures/SW/SW_square.svg'
}

let imgMapmobile = {
    "electronics": 'https://bondaf.com/media/images/pictures/HW/HW-rect.svg',
    "embedded_systems": 'https://bondaf.com/media/images/pictures/FW/FW-rect.svg',
    "mechanics": 'https://bondaf.com/media/images/pictures/MC/MC-rect.svg',
    "randd": 'https://bondaf.com/media/images/pictures/IRD/IRD-rect.svg',
    "software_development": 'https://bondaf.com/media/images/pictures/SW/SW_rect.svg'
}

export default function ServiceDetails() {
    const location = useLocation();
    const [lang, setLang] = useState(localStorage.getItem("langPref") === 'french' ? "french" : localStorage.getItem("langPref"));
    const { id } = useParams();
    const navigate = useNavigate();

    let usetType = localStorage.getItem('visitorType')
    const [type, setType] = useState(usetType)
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setType(localStorage.getItem('visitorType'))
        });

    }, [])

    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setLang(localStorage.getItem('langPref'))
        });
        if (localStorage.getItem("email") === '' || localStorage.getItem("email") === null || localStorage.getItem("email") === undefined) {
            localStorage.setItem("redirect", location.pathname);
            navigate('/');
            console.log("past loc", location)

        }
    }, [])
    if (location?.state !== null) {
        localStorage.setItem("service", location?.state?.subject)
    }
    const [subject, setSubject] = useState(id)
    console.log("locations", location, subject, localStorage.getItem("service"))



    console.log("email", localStorage.getItem("email"))
    return (
        <div className='serviceDetailsMain'>

            <div className='serviceDetails'>
                <div className='lg:block hidden'>
                    <div className='imagediv' style={{ padding: '5px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <img src={imgMap[subject]} alt='img' className='serviceImage' />
                    </div>
                </div>
                <div className='lg:hidden block'>
                    <div className='imagediv' style={{ padding: '5px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <img src={imgMapmobile[subject]} alt='img' className='serviceImage' />
                    </div>
                </div>
                <div style={{ padding: '5px', width: '100%', paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h2 className='header' >{serviceResponse[subject]?.title[lang]}</h2>
                        {
                            subject === 'electronics' ? <p className='paragraph aboutParaService1'>{lang === 'french' ? "L’évolution de l’IoT et de l’industrie 4.0 redéfinit la conception matérielle du produit. Le succès du développement de produits pour le monde connecté, dépend de la conception pour la Fabricabilité, la Sécurité, la Modularité, les Cycles de prototypage courts, la Nomenclature optimisée et la Conformité réglementaire." : "The evolution of IoT and Industry 4.0 is redefining material product design. Successful product development for the connected world depends on design for manufacturability, safety, modularity, short prototyping cycles, optimised bill of materials and regulatory compliance."}</p> : null
                        }
                        {
                            subject === 'embedded_systems' ? <p className='paragraph aboutParaService1'>{lang === 'french' ? "Des dispositifs connectés intelligents au service d’objets artificiellement intelligents. La vraie valeur se produit lorsque ces dispositifs apprennent de leur utilisation spécifique et les uns des autres et adaptent leurs réponses en fonction de ce qu’ils apprennent." : "Intelligent connected devices serving artificially intelligent objects. The real value comes when these devices learn from their specific use and from each other and adapt their responses according to what they learn."}</p> : null
                        }
                        {
                            subject === 'software_development' ? <p className='paragraph aboutParaService1'>{lang === 'french' ? "De la conception du projet à la maintenance et à l’efficacité des ressources, nous avons besoin de systèmes reposant sur les principes de l’industrie 4.0 et 5.0, c’est pourquoi le développement et l'implémentation de logiciels innovants demeurent la base. " : "From project design to maintenance and resource efficiency, we need systems based on the principles of Industry 4.0 and 5.0, which is why the development and implementation of innovative software remains the foundation.  "}</p> : null
                        }
                        {
                            subject === 'mechanics' ? <p className='paragraph aboutParaService1'>{lang === 'french' ? "Dans le paysage dynamique d'aujourd'hui, où les avancées technologiques et l'évolution des demandes du marché façonnent les industries, nous comprenons l'importance cruciale d'une conception de qualité dans le développement des produits, et notre expertise réside dans la création de solutions innovantes qui excellent dans des domaines clés tels que la fiabilité, la fabricabilité, la sécurité, la modularité et la durabilité." : "In today's dynamic landscape, where technological advancements and evolving market demands are shaping industries, we understand the critical importance of quality design in product development, and our expertise lies in creating innovative solutions that excel in key areas such as Reliability, Manufacturability, Safety, Modularity and Sustainability."}</p> : null
                        }
                        {
                            subject === 'randd' ? <p className='paragraph aboutParaService1'>{lang === 'french' ? "Nous transformons vos idées en prototypes innovants et fonctionnels, tout en conservant une vision esthétique et industrielle de votre projet. Réactifs, nous réalisons certaines parties du prototype du produit dans nos ateliers et nous nous entourons de partenaires experts et réactifs pour les parties les plus complexes. Le dynamisme de cette phase est notre force, et nous aimons pouvoir itérer très rapidement sur des solutions que nous améliorons à chaque tour." : "We transform your ideas into innovative, functional prototypes, while maintaining an aesthetic and industrial vision of your project. Reactive, we create certain parts of the product prototype in our workshops and surround ourselves with expert and responsive partners for the most complex parts. Dynamism in this phase is our strength, and we like to be able to iterate very quickly on solutions that we improve with each round"}</p> : null
                        }

                    </div>
                    <div className='buttonPostion'>
                        {type === 'professional' ? <Link to={`/ServiceComplete/${subject}`} state={{ subject: subject }} ><button className='readButton' style={{}}>{content.servicePageDetail.learnMore[lang]}</button></Link> : <button className="readButton" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{content.servicePageDetail.learnMore[lang]}</button>}
                    </div>
                    <div>
                        <h2 className='articlesHeader' style={{ marginTop: '2vh', color: 'white' }}>{content.servicePageDetail.recent[lang]}</h2>
                        <div className='recentPosts'>
                            <div className='articleDetailCard' style={{ backgroundColor: '#283036', display: 'grid', gridTemplateColumns: '35% 65%', position: 'relative', width: '100%', borderRadius: '16px', height: '30%' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src='https://bondaf.com/media/images/pictures/Articles/AI.png' alt="AI Programing languages" style={{ height: '100%', position: 'relative', width: '100%', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }} />
                                </div>
                                <div className='postsCard' >
                                    <p className='postCardPara' style={{}}><i>Date: 31 May 2023.</i></p>
                                    <h5 className='postCardHeader' style={{}}>AI Development Challenges in OOP</h5>
                                    <p className='paragraph1 aboutParaService2' style={{}}>Artificial intelligence (AI) has come a long way in recent years, and as we continue to explore its vast
                                        potential, one thing is becoming increasingly clear: AI development brings with it a unique set of
                                        challenges. In the world of object-oriented programming (OOP), these challenges can be particularly
                                        complex. From navigating the intricacies of machine learning algorithms to grappling with issues
                                        surrounding data privacy and security, there's no shortage of obstacles for developers looking to leverage
                                        AI in their OOP projects. In this article, we'll take a closer look at some of the most significant challenges
                                        facing AI development in OOP today and explore some strategies for overcoming them. So buckle up &minus;
                                        we're about to dive deep into the exciting world of AI development!</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        {type === 'professional' ? <Link to="/blog/AI_Development" className='postCardLink' state={{ article: 'AI_Development' }}>{content.servicePageDetail.learnMore[lang]} {"->"}</Link> : <div className="postCardLink underline" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{lang === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                                    </div>

                                </div>
                            </div>
                            <div className='articleDetailCard' style={{ backgroundColor: '#283036', display: 'grid', gridTemplateColumns: '35% 65%', position: 'relative', width: '100%', borderRadius: '16px', marginTop: '10px', height: '30%' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src='https://bondaf.com/media/images/pictures/Articles/Embedded AI.png' alt="..." style={{ height: '100%', width: '100%', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }} />
                                </div>
                                <div className='postsCard' >
                                    <p className='postCardPara' style={{}}><i>Date: 23 June 2023</i></p>
                                    <h5 className='postCardHeader' style={{}}>What is Embedded AI?</h5>
                                    <p className='paragraph1 aboutParaService2'>We are living in an era where machine learning will eventually replace human learning. The research
                                        of robots and artificial intelligence has been introduced to make humans lives better, but to what extent
                                        can this be carried out? </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        {type === 'professional' ? <Link to="/blog/Embedded_AI" className='postCardLink' state={{ article: 'Embedded_AI' }}>{content.servicePageDetail.learnMore[lang]} {"->"}</Link> : <div className="postCardLink underline" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{lang === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                                    </div>

                                </div>
                            </div>
                            <div className='articleDetailCard' style={{ backgroundColor: '#283036', display: 'grid', gridTemplateColumns: '35% 65%', position: 'relative', width: '100%', borderRadius: '16px', marginTop: '10px', height: '35%' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src='https://bondaf.com/media/images/pictures/Articles/Factors to consider.png' alt="..." style={{ height: '100%', width: '100%', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }} />
                                </div>
                                <div className='postsCard' >
                                    <p className='postCardPara' style={{}}><i>Date: 24 June 2023.</i></p>
                                    <h5 className='postCardHeader capitalize' style={{}}>Factors to consider when determining the
                                        best programming language for a software
                                        project </h5>
                                    <p className='paragraph1 aboutParaService2'>Programming languages are the building blocks of any software project. Each one has its own
                                        unique strengths, and weaknesses. With so many options to choose from, determining the best
                                        programming language for a software project can be quite daunting. How do you know which
                                        one will be the most effective for your needs? In this article, we'll explore some key factors to
                                        consider that will help you make an informed decision about which programming language is
                                        right for your next project </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        {type === 'professional' ? <Link to="/blog/Factors_to_consider" className='postCardLink' state={{ article: 'Factors_to_consider' }}> {content.servicePageDetail.learnMore[lang]} {"->"}</Link> : <div className="postCardLink underline" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{lang === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                                    </div>

                                </div>
                            </div>

                            <div className='articleDetailCard' style={{ backgroundColor: '#283036', display: 'grid', gridTemplateColumns: '35% 65%', position: 'relative', width: '100%', borderRadius: '16px', marginTop: '10px', height: '35%' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src='https://bondaf.com/media/images/pictures/HW/Fermadur.png' alt="..." style={{ height: '100%', width: '100%', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }} />
                                </div>
                                <div className='postsCard' >
                                    <p className='postCardPara' style={{}}><i>Date: 12 July 2023.</i></p>
                                    <h5 className='postCardHeader capitalize' style={{}}>Electronic Potting </h5>
                                    <p className='paragraph1 aboutParaService2'>The aim of this article is to inform the industry about the complexities of potting printed circuit boards
                                        assembly (PCBAs). To do this, we share our potting experience with Polyurethane potting or Fermadur
                                        Henkle Sonderhoff's trade name and Sika potting, for example.</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        {type === 'professional' ? <Link to="/blog/Electronic_Potting" className='postCardLink' state={{ article: 'Electronic_Potting' }}> {content.servicePageDetail.learnMore[lang]} {"->"}</Link> : <div className="postCardLink underline" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{lang === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                                    </div>

                                </div>
                            </div>
                            <div className='articleDetailCard' style={{ backgroundColor: '#283036', display: 'grid', gridTemplateColumns: '35% 65%', position: 'relative', width: '100%', borderRadius: '16px', marginTop: '10px', height: '35%' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src='https://bondaf.com/media/images/pictures/Articles/STM32-best-for-industry.png' alt="..." style={{ height: '100%', width: '100%', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }} />
                                </div>
                                <div className='postsCard' >
                                    <p className='postCardPara' style={{}}><i>Date: 17 July 2023.</i></p>
                                    <h5 className='postCardHeader capitalize' style={{}}>STM32 the best microcontroller for industry </h5>
                                    <p className='paragraph1 aboutParaService2'>The STM32 microcontroller is indeed one of the best and most widely used microcontroller series in the
                                        industry. Although it is difficult to say that one microcontroller is the best for all applications, the STM32
                                        series offers a wide range of features, performance levels and development tools that make it a
                                        compelling choice for many projects. </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        {type === 'professional' ? <Link to="/blog/STM32_the_best_microcontroller_for_industry" className='postCardLink' state={{ article: 'STM32_the_best_microcontroller_for_industry' }}> {content.servicePageDetail.learnMore[lang]} {"->"}</Link> : <div className="postCardLink underline" onClick={() => alert(lang === 'french' ? "Désolé, vous n'êtes pas autorisé à continuer, votre institution n'est pas reconnue. Veuillez continuer à consulter la page des carrières pour trouver d'autres emplois." : "Sorry, you are not allowed to continue, your institution is not recognised. Please continue to the careers page to find other jobs.")}>{lang === 'french' ? "En Savoir Plus" : "Read More"}</div>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
