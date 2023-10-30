import React, { useState, useEffect, Fragment, useRef } from 'react'
import { FaTelegramPlane, FaRegCalendar, FaMapMarkerAlt, FaPhoneAlt, FaPrint } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import content from "./content.json";
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { Dialog, Transition } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);


const initialTimes = [
    {
        id: "10:0",
        slot: "10:00AM - 10:30AM",
        seconds: 10 * 3600,
        isAvailable: false
    },
    {
        id: "10:30",
        slot: "10:30AM - 11:00AM",
        seconds: 10 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "11:0",
        slot: "11:00AM - 11:30AM",
        seconds: 11 * 3600,
        isAvailable: false
    },
    {
        id: "11:30",
        slot: "11:30AM - 12:00PM",
        seconds: 11 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "12:0",
        slot: "12:00PM - 12:30PM",
        seconds: 12 * 3600,
        isAvailable: false
    },
    {
        id: "12:30",
        slot: "12:30PM - 01:00PM",
        seconds: 12 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "13:0",
        slot: "01:00PM - 01:30PM",
        seconds: 13 * 3600,
        isAvailable: false
    },
    {
        id: "13:30",
        slot: "01:30PM - 02:00PM",
        seconds: 13 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "14:0",
        slot: "02:00PM - 02:30PM",
        seconds: 14 * 3600,
        isAvailable: false
    },
    {
        id: "14:30",
        slot: "02:30PM - 03:00PM",
        seconds: 14 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "15:0",
        slot: "03:00PM - 03:30PM",
        seconds: 15 * 3600,
        isAvailable: false
    },
    {
        id: "15:30",
        slot: "03:30PM - 04:00PM",
        seconds: 15 * 3600 + 1800,
        isAvailable: false
    },
    {
        id: "16:0",
        slot: "04:00PM - 04:30PM",
        seconds: 16 * 3600,
        isAvailable: false
    },
    {
        id: "16:30",
        slot: "04:30PM - 05:00PM",
        seconds: 16 * 3600 + 1800,
        isAvailable: false
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Contact() {
    const [templateData, setTemplateData] = useState('')
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");

    const [nameReq, setNameReq] = useState(false);
    const [companyReq, setCompanyReq] = useState(false);
    const [mobileReq, setMobileReq] = useState(false);
    const [subReq, setSubReq] = useState(false);
    const [messageReq, setMessageReq] = useState(false);

    const location = useLocation();


    const [open, setOpen] = useState(false)
    let langPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);
    const [startDate, setStartDate] = useState();

    let email = localStorage.getItem('email');

const navigate = useNavigate();
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
    
    const mailId = localStorage.getItem("email");

    const handleEditorChange = (value) => {
        setTemplateData(value);
        setMessageReq(false);

    };

    const submitMailData = async (e) => {
        e.preventDefault();
        console.log(templateData)
        if (name !== '' && mobile !== "" && subject !== "" && company !== "" && templateData != "") {
            try {
                const body = {
                    'emailTo': 'bondaf.services@bondaf.com',
                    "emailFrom": mailId,
                    'subject': subject,
                    'templateData': `<div>
                    <p>Name: <b>${name}</b></p>
                    <p>Sender : <a href="mailto:${mailId}">${mailId}</a></p>
                    <p>Mobile : ${mobile}</p>
                    <p>Company : ${company}
                     </div><br>` + templateData
                }
                await axios.post(`https://bondaf-api.azurewebsites.net/communication/mail/send`, body).then(res => {
                    console.log(res.data)
                    if (res.status == 201) {
                        setName("");
                        setCompany("");
                        setMobile("");
                        setSubject("");
                        setTemplateData("");

                        toast.success(`${res?.data?.message}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigate("/services");
                    } else {
                        setName("");
                        setCompany("");
                        setMobile("");
                        setSubject("");
                        setTemplateData("");

                        toast.error(`${res?.data?.message}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigate("/services");
                    }
                })
                console.log("dasta", body)
            } catch (error) {
                setName("");
                setCompany("");
                setMobile("");
                setSubject("");
                setTemplateData("");

                toast.error(`${error?.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            if (name === "") { setNameReq(true) }
            if (mobile === "") { setMobileReq(true) }
            if (subject === "") { setSubReq(true) }
            if (company === "") { setCompanyReq(true) }
            if (templateData === "") { setMessageReq(true) }
        }

    }

    const [timeSlots, setTimeSlots] = useState(initialTimes)
    const [scheduleDate, setScheduleDate] = useState("");
    const [slots, setSlots] = useState("");
    const [excludeTimes, setExcludeTimes] = useState([]);
    const [showSlots, setShowSlots] = useState(false)
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];

    const getSchedulesList = async (e) => {
        console.log("dateeee", e)
        setStartDate(e);
        const toDay = moment(new Date()).startOf('day').unix();
        const selectedDay = moment(new Date(e)).startOf('day').unix();

        try {

            await axios.get(`https://bondaf-api.azurewebsites.net/scheduling/events`, {
                params: {
                    startDateTime: moment(new Date(e)).startOf('day').toISOString(),
                    endDateTime: moment(new Date(e)).endOf('day').toISOString()
                }
            }).then((res) => {
                console.log("respon", res?.data)
                let newSlots = JSON.parse(JSON.stringify(initialTimes));
                if (res?.data?.value?.length > 0) {
                    res?.data?.value?.forEach((item) => {
                        console.log(item.start)
                        const newDate = new Date(item?.start?.dateTime);
                        console.log("adsfadf", newDate?.getHours() + ":" + newDate?.getMinutes())
                        const slotIdx = newSlots.findIndex((obj => obj.id == newDate?.getHours() + ":" + newDate?.getMinutes()));
                        newSlots[slotIdx].isAvailable = true
                    })
                }
                if (toDay === selectedDay) {
                    const newDate = new Date();
                    for (let i = 0; i < newSlots?.length; i++) {
                        console.log("adsfadf===>", newSlots[i].id.split(":")[0])
                        // const slotIdx = newSlots.findIndex((obj => obj.id.split(":")[0] <= newDate?.getHours()));
                        if (newSlots[i].id.split(":")[0] <= newDate?.getHours()) {
                            newSlots[i].isAvailable = true
                        }

                    }
                }
                setTimeSlots(newSlots);
                setScheduleDate(e);
                setShowSlots(true);
            })
        } catch (error) {
            alert(error?.message)
        }
    }
    const handleconfirm = async (e) => {
        e.preventDefault();
        // console.log("date", moment(startDate).unix())
        // setOpen(false);
        if (scheduleDate !== '' && slots !== '') {
            const body = {
                userEmail: email,
                subject: "Bondaf-meet",
                start: {
                    dateTime: moment.unix(moment(scheduleDate).unix() + slots?.seconds).toISOString(),
                    timeZone: "Prefer: outlook.timezone"
                },
                end: {
                    dateTime: moment.unix(moment(scheduleDate).unix() + slots?.seconds + 1800).toISOString(),
                    timeZone: "Prefer: outlook.timezone"
                }
            }
            console.log("body", body)
            await axios.post(`https://bondaf-api.azurewebsites.net/scheduling/events/create`, body).then((res) => {
                console.log("date 4", res?.data)
                toast.success(`${res?.data?.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setScheduleDate("");
                setSlots("");
                setShowSlots(false);
                setOpen(false);
            })
        } else {
            toast.warning(`Please select your Slot Time `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const slotChange = (slot) => {
        if (!slot?.isAvailable) {
            console.log(slot);
            // setShowSlots(false);
            setSlots(slot);
        }
    }
    const [existingSchedule, setExistingSchedule] = useState()
    const scheduleContact = async (e) => {
        e.preventDefault();
        await axios(`https://bondaf-api.azurewebsites.net/scheduling/userEmail/${email}`).then(res => {
            console.log("schedule", res)
            if (res?.data?.scheduledDetails !== null) {
                const sd = {
                    startDateTime: res?.data?.scheduledDetails?.start?.dateTime,
                    endDateTime: res?.data?.scheduledDetails?.end?.dateTime,
                    email: res?.data?.scheduledDetails?.userEmail
                }
                setExistingSchedule(sd);
            }
        })
        setOpen(true)
    }
    let usetType = localStorage.getItem('visitorType')
    const [type,setType]=useState(usetType)
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setType(localStorage.getItem('visitorType'))
        });
        
    }, [])
    return (
        <div className='contact-main'>
            <ToastContainer />
            <div className={type=== 'professional' ? 'lg:grid lg:grid-cols-2 gap-2 grid ':'flex items-center justify-center lg:px-[10vw] px-[10px]'}>
                {type=== 'professional' ? <div style={{ flex: 1, padding: '10px' }} className="contactLeft">
                    <div>
                        <h3 className='contactHeading'>{content.contactUs.contactUs[lang]}</h3>
                    </div>
                    <form>
                        <div className="card-body">
                            <div className='lg:grid lg:grid-cols-2 grid grid-cols-1 lg:gap-[0.7vw] '>
                                <input name="name" type="text" required value={name} onChange={(e) => { setName(e.target.value); setNameReq(false); }} className={classNames(nameReq ? "outline-1 outline-red-400" : "", " input-fields lg:rounded-[1vw] rounded-xl w-full bg-white border-none  outline-none focus:outline-none focus:right-0 focus:border-none focus:border-black right-0 lg:col-span-1 col-span-2")} placeholder={lang === 'french' ? "Nom" : "Name"} />
                                <input name="mobile" type="tel" required value={mobile} onChange={(e) => { setMobile(e.target.value); setMobileReq(false); }} className={classNames(mobileReq ? "outline-1 outline-red-400" : "", " input-fields lg:rounded-[1vw] rounded-xl w-full bg-white border-none outline-none focus:outline-none focus:right-0 focus:border-none focus:border-black right-0")} placeholder={lang === 'french' ? "Numéro de téléphone" : "Mobile Number"} />
                                <input name="company" type="text" required value={company} onChange={(e) => { setCompany(e.target.value); setCompanyReq(false) }} className={classNames(companyReq ? "outline-1 outline-red-400" : "", " input-fields lg:rounded-[1vw] rounded-xl w-full bg-white border-none outline-none focus:outline-none focus:right-0 focus:border-none focus:border-black right-0 col-span-2")} placeholder={lang === 'french' ? "Société" : "Company"} />
                                <input name="subject" type="text" required value={subject} onChange={(e) => { setSubject(e.target.value); setSubReq(false); }} className={classNames(subReq ? "outline-1 outline-red-400" : "", " input-fields lg:rounded-[1vw] rounded-xl w-full bg-white border-none outline-none focus:outline-none focus:right-0 focus:border-none focus:border-black right-0 col-span-2")} placeholder={lang === 'french' ? "Sujet" : "Subject"} />
                            </div>

                            <div>
                                <div>
                                    <div className="relative">

                                        <div className="mt-[0.7vw] lg:h-[18vw] h-[20rem] relative">
                                            <ReactQuill
                                                name="templateData"
                                                value={templateData}
                                                onChange={handleEditorChange}
                                                modules={{
                                                    toolbar: [
                                                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                                        ["bold", "italic", "underline", "strike", "blockquote"],
                                                        [{ list: "ordered" }, { list: "bullet" }],
                                                        ["clean"],
                                                    ],
                                                }}
                                                // style={{ height: "23vw" }}
                                                className={classNames(messageReq ? "outline-1 outline-red-400 h-full reactquil" : "reactquilnone", " bg-white")}
                                                placeholder={lang === "french" ? "Rédiger un message..." : "Write Message..."}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='lg:grid grid lg:grid-cols-2 grid-cols-1 gap-2 lg:mt-[1vw]'>
                                <button type="submit" onClick={(e) => submitMailData(e)} className="contactSendBtn" ><FaTelegramPlane /> &nbsp; &nbsp;{content.contactUs.send[lang]}</button>
                                <button onClick={(e) => scheduleContact(e)} className="contactScheduleBtn" ><FaRegCalendar />&nbsp; &nbsp;{content.contactUs.schedule[lang]}</button>
                            </div>

                        </div>
                    </form>
                </div>:''}

                <div className="contactRight ">

                    <div>
                        <div>
                            <div className='flex flex-row items-center justify-center' onClick={() => { navigate('/about', { replace: true }); }}>
                                <img src='https://bondaf.com/media/images/logo/Logo%20symbol%20-%20light.svg' className='contactImage' />
                            </div>
                            <p className={type=== 'professional' ? "paragraph1 lg:px-[3vw] px-[3px]":"paragraph1 lg:px-[10vw] px-[10px]"}>{content.contactUs.p1[lang]}</p>
                        </div>
                        <div>
                            <h6 className="articleContent text-center text-white">{content.contactUs.reachUs[lang]}:</h6>
                            <p className="paragraph1 flex items-center justify-center "><FaMapMarkerAlt style={{ color: '#3399FF' }} /> &nbsp; &nbsp; {content.contactUs.reachUsContent[lang]}</p>
                        </div>

                        <div>
                            <h6 className="articleContent text-center text-white">{content.contactUs.socialMedia[lang]}</h6>
                            <div className='flex items-center justify-center mt-4'>
                                <a href='https://www.linkedin.com/company/bond-af/' target='_blank'><img src='https://bondaf.com/media/images/logo/linkedin-btn.png' className='shareIcons' /></a>
                                {/* <a href='https://twitter.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/twitter-btn.png' className='shareIcons' /></a> */}

                                {/* <a href='https://www.facebook.com/' target='_blank'><img src='https://bondaf.com/media/images/logo/fb-btn.png' className='shareIcons' /></a> */}
                                <a href='https://youtu.be/vq7OeFXlyWw' target='_blank'><img src='https://bondaf.com/media/images/logo/youtube-btn.png' className='shareIcons' /></a><br />
                                <br />


                            </div>
                        </div>
                        <div className='mb-6'>

                            {/* {
                                lang === 'french' ?
                                    <a href="https://legal.bondaf.com/ml-fr" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 24 }}>{content.contactUs.legal[lang]}</h6></a>
                                    :
                                    <a href="https://legal.bondaf.com/ml-en" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 24 }}>{content.contactUs.legal[lang]}</h6></a>
                            } */}
                            {/* <a href="http://legal.bondaf.com/" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 24 }}>{content.contactUs.legal[lang]}</h6></a> */}
                            {
                                lang === 'french' ?
                                    <a href="https://legal.bondaf.com/ml-pdc-fr" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 12 }}>Mentions légales et Politique de confidentialité
                                    </h6></a>
                                    :
                                    <a href="https://legal.bondaf.com/ml-pdc-en" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 12 }}>Legal Notice and Privacy Policy

                                    </h6></a>
                            }
                            {
                                lang === 'french' ?
                                    <a href="https://legal.bondaf.com/cgu-fr" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 12 }}>{content.contactUs.tos[lang]}</h6></a>
                                    :
                                    <a href="https://legal.bondaf.com/cgu-en" target="_blank" style={{ textDecoration: 'none', color: '#FFF', cursor: 'pointer' }}><h6 className="paragraph1  mt-4" style={{ marginTop: 12 }}>{content.contactUs.tos[lang]}</h6></a>

                            }
                        </div>
                    </div>
                </div>

            </div>

            <div>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto ">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform  rounded-lg bg-white    shadow-xl transition-all sm:my-8   ">
                                        {existingSchedule ?
                                            <div className='dialog-box'>
                                                <div className='dialog-header bg-[#3399FF] lg:h-[6vw] h-24 flex items-center justify-center text-white'>
                                                    &nbsp;
                                                </div>
                                                <div className='h-1/2 lg:px-[1vw] px-2 lg:py-[2vw] py-2 flex flex-col items-start justify-center w-full '>
                                                    <div className='lg:grid grid lg:grid-cols-3 grid-cols-1 gap-2 text-left w-full'>
                                                        <div className='lg:text-[1.3vw] text-base font-semibold '>Mail id</div>
                                                        <div className='lg:text-[1.5vw] text-lg text-left lg:col-span-2'>{existingSchedule?.email}</div>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div className='lg:grid grid lg:grid-cols-3 grid-cols-1 gap-2 text-left  w-full'>
                                                        <div className='lg:text-[1.3vw] text-base font-semibold '>Scheduled on</div>
                                                        <div className='lg:text-[1.3vw] text-base  flex space-x-[0.5vw] flex-row h-full lg:col-span-2'>
                                                            <div className=''>{moment(existingSchedule?.startDateTime).format('DD/MM/YYYY')}</div>
                                                            <div>{"("}</div>
                                                            <div>{moment(existingSchedule?.startDateTime).format('hh:mm a')}</div>
                                                            <div>{"-"}</div>
                                                            <div>{moment(existingSchedule?.endDateTime).format('hh:mm a')}</div>
                                                            <div>{")"}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="  md:flex flex  md:space-x-4 md:flex-row md:space-y-0 space-x-4 space-y-0 md:items-end  md:justify-end items-center justify-center  dialog-buttons">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-gray-400  text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                        onClick={() => { setScheduleDate(''); setSlots(""); setShowSlots(false); setOpen(false); }}
                                                    >
                                                        Close
                                                    </button>

                                                </div>
                                            </div>
                                            : <div className='h-full dialog-box'>
                                                <div className='dialog-header bg-[#3399FF] lg:h-[6vw] h-24 flex items-center justify-center text-white'>
                                                    Select slot for call schedule
                                                </div>
                                                <div className='dialog-date  '>


                                                    <input type="date" name="date" id="inputdate" min={minDate} value={scheduleDate} onChange={(e) => getSchedulesList(e.target.value)} className='lg:w-[30vw] w-full  lg:h-[3vw] h-10 text-center  outline-none lg:border-[0.15vw] border-2 focus:outline-none rounded-lg lg:text-[1.3vw] ' />
                                                    <div className="flex flex-wrap items-center justify-center lg:mt-[2vw] mt-4 h-72 lg:h-full overflow-scroll  ">
                                                        {showSlots && timeSlots && timeSlots?.length > 0 ? timeSlots?.map((slot, index) => (
                                                            <div key={index} onClick={() => { slotChange(slot) }} className={` text-center border-2 lg:border-[0.15vw] rounded-lg border-white flex items-center py-[0.5vw] lg:text-[1vw] text-md ${slots?.id === slot?.id ? 'bg-[#3399FF]' : 'bg-blue-50'}  ${slot?.isAvailable ? 'bg-gray-300' : ' hover:bg-[#3399FF] cursor-pointer'} lg:px-[0.7vw] px-3 lg:ml-[1vw] ml-2 mb-2 lg:mb-[1vw]`}>
                                                                <div >
                                                                    {slot?.slot}
                                                                </div>
                                                            </div>
                                                        )) : null}

                                                    </div>
                                                </div>
                                                <div className="  md:flex flex  md:space-x-4 md:flex-row md:space-y-0 space-x-4 space-y-0 md:items-end  md:justify-end items-center justify-center  dialog-buttons">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-gray-500  text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                        onClick={() => { setScheduleDate(''); setSlots(""); setShowSlots(false); setOpen(false); }}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#3399FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                        onClick={(e) => handleconfirm(e)}
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    )
}
