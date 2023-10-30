import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import content from "../routes/content.json";
import { FaHandsHelping, FaBars } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'

export default function BoundHeader() {
    let langPref = localStorage.getItem("langPref") === 'english' ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);
    let val = localStorage.getItem("visitorType");
    const location = useLocation()
    const ref_input = useRef(null);
    let servicesClass = location.pathname === "/services" ? "active" : "";
    let aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    let careerClass = location.pathname.match(/^\/career/) ? "active" : "";
    let contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const navigate = useNavigate();
    let email = localStorage.getItem("email")
    localStorage.setItem('langPref', langPref)


    localStorage.setItem('path', location.pathname)

    useEffect(() => {
        ref_input.current.addEventListener("change", (event) => handler(event))
        return () => { };
    })
    const v = localStorage.getItem('isValid');
    const [isValidUser, setIsValidUser] = useState(v);
    useEffect(() => {
        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            console.log("is valis", localStorage.getItem('isValid'))
            setIsValidUser(localStorage.getItem('isValid'))
        });
    }, [])


    const handler = (e) => {
        // e.preventDefault();

        let langVal;
        if (lang === "french") {
            langVal = "english";
        }
        else {
            langVal = "french";

        }
        localStorage.setItem("langPref", langVal);
        window.dispatchEvent(new Event("storage"));
        setLang(langVal);
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const userNavigation = [
        { name: 'Your profile' },
        { name: 'Sign out' },
    ]

    const signOutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('email');
        localStorage.setItem('isValid', 'inValid');
        localStorage.removeItem('isPreview');
        navigate('/', { replace: true });
        window.dispatchEvent(new Event("storage"));

    }
    // console.log("value", val)
    return (
        <div style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: (location.pathname === '/' || location.pathname === '/verification') ? 'none' : 'flex' }} className={location.pathname.includes('/ServiceDetail') || location.pathname.includes('/ServiceComplete') ? 'blackBG' : 'whiteBG '}>
            <div style={{}}>
                <Link to="/about"><img src='https://bondaf.com/media/images/logo/Logo%20text%20-%20dark.png' className='bondaflogo' alt='logo' /></Link>

            </div>
            <div className='showNav'>
                {val !== "casual" && <Link to="/services" style={{ textDecoration: 'none', color: '#6E757C', }} className={`${servicesClass} paragraph2`}>{content.headers.menus.services[lang]}</Link>}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/about" style={{ textDecoration: 'none', color: '#6E757C', }} className={`${aboutClass} paragraph2`}>{content.headers.menus.aboutUs[lang]}</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {val === "casual" && <Link to="/career" style={{ textDecoration: 'none', color: '#6E757C', }} className={`${careerClass} paragraph2`}>{content.headers.menus.career[lang]}</Link>}

            </div>
            <div style={{ marginRight: '1vw', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                    <div className='showNav' >
                        <div className='show'>
                            <div style={{ display: (val === 'casual' ? 'none' : '') }}>
                                <select value={lang} onChange={(e) => setLang(e.target.value)} ref={ref_input} className={`border-none w-[5vw] text-[1.2vw] focus:outline-none focus:border-none focus:ring-0 bg-transparent flex items-center ${location.pathname.includes('/ServiceDetail') || location.pathname.includes('/ServiceComplete') ? 'text-white' : 'text-black'}`}>
                                    <option value='french'>FR</option>
                                    <option value='english'>EN</option>
                                </select>
                            </div>
                            <div style={{ width: '14vw' }}>
                                {val !== "casual" && <Link to="/contact" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.11vw', backgroundColor: '#3399FF', padding: '0.7vw', borderRadius: '1.11vw' }}> <FaHandsHelping style={{ marginRight: '0.5vw' }} />{content.headers.menus.getInTouch[lang]}</Link>}
                            </div>
                        </div>
                    </div>
                    <div className='hide'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <FaBars size="26" style={{ float: 'right', color: location.pathname.includes('/ServiceDetail') || location.pathname.includes('/ServiceComplete') ? 'white' : 'black', cursor: 'pointer' }} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='headerRespDd'>

                                {val !== "casual" && <Dropdown.Item className={servicesClass}><Link to="/services" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.services[lang]}</Link></Dropdown.Item>}
                                <Dropdown.Item className={aboutClass}><Link to="/about" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.aboutUs[lang]}</Link></Dropdown.Item>
                                {val === "casual" && <Dropdown.Item className={careerClass}><Link to="/career" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.career[lang]}</Link></Dropdown.Item>}
                                {val !== "casual" && <Dropdown.Item className={contactClass}><Link to="/contact" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.getInTouch[lang]}</Link></Dropdown.Item>}
                                {val !== "casual" && <Dropdown.Item onClick={(e) => handler(e)} id="langDD"><Link style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }}>Switch to {langPref === "french" ? "EN" : "FR"}</Link></Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {isValidUser === 'valid' ? <div>


                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <span className="h-12 lg:h-[3.2vw] w-12 lg:w-[3.2vw] flex items-center justify-center text-base lg:text-[1.3vw] font-semibold rounded-full bg-gray-200">
                                <svg className="h-8 lg:h-[2vw] lg:w-[2vw] w-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                            <span className="hidden lg:flex lg:items-center">

                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-auto  origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">

                                {({ active }) => (
                                    <div>
                                        <div
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'flex flex-row px-[8px] py-[8px] lg:py-[1vw] lg:px-[2vw] lg:text-[1vw] text-[13px] leading-6 text-gray-900 cursor-default'
                                            )}
                                        >
                                            <span>Hi</span>
                                            <span className='font-semibold lg:ml-[0.6vw] ml-[3px] lg:text-[1vw] text-[16px]'>{email}</span>
                                        </div>
                                        <div onClick={(e) => signOutHandler(e)}
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'block px-[8px] py-[8px] lg:py-[1vw] lg:px-[2vw] lg:text-[1vw] text-[13px] leading-6 hover:bg-gray-100 text-gray-900 cursor-pointer'
                                            )}>Log out</div>
                                    </div>
                                )}

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div> : null}
            </div>

        </div>
    )
}
