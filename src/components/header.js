import React, { useState, useEffect, useRef, useCallback } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import MenuItem from 'react-bootstrap/DropdownMenu';
import { useLocation } from "react-router-dom"
import { FaHandshake, FaHandsHelping, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

import content from "../routes/content.json";

import '../assets/css/carousel.scss';


export default function Header() {
    let langPref = localStorage.getItem("langPref") ==='english' ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);
    const [checked, setChecked] = useState(false);

    const ref_input = useRef(null);
    const location = useLocation()

    let servicesClass = location.pathname === "/services" ? "active" : "";
    let aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    let careerClass = location.pathname.match(/^\/career/) ? "active" : "";

    console.log("service class: ", servicesClass, aboutClass);
    let val = "professional";
    let email = localStorage.getItem("email")
    if (!email) {
        val = "casual";
    }

localStorage.setItem('path',location.pathname)
    let vals = ["gmail", "yahoo"]
    for (let i = 0; i < vals.length; i++) {
        if (email.includes(vals[0])) {
            val = "casual"
        }
    }



    const servicesCheck = location.pathname === "/servicedetail" || location.pathname === "/servicecomplete" ? true : false;
    let backgroundClr = "#1E1E1E";
    let ftClr = "#1E1E1E";
    let theme = "light";
    if (servicesCheck) {
        backgroundClr = "#1E1E1E";
        ftClr = "#EEEFF2";
        servicesClass = servicesClass + " checking";
        aboutClass = aboutClass + " checking";
        careerClass = careerClass + " checking";
        theme = "dark";
    }

    function handleLangChange(e, langVal) {
        e.preventDefault();
        localStorage.setItem("langPref", langVal);
        setLang(langVal);
        window.dispatchEvent(new Event("storage"));
    }

    useEffect(() => {
        ref_input.current.addEventListener("change", function (event) {
            setChecked(event.target.checked);
            let langVal;
            if (event.target.checked) {
                langVal = "english";
            }
            else {
                langVal = "french";
            }
            localStorage.setItem("langPref", langVal);
            window.dispatchEvent(new Event("storage"));
            setLang(langVal);
        });

        return () => { };
    }, []);

    const handleClick2 = useCallback(() => {
        console.log("setting lang", checked);
        let nv = !checked;
        setChecked(!nv);
        console.log("setting lang", nv);
    }, []);

    const handleClick = () => setChecked(!checked);

    function switchLanguage(e) {

        console.log("switching", e);
        e.preventDefault();

        ref_input.current = !ref_input.current;

        // setChecked(checked);
        // let langVal;
        // if(lang==="french"){ 
        //     setChecked(false);
        // }
        // else{ 
        //     setChecked(true);
        // }
        // localStorage.setItem("langPref", langVal);
        // window.dispatchEvent(new Event("storage"));
        // setLang(langVal);



    }
console.log("location ->>>>",location)

    {/* <img src={require('../assets/Icons.svg').default} className="serviceCompleteImg2" /> */ }
    return (
        <div  style={{ width: '100%', margin: 0, padding: 0, position: 'sticky', top: 0, zIndex: 10000, display: location.pathname !== '/' ? 'block':'none' }} className={location.pathname === '/ServiceDetail' || location.pathname === '/ServiceComplete' ? 'blackBG' : 'whiteBG '}>
            <div className=" headerstyle"  >
                <header style={styles.headerContainer} >
                    <div className='logo' style={styles.leftContainer}>
                        <Link to="/about"><img src={require('../assets/logo_text_light.svg').default} style={{ marginTop: 5, height: 100 }} className="headerLogo" /></Link>
                    </div>
                    <Navbar style={styles.centerContainer} className='headerCenterContainer'>
                        <Nav className='m-auto'>
                            {val !== "casual" && (<NavLink to="/services" style={{ textDecoration: 'none', color: '#6E757C' ,fontSize:'1.11vw'}} className={servicesClass}>{content.headers.menus.services[lang]}</NavLink>)}
                            
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <NavLink to="/about" style={{ textDecoration: 'none', color: '#6E757C',fontSize:'1.11vw' }} className={aboutClass}>{content.headers.menus.aboutUs[lang]}</NavLink>
                            
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            {val === "casual" && (<NavLink to="/career" style={{ textDecoration: 'none', color: '#6E757C',fontSize:'1.11vw' }} className={careerClass}>{content.headers.menus.career[lang]}</NavLink>)}

                        </Nav>
                    </Navbar>
                    <div style={styles.rightContainer} >
                        <div className='headerRightContainer'>
                            <div className="switch">
                                <input id="language-toggle"  className="check-toggle check-toggle-round-flat" type="checkbox" ref={ref_input} />
                                <label htmlFor="language-toggle"></label>
                                <span className="on"><div className="switchContent" >FR</div></span>
                                <span className="off"><div className="switchContent" >EN</div></span>
                            </div>

                            {val !== "casual" && (<Link to="/contact" style={{ float: 'right', display: 'inline' }}><button as={Link} to="/contact" className="headerContact" style={{ maxWidth: 405 }}><FaHandsHelping size="26" style={{ marginRight: 8 }} />{content.headers.menus.getInTouch[lang]}</button></Link>)}
                        </div>
                        <div className="responsiveMenuTab">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <FaBars size="26"  style={{ marginRight: 8, float: 'right', marginTop: 24, color:location.pathname === '/ServiceDetail' || location.pathname === '/ServiceComplete' ? 'white':'black', cursor: 'pointer' }} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='headerRespDd'>
                                    {val !== "casual" && <Dropdown.Item ><Link to="/services" style={{ textDecoration: 'none', color: '#1E2125' }}>{content.headers.menus.services[lang]}</Link></Dropdown.Item>}
                                    <Dropdown.Item><Link to="/about" style={{ textDecoration: 'none', color: '#1E2125' }}>{content.headers.menus.aboutUs[lang]}</Link></Dropdown.Item>
                                    {val === "casual" && <Dropdown.Item><Link to="/career" style={{ textDecoration: 'none', color: '#1E2125' }}>{content.headers.menus.career[lang]}</Link></Dropdown.Item>}
                                    {val !== "casual" && <Dropdown.Item><Link to="/contact" style={{ textDecoration: 'none', color: '#1E2125' }}>{content.headers.menus.getInTouch[lang]}</Link></Dropdown.Item>}
                                    <Dropdown.Item onClick={(e) => { handleClick2() }} id="langDD"><Link style={{ textDecoration: 'none', color: '#1E2125' }}>Switch to {langPref === "french" ? "EN" : "FR"}</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </header>



                {/* <div className="col-md-2">
                    <Link to="/about"><img src={require('../assets/logo_text_light.svg').default} style={{ marginTop: 5, height: 100 }} className="headerLogo" /></Link>
                </div>
                <div className="col-md-6 ">
                    <div className='bondafMenu'>
                        <Navbar className='bondafNavbar'>
                            <Nav className='m-auto'>
                                <NavLink to="/services" style={{ textDecoration: 'none', color: '#6E757C' }} className={servicesClass}>{content.headers.menus.services[lang]}</NavLink>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <NavLink to="/about" style={{ textDecoration: 'none', color: '#6E757C' }} className={aboutClass}>{content.headers.menus.aboutUs[lang]}</NavLink>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {val === "casual" && (<NavLink to="/career" style={{ textDecoration: 'none', color: '#6E757C' }} className={careerClass}>{content.headers.menus.career[lang]}</NavLink>)}
                            </Nav>
                        </Navbar>
                    </div>
                </div>

                <div className="col-md-4" >
                    <div className="responsiveMenuTab">
                        <FaBars size="26" style={{ marginRight: 8, float: 'right', marginTop: 24 }} />
                    </div>
                    <div className='bondafLangSwitch'>
                        {val !== "casual" && (<Link to="/contact" style={{ float: 'right', display: 'inline' }}><button as={Link} to="/contact" className="headerContact" style={{ maxWidth: 405 }}><FaHandsHelping size="26" style={{ marginRight: 8 }} />{content.headers.menus.getInTouch[lang]}</button></Link>)}
                        <Nav className="langPrefDropDown">
                            <div className="switch">
                                <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" ref={ref_input} />
                                <label htmlFor="language-toggle"></label>
                                <span className="on"><img src={require('../assets/FR.png')} className="switchContent" /></span>
                                <span className="off"><img src={require('../assets/EN.png')} className="switchContent" /></span>
                            </div>
                            <img className="dp1" src={require('../assets/FR.png')} /><input id="toggle_switch" name="toggle_switch" type="checkbox" />
                        <label htmlFor="toggle_switch"></label>
                        <img className="dp2" src={require('../assets/EN.png')} />

                            <Dropdown className="langPrefDropDownToggle">
                            <Dropdown.Toggle >
                                {lang === "french" && <img className="dropDownIcon" src={require('../assets/FR.png')} />}
                                {lang === "english" && <img className="dropDownIcon" src={require('../assets/EN.png')} />}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="langPrefDropDownMenu">
                                {lang !== "english" && <Dropdown.Item href="#/action-1" onClick={(e) => { handleLangChange(e, "english") }}><img src={require('../assets/EN.png')} /></Dropdown.Item>}
                                {lang !== "french" && <Dropdown.Item href="#/action-1" onClick={(e) => { handleLangChange(e, "french") }}><img src={require('../assets/FR.png')} /></Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>

                        </Nav>
                    </div>

                </div> */}
            </div >
        </div >
    )
}


const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    leftContainer: {},
    logo: {
        height: '40px',
    },
    centerContainer: {
        display: 'flex',
    },
    rightContainer: {},
    button: {
        backgroundColor: '#2196f3',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};