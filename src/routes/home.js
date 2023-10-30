import React, { useState } from 'react'


import AOS from 'aos';
import 'aos/dist/aos.css';


import content from "./content.json";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import myVideo from '../assets/videos/video.mp4';
import axios from 'axios';


export default function Home() {

    const [lang, setLang] = useState("french");
    const navigate = useNavigate();
    localStorage.setItem('isValid', '')
    const [error, setError] = useState(null);


    AOS.init()
    const [email, setEmail] = useState('');
    const [isCheck, setIsCheck] = useState(false)
    async function handleSubmit(event) {
        event.preventDefault()
        localStorage.setItem("email", email);
        const email_value = email;
        let val = '';
        const mailDomains = ['protonmail', 'aolmail', 'zohomail', 'hustmail', 'outlook', 'kolabnow', 'lucos', 'counter', 'gmx', 'icloud', 'fastmail', 'aweber', 'tutanota', 'mailfence', 'posteo', 'mozillathunderbird', 'sendinblue', 'startmail', 'minutemail', 'gmail', 'yahoo', 'outlook', 'hotmail']

        for(let i = 0;i<mailDomains?.length; i++){
            console.log("email_value?.includes(item)",email_value?.includes(mailDomains[i]))
            if ((email_value?.includes(mailDomains[i]))) {
                console.log("casual");
                val = 'casual';
                break;
            } else {
                console.log("professional")
                val = 'professional'
            }
        }

        localStorage.setItem("visitorType", val);

        // fetch('https://bondaf-api.azurewebsites.net//visitors/add', {
        //     method: 'POST',
        //     body: {
        //         "email": event.target[0].value,
        //         "visitorType": val
        //     }
        // }).then(res => {
        //     console.log('visitor', res)
        // })
        axios.post('https://bondaf-api.azurewebsites.net/visitors/add', {
            "email": email,
            "visitorType": val
        }).then(function (response) {
            console.log(response);
            if (response) {
                if (val === 'professional'){
                    if (localStorage.getItem("redirect") === '' || localStorage.getItem("redirect") === null || localStorage.getItem("redirect") === undefined){
                        navigate('/services', { replace: true });
                    }else{
                        navigate(localStorage.getItem("redirect"), { replace: true });
                    }
                } else{
                    if (localStorage.getItem("redirect") === '' || localStorage.getItem("redirect") === null || localStorage.getItem("redirect") === undefined){
                        navigate('/about', { replace: true });
                    }else{
                        navigate(localStorage.getItem("redirect"), { replace: true });
                    }
                }
            }
        })
            .catch(function (error) {
                // console.log(error)
                alert(error?.message);
            });

        // await db.collection("customersData").add({
        //     email: event.target[0].value,
        // });

        // let val = "professional";
        // let email = localStorage.getItem("email")
        // if (!email) {
        //     val = "casual";
        // }

        // let vals = ["gmail", "yahoo"]
        // for (let i = 0; i < vals.length; i++) {
        //     if (email.includes(vals[0])) {
        //         val = "casual"
        //     }
        // }

        // if (val === "professional") {
        //     navigate('/services', { replace: true });
        // }
        // else {
        //     navigate('/about', { replace: true });
        // }

    }

    let dt = new Date();
    function isValidEmail(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }
    const setEmailValue = (e) => {
        if (!isValidEmail(e.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
        setEmail(e.target.value)
    }

    return (
        <div className='lg:h-screen h-full lg:grid lg:grid-cols-7 grid grid-cols-1'>
            <div className='homeBgLeft lg:h-auto h-96 lg:col-span-4'>
                <video autoPlay muted loop id="video" className="homeVideo">
                    <source src='https://bondaf.com/media/videos/Presentation/Bondaf-Intro.mp4' type="video/mp4" />
                </video>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
                    <div className='home-header lg:mt-[3vw] mt-[8px]'>Engineering <br /> R&amp;D <br />
                    </div>
                    <div className='home-list lg:mt-[5vw] mt-[10px]'>
                        Consultancy firm specializing in technology of highest standards
                        {/* <div>Électroniques</div>
                        <div>Systèmes Embarqués</div>
                        <div>Développement de Logiciels</div>
                        <div>Mécaniques</div> */}
                    </div>

                </div>
            </div>
            <div className='lg:col-span-3 relative h-auto grid grid-rows-3 '>
                <div className='row-span-2 grid grid-rows-2'>
                    <div className='flex flex-row items-center justify-center'>
                        <img src='https://bondaf.com/media/images/logo/Logo%20symbol+text%20vertical%20-%20dark.svg' className='contactImage' alt='logo with name' />
                    </div>
                    <form className='flex flex-col justify-end' onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <input type="email" className="form-control emailInput" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmailValue(e)} placeholder='Email' pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" required="true" />
                            {/* {error && email !='' ? <p style={{color: 'red'}}>{error}</p>:''} */}
                            <div className='emailInputPrompt flex items-center justify-center'>
                                <input className="form-check-input checkboxInput " type="checkbox" checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} id="defaultCheck1" required="true" />
                                <label className="form-check-label interFont paragraph1 text-black" htmlFor="" style={{ marginLeft: 12 }}>
                                    <a href='https://legal.bondaf.com/cgu-en' target="_blank" className='text-gray-500'>I agree to the terms and conditions and the privacy policy</a>
                                </label>
                            </div>
                        </div>
                        <button className="custom-btn">Next</button>
                    </form>
                </div>
                <div className=' w-full absolute bottom-10'>
                    <div className=' flex items-center justify-center'>
                        <Link to="/" style={{ textDecoration: "none" }} >
                            <div className='flex items-center justify-center mr-3'>
                                <div className=' flex items-center font-semibold'><span className='lg:text-[1.7vw] text-2xl  text-[#3399FF]'>©</span> &nbsp; <span className="lg:text-[1vw] text-base capitalize" style={{ color: 'black' }}> copyright</span></div>
                                <img src={require('../assets/logo_symbol_text_light.png')} className="footerIMG1" alt='logo symbol with text' />
                                <p className="h-full mt-3 flex font-semibold lg:text-[1.2vw] text-lg  items-center justify-center text-[#3399ff]">{dt.getFullYear()}</p>
                            </div>
                        </Link>
                        <a href='https://www.linkedin.com/company/bond-af/' target='_blank'><img src='https://bondaf.com/media/images/logo/linkedin-btn.png' alt='linked in' className='shareIcons' /></a>
                        {/* <a href='https://twitter.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/twitter-btn.png' className='shareIcons' /></a> */}

                        {/* <a href='https://www.facebook.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/fb-btn.png' className='shareIcons' /></a> */}
                        <a href='https://youtu.be/vq7OeFXlyWw' target='_blank'><img src='https://bondaf.com/media/images/logo/youtube-btn.png' alt='you tube' className='shareIcons' /></a><br />






                    </div>
                </div>

            </div>
        </div>
        //         <Container fluid style={{ width: '100%', background: 'black' }}>
        //             <div className="row homeMain" style={{ background: '#EEEFF2', padding:'0px 20px' }}>
        //                 <div className="col-md-7 homeBgLeft" >
        //                     <video autoPlay muted loop id="video" className="homeVideo">
        //                         <source src={myVideo} type="video/mp4" />

        //                     </video>
        //                     <div className="overlay">
        //                         <blockquote data-aos="fade-up" data-aos-delay="100">
        //                             <p className="homeElHead" style={{ fontSize: 50, fontStyle: 'bold !important', fontWeight: 600, paddingLeft: '10%', paddingRight: '10%', lineHeight: 1.35, marginTop: '25%' }}>{content.homePage.p1[lang]}</p>
        //                         </blockquote>
        //                         <div className="row">
        //                             <div className="col-md-12" >
        //                                 <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 36, fontWeight: 600 }}>{content.homePage.electronics[lang]}</h2>
        //                                 <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 36, fontWeight: 600 }}>{content.homePage.embedded[lang]}</h2>
        //                                 <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 36, fontWeight: 600 }}>{content.homePage.software[lang]}</h2>
        //                                 <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 36, fontWeight: 600 }}>{content.homePage.mechanics[lang]}</h2>

        //                             </div>
        //                         </div>
        //                     </div>



        //                     {/* <blockquote data-aos="fade-up" data-aos-delay="100">
        //                         <p style={{ fontSize: 42, fontWeight: 400, paddingLeft: '12%', paddingRight: '12%', lineHeight: 1.35, marginTop: 20 }}>{content.homePage.p1[lang]}</p>
        //                     </blockquote>
        //                     <div className="row">
        //                         <div className="col-md-12" >
        //                             <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 32, fontWeight: 600 }}>{content.homePage.electronics[lang]}</h2>
        //                             <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 32, fontWeight: 600 }}>{content.homePage.embedded[lang]}</h2>
        //                             <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 32, fontWeight: 600 }}>{content.homePage.software[lang]}</h2>
        //                             <h2 className="homeEl" data-aos="fade-up" data-aos-delay='100' style={{ fontSize: 32, fontWeight: 600 }}>{content.homePage.mechanics[lang]}</h2>

        //                         </div>
        //                     </div> 
        //                     */}
        //                 </div>
        //                 <div className="col-md-5 homeBgRight">
        // <div className='flex items-center justify-center'>
        // <img src={require('../assets/logo_symbol_text_light.svg').default} style={{ marginTop: 20, width: 200 }} />

        // </div>
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="form-group">
        //                             <input type="email" className="form-control emailInput" id="email" aria-describedby="emailHelp" placeholder={content.homePage.email[lang]} pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" required="true" />
        //                             <div className='emailInputPrompt'>
        //                                 <input className="form-check-input " type="checkbox" value="" id="defaultCheck1" required="true" />
        //                                 <label className="form-check-label interFont" htmlFor="defaultCheck1" style={{ marginLeft: 12 }}>
        //                                     {content.homePage.agree[lang]}
        //                                 </label>
        //                             </div>
        //                         </div>

        //                         <button type="submit" className="custom-btn" style={{ maxWidth: 405 }}>{content.homePage.next[lang]}</button>
        //                     </form>
        //                     <div className="flex flex-row items-center justify-center relative top-8">
        //                         <Link to="/" style={{ textDecoration: "none" }} className='flex flex-row items-center justify-center'>
        //                             <img src={require('../assets/cr.png')} style={{ marginRight: 5, cursor: 'pointer' }} /> <span className="homeFooterCP" style={{ color: "#555", fontSize: 14 }}>COPYRIGHT</span>
        //                             <img src={require('../assets/logo_symbol_text_light.png')} className="homeFooterImg" style={{ marginRight: 5, cursor: 'pointer', width: 100 }} />
        //                             <p className="copyRightYear mt-3">{dt.getFullYear()}</p>
        //                         </Link>
        //                         <img src={require('../assets/linkedin-btn.png')} className="homeFooterSL" style={{ marginRight: 16, cursor: 'pointer', width: 24 }} />
        //                         <img src={require('../assets/twitter-btn.png')} className="homeFooterSL" style={{ marginRight: 16, cursor: 'pointer', width: 24 }} />

        //                         <img src={require('../assets/fb-btn.png')} className="homeFooterSL" style={{ marginRight: 16, cursor: 'pointer', width: 24 }} />
        //                         <img src={require('../assets/youtube-btn.png')} className="homeFooterSL" style={{ marginRight: 16, cursor: 'pointer', width: 24 }} />
        //                     </div>
        //                 </div>

        //             </div>

        //         </Container>
    )
}
