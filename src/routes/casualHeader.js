import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import content from "./content.json";
import { FaHandsHelping, FaBars } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
// import {
//   Bars3Icon,
//   BellIcon,
//   CalendarIcon,
//   ChartPieIcon,
//   Cog6ToothIcon,
//   DocumentDuplicateIcon,
//   FolderIcon,
//   HomeIcon,
//   UsersIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
export default function CasualHeader() {
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

    // let val = "professional";
    localStorage.setItem('langPref', langPref)
    // if (!email) {
    //     val = "casual";
    // }

    localStorage.setItem('path', location.pathname)
    // let vals = ["gmail", "yahoo"]
    // for (let i = 0; i < vals.length; i++) {
    //     if (email.includes(vals[0])) {
    //         val = "casual"
    //     }
    // }
    useEffect(() => {
        ref_input.current.addEventListener("change", (event) => handler(event))
        return () => { };
    })
    let isvalid = localStorage.getItem('isValid');
    const [isValidUser, setIsValidUser] = useState(isvalid);

    console.log("is valis", localStorage.getItem('isValid'), isValidUser)

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
        localStorage.removeItem('isValid');
        localStorage.removeItem('isPreview');
        navigate('/', { replace: true });
        window.location.reload();

    }
    // console.log("value", val)
    return (
        <div style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: (location.pathname === '/' || location.pathname === '/verification') ? 'none' : 'flex' }} className={location.pathname === '/ServiceDetail' || location.pathname === '/ServiceComplete' ? 'blackBG' : 'whiteBG '}>
            <div style={{}}>
                <Link to="/about"><img src='https://bondaf.com/media/images/logo/Logo%20text%20-%20dark.png' className='bondaflogo' alt='logo' /></Link>

            </div>
            <div className='showNav'>

                <Link to="/about" style={{ textDecoration: 'none', color: '#6E757C', }} className={`${aboutClass} paragraph1`}>{content.headers.menus.aboutUs[lang]}</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {val === "casual" && <Link to="/career" style={{ textDecoration: 'none', color: '#6E757C', }} className={`${careerClass} paragraph1`}>{content.headers.menus.career[lang]}</Link>}

            </div>
            <div style={{ marginRight: '1vw', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                    <div className='showNav' >
                        <div className='show'>
                            <div className='switch' style={{ display: (val === 'casual' ? 'none' : '') }}>
                                <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" ref={ref_input} />
                                <label htmlFor="language-toggle"></label>
                                <span className="on"><div className={val === 'professional' ? "switchContentProf" : "switchContentCasual"} >FR</div></span>
                                <span className="off"><div className={val === 'professional' ? "switchContentProf" : "switchContentCasual"} >EN</div></span>
                            </div>

                        </div>
                    </div>
                    <div className='hide'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <FaBars size="26" style={{ float: 'right', color: location.pathname === '/ServiceDetail' || location.pathname === '/ServiceComplete' ? 'white' : 'black', cursor: 'pointer' }} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='headerRespDd'>

                                <Dropdown.Item className={aboutClass}><Link to="/about" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.aboutUs[lang]}</Link></Dropdown.Item>
                                <Dropdown.Item className={careerClass}><Link to="/career" style={{ textDecoration: 'none', color: '#1E2125', paddingRight: '30%' }} >{content.headers.menus.career[lang]}</Link></Dropdown.Item>

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
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">

                                {({ active }) => (
                                    <div>
                                        <span
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                                            )}
                                        >
                                            HI
                                        </span>
                                        <span onClick={(e) => signOutHandler(e)}
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'block px-3 py-1 text-sm leading-6 hover:bg-gray-100 text-gray-900 cursor-pointer'
                                            )}>Log out</span>
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
