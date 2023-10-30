import React from 'react'


import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const location = useLocation()
    const navigate = useNavigate();

    let servicesClass = location.pathname === "/services" ? "active" : "";
    let aboutClass = location.pathname.match(/^\/about/) ? "active" : "";

    const servicesCheck = location.pathname.includes('/ServiceDetail') || location.pathname === "/servicecomplete" ? true : false;
    let backgroundClr = "#1E1E1E";
    let hrClr = "#748FB5";
    let ftClr = "#555";
    if (servicesCheck) {
        backgroundClr = "#1E1E1E";
        servicesClass = servicesClass + " checking";
        aboutClass = aboutClass + " checking";
        hrClr = "#748FB5";
        ftClr = "#748FB5";
    }
    let dt = new Date();
    const handle = (e) => {
        // e.preventDefault();
        localStorage.removeItem("email");
        localStorage.removeItem("visitorType");
        localStorage.removeItem("path");
        localStorage.removeItem("langPref");
        localStorage.removeItem('isValid');
        localStorage.removeItem('isPreview');
        navigate('/', { replace: true });
        window.location.reload();
    }

    return (
        <div className={location.pathname === '/services' ? 'md:fixed w-full md:bottom-0' : ''}>
            <div style={{ display: location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/verification' ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className={location.pathname.includes('/ServiceDetail') || location.pathname.includes('/ServiceComplete') ? 'blackBG row' : 'whiteBG row '}>

                {/* <hr style={{ width: '85%', color: hrClr }} /> */}


                <div style={{ textAlign: 'center' }} className='flex  items-center justify-center'>
                    <div onClick={(e) => handle(e)} style={{ textDecoration: "none" }} >
                        <div className='flex items-center justify-center lg:mr-[1.2vw] mr-4'>
                            <div className='flex items-center font-semibold '><span className='lg:text-[1.7vw] text-2xl mt-1 text-[#3399FF]'>&#169;</span> <span className="lg:text-[1vw] text-base capitalize" style={{ color: '#555' }}>copyright</span></div>
                            <img src='https://bondaf.com/media/images/logo/Logo%20symbol+text%20horizontal%20-%20dark.svg' className="footerIMG1" alt='logo' />
                            <p className="h-full mt-3 flex font-semibold lg:text-[1.2vw] text-lg  items-center justify-center text-[#3399FF]">{dt.getFullYear()}</p>
                        </div>
                    </div>
                    <a href='https://www.linkedin.com/company/bond-af/' target='_blank'><img src='https://bondaf.com/media/images/logo/linkedin-btn.png' className='shareIcons' /></a>
                    {/* <a href='https://twitter.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/twitter-btn.png' className='shareIcons' /></a> */}

                    {/* <a href='https://www.facebook.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/fb-btn.png' className='shareIcons' /></a> */}
                    <a href='https://youtu.be/vq7OeFXlyWw' target='_blank'><img src='https://bondaf.com/media/images/logo/youtube-btn.png' className='shareIcons' /></a><br />


                </div>

            </div>
        </div>
    )
}
