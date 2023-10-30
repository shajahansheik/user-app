import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
import { isValid } from "date-fns";

const job_list = [
    {
        english_title: "Product Manager",
        french_title: "Chef de produit",
        description: "<p>Odio eget viverra mattis consectetur vulputate condimentum venenatis, gravida. Aliquet lacus sed pretium ac amet. Sed ut orci, sed non. Ac ultrices pellentesque non, a lacus, consequat morbi pharetra. Adipiscing cursus ullamcorper fringilla enim nascetur ut. Non consequat sapien molestie aliquam sit fermentum. At mattis neque.</p> <h2>About the role</h2> <p>Habitant et non est nunc. Lorem scelerisque vitae semper rhoncus habitant ipsum nunc. Malesuada turpis accumsan, lectus nunc. Lacus facilisis semper sed enim, eu neque. Risus nam a varius curabitur quam quam. Nullam porttitor fames eget habitasse. Est ut aliquam non porta vestibulum ultrices at non, donec. Tortor et nibh pharetra morbi odio aliquet commodo maecenas. Libero tincidunt urna porta viverra.</p> <h2>What you&#39;ll do</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Must Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Good to Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p>"
    },
    {
        english_title: "Sr. Developer",
        french_title: "Développeur principal",
        description: "<p>Odio eget viverra mattis consectetur vulputate condimentum venenatis, gravida. Aliquet lacus sed pretium ac amet. Sed ut orci, sed non. Ac ultrices pellentesque non, a lacus, consequat morbi pharetra. Adipiscing cursus ullamcorper fringilla enim nascetur ut. Non consequat sapien molestie aliquam sit fermentum. At mattis neque.</p> <h2>About the role</h2> <p>Habitant et non est nunc. Lorem scelerisque vitae semper rhoncus habitant ipsum nunc. Malesuada turpis accumsan, lectus nunc. Lacus facilisis semper sed enim, eu neque. Risus nam a varius curabitur quam quam. Nullam porttitor fames eget habitasse. Est ut aliquam non porta vestibulum ultrices at non, donec. Tortor et nibh pharetra morbi odio aliquet commodo maecenas. Libero tincidunt urna porta viverra.</p> <h2>What you&#39;ll do</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Must Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Good to Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p>"
    },
    {
        english_title: "Jr. Backend Engineer",
        french_title: "Ingénieur backend junior",
        description: "<p>Odio eget viverra mattis consectetur vulputate condimentum venenatis, gravida. Aliquet lacus sed pretium ac amet. Sed ut orci, sed non. Ac ultrices pellentesque non, a lacus, consequat morbi pharetra. Adipiscing cursus ullamcorper fringilla enim nascetur ut. Non consequat sapien molestie aliquam sit fermentum. At mattis neque.</p> <h2>About the role</h2> <p>Habitant et non est nunc. Lorem scelerisque vitae semper rhoncus habitant ipsum nunc. Malesuada turpis accumsan, lectus nunc. Lacus facilisis semper sed enim, eu neque. Risus nam a varius curabitur quam quam. Nullam porttitor fames eget habitasse. Est ut aliquam non porta vestibulum ultrices at non, donec. Tortor et nibh pharetra morbi odio aliquet commodo maecenas. Libero tincidunt urna porta viverra.</p> <h2>What you&#39;ll do</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Must Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p> <h2>Good to Haves</h2> <p>Varius egestas vel id sed fringilla volutpat mi. Dui est urna suscipit venenatis quis orci id dignissim. Vitae suspendisse cursus dui nunc egestas dolor sem arcu, eros. Mi aliquam est velit, euismod. Morbi odio libero amet, auctor dolor neque, sed. Eu urna nisl fringilla cursus risus viverra fermentum proin. Cursus.</p>"
    }
]

function Careers() {
    localStorage.setItem('isPreview',true)
    localStorage.setItem('submittedApplication',false)
    let langPref = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "french";
    const [lang, setLang] = useState(langPref);
    const [careerList, setCareerList] = useState(job_list);
    const [showJob, setShowJob] = useState(lang === 'french' ? careerList[0].french_title : careerList[0].english_title);
    const [open, setOpen] = useState(false);
    const [userSign, setUserSign] = useState(true);
    const [tab, setTab] = useState('Description')
    let submittedApplication = localStorage.getItem('submittedApplication');
    // const [submittedApplication, setSubmittedApplication] = useState(false);
    let validUsr = localStorage.getItem('isValid');
    let email = localStorage.getItem("email");
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("changed store");
            setLang(localStorage.getItem('langPref'))
        });
    }, [])


    const [userDetails, setUserDetails] = useState({
        email: localStorage.getItem("email"),
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: ''
    })
    const [userSignDetails, setUserSignDetails] = useState({
        email: localStorage.getItem("email"),
        password: ''
    })
    console.log("language ---> ", lang)
    const [skillSet, setskillSet] = useState([{ skill: "", level: "" }]);
    const [knowhowList, setknowhowList] = useState([{ knowhow: "" }]);
    const [languageList, setLanguageList] = useState([{ language: "", level: "" }]);
    const [diplomaList, setDiplomaList] = useState([{ education: "", from: "", to: "" }]);
    const [internShipsList, setInternShipsList] = useState([{ internship: "", from: "", to: "" }]);
    const [expList, setExpList] = useState([{ duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", programmingLanguagesUsed: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]);
    let isLocalPreview = localStorage.getItem('isPreview')
    // const [isPreview, setisPreview] = useState(isLocalPreview)

    // handle input change
    const handleInputChange = (e, index, fieldset) => {
        const { name, value } = e.target;
        console.log("fiels", name, value, fieldset)
        switch (fieldset) {
            case 'skills': const skil = [...skillSet];
                skil[index][name] = value;
                setskillSet(skil);
                break;
            case 'knowhow': const know = [...knowhowList];
                know[index][name] = value;
                setknowhowList(know);
                break;
            case 'language': const language = [...languageList];
                language[index][name] = value;
                setLanguageList(language);
                break;
            case 'diploma': const diploma = [...diplomaList];
                diploma[index][name] = value;
                setDiplomaList(diploma);
                break;
            case 'internship': const intern = [...internShipsList];
                intern[index][name] = value;
                setInternShipsList(intern);
                break;
            case 'experience': const exp = [...expList];
                exp[index][name] = value;
                setExpList(exp);
                break;
        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index, fieldset) => {
        switch (fieldset) {
            case 'skills': const skil = [...skillSet];
                skil.splice(index, 1);
                setskillSet(skil);
                break;
            case 'knowhow': const know = [...knowhowList];
                know.splice(index, 1);
                setknowhowList(know);
                break;
            case 'language': const language = [...languageList];
                language.splice(index, 1);
                setLanguageList(language);
                break;
            case 'diploma': const diploma = [...diplomaList];
                diploma.splice(index, 1);
                setDiplomaList(diploma);
                break;
            case 'internship': const intern = [...internShipsList];
                intern.splice(index, 1);
                setInternShipsList(intern);
                break;
            case 'experience': const exp = [...expList];
                exp.splice(index, 1);
                setExpList(exp);
                break;
        }

    };

    // handle click event of the Add button
    const handleAddClick = (fieldset) => {
        // console.log("field set ", fieldset)
        switch (fieldset) {
            case 'skills': setskillSet([...skillSet, { skill: "", level: "" }]); break;
            case 'knowhow': setknowhowList([...knowhowList, { knowhow: "" }]); break;
            case 'language': setLanguageList([...languageList, { language: "", level: "" }]); break;
            case 'diploma': setDiplomaList([...diplomaList, { education: "", from: "", to: "" }]); break;
            case 'internship': setInternShipsList([...internShipsList, { internship: "", from: "", to: "" }]); break;
            case 'experience': setExpList([...expList, { duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]); break;
        }

    };
    const [pswtype, setPSWType] = useState('password');
    const [prviewData, setPreviewData] = useState({});
    const handlePreview = (e) => {
        // let preview_data = {
        //     skillSet,
        //     knowhowList,
        //     languageList,
        //     diplomaList,
        //     internShipsList,
        //     expList
        // }
        let application_data = {
            applicationType: showJob,
            email: email,
            softSkills: skillSet,
            toKnowYourSelft: knowhowList,
            languages: languageList,
            education: diplomaList,
            internships: internShipsList,
            experience: expList
        }
        // let preview_data = {
        //     "skillSet": [
        //         {
        //             "skill": "kdsfhgoi",
        //             "level": "Beginner"
        //         },
        //         {
        //             "skill": "iuyfuytfd",
        //             "level": "Expert"
        //         }
        //     ],
        //     "knowhowList": [
        //         {
        //             "knowhow": "uytfvthcfty"
        //         }
        //     ],
        //     "languageList": [
        //         {
        //             "language": "uygfutyf",
        //             "level": "Limited_Working"
        //         },
        //         {
        //             "language": "uyfuytf",
        //             "level": "Professional_Working"
        //         }
        //     ],
        //     "diplomaList": [
        //         {
        //             "diploma": "lkhfdkgh",
        //             "from": "7376",
        //             "to": "8765"
        //         },
        //         {
        //             "diploma": "fgdfgj",
        //             "from": "4563",
        //             "to": "47657"
        //         }
        //     ],
        //     "internShipsList": [
        //         {
        //             "internShip": "dfgdfhnb",
        //             "from": "1234",
        //             "to": "9859"
        //         },
        //         {
        //             "internShip": "fgghfdhg",
        //             "from": "456",
        //             "to": "4364"
        //         }
        //     ],
        //     "expList": [
        //         {
        //             "duration": "fdghndf",
        //             "from": "4356456",
        //             "to": "456354",
        //             "company": "sjfhg",
        //             "activity_area": "kjgc",
        //             "job": ";lkjh",
        //             "mission_title": "kjhfh",
        //             "jobs_done": "hgfdu",
        //             "lagnuage": "kjgf",
        //             "tools": "kjhgk",
        //             "os": "hjgf",
        //             "reference": "kghf"
        //         },
        //         {
        //             "duration": ",jfghdfjgh",
        //             "from": "3456",
        //             "to": "456745",
        //             "company": "asdf",
        //             "activity_area": "dfgdgf",
        //             "job": "fdhfgh",
        //             "mission_title": "fghjd",
        //             "jobs_done": "fdgjfg",
        //             "lagnuage": "fdghd",
        //             "tools": "fdghjfg",
        //             "os": "dfghdhd",
        //             "reference": "dfghdt"
        //         }
        //     ]
        // }

        console.log(application_data)
        setPreviewData(application_data);
        // setisPreview(false);
        localStorage.setItem('isPreview',false)
        setTab("Preview");
    }


    const handleSubmit = async (e) => {
        // let aplication_data = {
        //     skillSet,
        //     knowhowList,
        //     languageList,
        //     diplomaList,
        //     internShipsList,
        //     expList
        // }
        // setisPreview(false);
        // setTab("Preview");
        console.log("application data", prviewData)
        e.preventDefault();

        axios.post('https://bondaf-api.azurewebsites.net/applications/create', prviewData).then(function (response) {
            console.log(response);
            if (response?.status === 201) {
                alert(response?.data?.message);
                // setUserSign(true);
                // setSubmittedApplication(true)
                localStorage.setItem('submittedApplication',true)
            } else {
                alert(response?.data?.message);

            }
        })
            .catch(function (error) {
                // console.log(error)
                alert(error?.message)
            });

    }


    const newUserHandler = (e) => {
        e.preventDefault();

        axios.post('https://bondaf-api.azurewebsites.net/users/create', userDetails).then(function (response) {
            console.log(response);
            if (response?.status === 201) {
                setUserDetails({ ...userDetails, ['firstName']: '', ['lastName']: '', ['phoneNumber']: '', ['password']: '' })
                alert(response?.data?.message);
                setUserSign(true);
            } else {
                setUserDetails({ ...userDetails, ['firstName']: '', ['lastName']: '', ['phoneNumber']: '', ['password']: '' })

                alert(response?.data?.message);
            }
        })
            .catch(function (error) {
                setUserDetails({ ...userDetails, ['firstName']: '', ['lastName']: '', ['phoneNumber']: '', ['password']: '' })

                // console.log(error)
                alert(error?.message)
            });
    }

    const userSigninHandler = (e) => {
        e.preventDefault();
        axios.post('https://bondaf-api.azurewebsites.net/users/login', userSignDetails).then(function (response) {
            console.log(response);
            if (response.status === 201) {
                // alert(response?.data?.message);
                setTab("Application");
                setOpen(false);
                setUserSign(true);
                setUserSignDetails({ ...userSignDetails, ['password']: '' })
                localStorage.setItem('isValid', 'valid')
            } else {
                setUserSignDetails({ ...userSignDetails, ['password']: '' })
                alert(response?.data?.message)
            }
        })
            .catch(function (error) {
                setUserSignDetails({ ...userSignDetails, ['password']: '' })
                // console.log(error)
                alert(error?.message)
            });
    }
    // const [selectJob,setSelectJob]= useState('')
    return (
        <div>
            <div>
                <h2 className="servicesHeading1" >{lang === 'french' ? 'Tous les emplois' : 'All jobs'}</h2>
                <div className="servicesPara">{lang === 'french' ? 'Nous recrutons des collaborateurs qui ont à cœur les valeurs prônées.' : 'We invite professionals with commendable values into our offices.'}</div>
            </div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-3 px-3 lg:mt-[2vw] mt-[27px]">
                <div className="lg:block hidden">
                    {
                        careerList.map((jobs, index) => (
                            <div key={index} className='mb-[2vw] mt-[1vw]'>
                                <div className={`text-[1.38vw] font-semibold font-titillium hover:cursor-pointer text-end ${(lang === 'french' ? jobs.french_title : jobs.english_title) === showJob ? 'text-blue-500' : 'text-black'} `} onClick={() => setShowJob(lang === 'french' ? jobs.french_title : jobs.english_title)}>{lang === 'french' ? jobs.french_title : jobs.english_title}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="lg:hidden flex flex-col  my-10 ">
                    <div className="text-lg lg:text-[1.4vw] ">Career List:</div>
                    <select
                        name="jobs"
                        value={showJob}

                        className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md h-12 px-3 text-xl"
                        onChange={e => { setShowJob(e.target.value); setTab("Description") }}
                    >
                        {
                            careerList.map((jobs, index) => (
                                <option key={index} value={lang === 'french' ? jobs.french_title : jobs.english_title} className={`text-[1.38vw] font-semibold font-titillium hover:cursor-pointer ${(lang === 'french' ? jobs.french_title : jobs.english_title) === showJob ? 'text-blue-500' : 'text-black'} `} >
                                    {lang === 'french' ? jobs.french_title : jobs.english_title}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-span-3 text-justify">
                    {
                        careerList.map((jobs, index) => (
                            <div key={index} >
                                {
                                    (jobs.french_title === showJob || jobs.english_title === showJob)
                                    &&
                                    <div className="bg-white py-3 px-4 rounded-t">
                                        <div className="header text-black">{lang === 'french' ? jobs.french_title : jobs.english_title}</div>
                                        <div className="lg:flex hidden lg:text-[1.5vw] text-xl">
                                            <div className={` py-[0.5vw] pr-[1vw] hover:cursor-pointer ${tab === 'Description' ? 'text-blue-400 border-b border-blue-400 border-r' : ''}`} onClick={() => setTab("Description")}>
                                                Description
                                            </div>
                                            {
                                                (tab === 'AppliedApplication' || submittedApplication) && <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'AppliedApplication' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("AppliedApplication")}> Preview
                                                </div>
                                            }

                                            {(isLocalPreview && tab === 'Application') && <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'Application' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("Application")}>
                                                Application
                                            </div>}

                                            {(!isLocalPreview && tab === 'Preview') && <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'Preview' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("Preview")}>
                                                Preview
                                            </div>}
                                        </div>
                                        <br />
                                        {tab === 'Description' ?
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: jobs?.description }}></div>
                                                {!submittedApplication  ? <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                    onClick={() => {
                                                        if(validUsr === ''){
                                                            setOpen(true)
                                                        }else{
                                                            setTab("Application");  
                                                        }
                                                    }}
                                                >
                                                     Apply
                                                </button> : 
                                                null
                                                }
                                            </div> 
                                            :
                                            <div>
                                                {
                                                    isLocalPreview ?
                                                        <div>
                                                            <div>
                                                                {lang === 'french' ? <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">SAVOIR FAIRE &amp; OUTILS</div> : <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">SOFT SKILLS</div>}
                                                                <div>
                                                                    {skillSet.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-2">
                                                                                        <input
                                                                                            name="skill"
                                                                                            placeholder={lang === 'french' ? "Compétences" : "Skills"}
                                                                                            value={x.skill}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "skills")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2 " >
                                                                                        <select
                                                                                            name="level"
                                                                                            value={x.level}

                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[43px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "skills")}
                                                                                        >
                                                                                            <option value="" defaultValue="" disabled hidden>{lang === 'french' ? "Le Niveau" : "Level"}</option>
                                                                                            <option value={lang === 'french' ? "Junior" : "Beginner"}>{lang === 'french' ? "Junior" : "Beginner"}</option>
                                                                                            <option value={lang === 'french' ? "Autonome" : "Intermediate"}>{lang === 'french' ? "Autonome" : "Intermediate"}</option>
                                                                                            <option value={lang === 'french' ? "Expert" : "Expert"}>{lang === 'french' ? "Expert" : "Expert"}</option>
                                                                                        </select>
                                                                                    </div>

                                                                                    <div className="lg:text-start text-end">
                                                                                        {skillSet.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500 "
                                                                                            onClick={() => handleRemoveClick(i, "skills")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {skillSet.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("skills")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                            </div>
                                                            <div>
                                                                <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">{lang === 'french' ? "SAVOIR ÊTRE" : "TO KNOW YOURSELF"}</div>
                                                                <div>
                                                                    {knowhowList.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-4">
                                                                                        <input
                                                                                            name="knowhow"
                                                                                            placeholder={lang === 'french' ? "savoir être" : "To know Yourself"}
                                                                                            value={x.knowhow}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "knowhow")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="lg:text-start text-end">
                                                                                        {knowhowList.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500"
                                                                                            onClick={() => handleRemoveClick(i, "knowhow")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {knowhowList.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("knowhow")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">{lang === 'french' ? "LANGUES" : "LANGUAGES"}</div>
                                                                <div>
                                                                    {languageList.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-2">
                                                                                        <input
                                                                                            name="language"
                                                                                            placeholder={lang === 'french' ? "langues" : "Languages"}
                                                                                            value={x.language}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "language")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <select
                                                                                            name="level"
                                                                                            value={x.level}

                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[43px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "language")}
                                                                                        >
                                                                                            <option value="" defaultValue="" disabled hidden>{lang === 'french' ? "Le Niveau" : "Level"}</option>
                                                                                            <option value={lang === 'french' ? "Notions" : "Elementary"}>{lang === 'french' ? "Notions" : "Elementary"}</option>
                                                                                            <option value={lang === 'french' ? "Professionnelle_limitée" : "Limited_Working"}>{lang === 'french' ? "Professionnelle Limitée" : "Limited Working"}</option>
                                                                                            <option value={lang === 'french' ? "Professionnelle" : "Professional_Working"}>{lang === 'french' ? "Professionnelle" : "Professional Working"}</option>
                                                                                            <option value={lang === 'french' ? "Professionnelle complète" : "Full Professional"}>{lang === 'french' ? "Professionnelle complète" : "Full Professional"}</option>
                                                                                            <option value={lang === 'french' ? "Courant" : "Native"}>{lang === 'french' ? "Courant / Bilingue" : "Native / Bilingual "}</option>
                                                                                        </select>
                                                                                    </div>

                                                                                    <div className="lg:text-start text-end">
                                                                                        {languageList.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500"
                                                                                            onClick={() => handleRemoveClick(i, "language")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {languageList.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("language")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="lg:text-[1.5vw] text-[21px] font-semibold pt-[0.6vw] ">{lang === 'french' ? "FORMATION" : "TRAINING"}</div>
                                                                <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">{lang === 'french' ? "DIPLÔME(S)" : "EDUCATION"}</div>
                                                                <div>
                                                                    {diplomaList.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-4">
                                                                                        <input
                                                                                            name="education"
                                                                                            placeholder={lang === 'french' ? "Diplôme" : "Education"}
                                                                                            value={x.education}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "diploma")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="from"
                                                                                            placeholder={lang === 'french' ? "De" : "From"}
                                                                                            value={x.from}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "diploma")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="to"
                                                                                            placeholder={lang === 'french' ? "À" : "To"}
                                                                                            value={x.to}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "diploma")}
                                                                                        />
                                                                                    </div>


                                                                                    <div className="lg:text-start text-end">
                                                                                        {diplomaList.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500"
                                                                                            onClick={() => handleRemoveClick(i, "diploma")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {diplomaList.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("diploma")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">{lang === 'french' ? "Internship(s)" : "Internship(s)"}</div>
                                                                <div>
                                                                    {internShipsList.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-4">
                                                                                        <input
                                                                                            name="internship"
                                                                                            placeholder={lang === 'french' ? "Internship(s)" : "Internship(s)"}
                                                                                            value={x.internship}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "internship")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="from"
                                                                                            placeholder={lang === 'french' ? "De" : "From"}
                                                                                            value={x.from}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "internship")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="to"
                                                                                            placeholder={lang === 'french' ? "À" : "To"}
                                                                                            value={x.to}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "internship")}
                                                                                        />
                                                                                    </div>


                                                                                    <div className="lg:text-start text-end">
                                                                                        {internShipsList.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500"
                                                                                            onClick={() => handleRemoveClick(i, "internship")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {internShipsList.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("internship")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="lg:text-[1.5vw] text-[21px] font-semibold pt-[0.6vw]">{lang === 'french' ? "EXPERIENCE PROFESSIONNELLE" : ""}</div>
                                                                <div>
                                                                    {expList.map((x, i) => {
                                                                        return (
                                                                            <div key={i} className="">
                                                                                <div className="grid grid-cols-5 gap-2">
                                                                                    <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw] col-span-4">{lang === 'french' ? "EXPERIENCE" : "EXPERIENCE"} {i + 1}</div>
                                                                                    <div className="lg:pt-[2vw] pt-0 lg:text-start text-end">
                                                                                        {expList.length !== 1 && <button
                                                                                            className="lg:text-[1.2vw] text-[17px] text-red-500 "
                                                                                            onClick={() => handleRemoveClick(i, "experience")}>{lang === 'french' ? "Retirer" : "Remove"}</button>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                                    <div className="col-span-2">
                                                                                        <input
                                                                                            name="from"
                                                                                            placeholder={lang === 'french' ? "De" : "From"}
                                                                                            value={x.from}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="to"
                                                                                            placeholder={lang === 'french' ? "À" : "To"}
                                                                                            value={x.to}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="duration"
                                                                                            placeholder={lang === 'french' ? "Duree:" : "Duration"}
                                                                                            value={x.duration}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="companyName"
                                                                                            placeholder={lang === 'french' ? "Société" : "company"}
                                                                                            value={x.companyName}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="activity_area"
                                                                                            placeholder={lang === 'french' ? "Secteur d’activité" : "Industry"}
                                                                                            value={x.activity_area}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="jobTitle"
                                                                                            placeholder={lang === 'french' ? "Poste" : "Title of the job"}
                                                                                            value={x.jobTitle}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="projectObjective"
                                                                                            placeholder={lang === 'french' ? "Titre &amp; Objectif(s) de la mission" : "Title & Objective(s) of the project"}
                                                                                            value={x.projectObjective}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="accomplishments"
                                                                                            placeholder={lang === 'french' ? "Activités réalisées" : "Accomplishments"}
                                                                                            value={x.accomplishments}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="programmingLanguagesUsed"
                                                                                            placeholder={lang === 'french' ? "Langages de programmation" : "Programming languages used"}
                                                                                            value={x.programmingLanguagesUsed}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="softwareToolsUsed"
                                                                                            placeholder={lang === 'french' ? "Logiciels / Outils utilisés" : "Software tools used"}
                                                                                            value={x.softwareToolsUsed}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="operatingSystem"
                                                                                            placeholder={lang === 'french' ? "Système d’exploitation" : "Operating System used"}
                                                                                            value={x.operatingSystem}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2  ">
                                                                                        <input
                                                                                            name="reference"
                                                                                            placeholder={lang === 'french' ? "Référence(s) entreprise" : "Reference(s)"}
                                                                                            value={x.reference}
                                                                                            className="col-span-3 border-2 w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                            onChange={e => handleInputChange(e, i, "experience")}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-[1vw]">

                                                                                    {expList.length - 1 === i && <button className="lg:text-[1.2vw] text-[17px] text-blue-500" onClick={() => handleAddClick("experience")}>{lang === 'french' ? "+ Ajouter" : "+ Add"}</button>}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            {!submittedApplication ? <div className="w-full">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md bg-gray-500  text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 w-auto lg:px-[0.8vw] lg:py-[0.5vw] px-[14px] py-[10px]  mt-[1vw] lg:mr-[0.8vw] mr-[14px]"
                                                                    onClick={() => { setTab("Description") }}
                                                                >
                                                                    {lang === 'french' ? "Retour à la description" : "Back to Description"}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] w-auto lg:px-[0.8vw] lg:py-[0.5vw] px-[14px] py-[10px] mt-[1vw]"
                                                                    onClick={(e) => handlePreview(e)}
                                                                >
                                                                    {lang === 'french' ? "Aperçu" : "Preview"}
                                                                </button>
                                                            </div> : null}
                                                        </div>
                                                        :
                                                        <div >
                                                            <div>
                                                                <div>
                                                                    <div>SAVOIR FAIRE &amp; OUTILS</div>
                                                                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-2">
                                                                        {
                                                                            prviewData?.softSkills?.map((skill, index) => (
                                                                                <div key={index} className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2'>
                                                                                    <span>{skill?.skill}</span><span>{skill?.level}</span>
                                                                                    {/* <div className="space-x-2">
                                                                                        <button className="text-gray-400 hover:cursor-pointer">edit</button>
                                                                                        <button className="text-red-500 hover:cursor-pointer">delete</button>
                                                                                    </div> */}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>SAVOIR ÊTRE</div>
                                                                    <div className="space-y-2">
                                                                        {
                                                                            prviewData?.toKnowYourSelft?.map((know, index) => (
                                                                                <div key={index} className='bg-gray-100 px-2 py-1'>
                                                                                    <span >{know?.knowhow}</span>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>LANGUES</div>
                                                                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-2">
                                                                        {
                                                                            prviewData?.languages?.map((language, index) => (

                                                                                <div key={index} className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2'>
                                                                                    <span>{language?.language}</span><span>{language?.level}</span>
                                                                                    {/* <div className="space-x-2">
                                                                                        <button className="text-gray-400 hover:cursor-pointer">edit</button>
                                                                                        <button className="text-red-500 hover:cursor-pointer">delete</button>
                                                                                    </div> */}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>DIPLÔME(S)</div>
                                                                    <div className="space-y-2">
                                                                        <div className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2 font-semibold text-lg'>
                                                                            <span>education</span><span>from - to</span>
                                                                            <div></div>
                                                                        </div>
                                                                        {
                                                                            prviewData?.education?.map((diploma, index) => (
                                                                                <div key={index} className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2'>
                                                                                    <span>{diploma?.education}</span><span>{diploma?.from + ' - ' + diploma?.to}</span>
                                                                                    {/* <div className="space-x-2">
                                                                                        <button className="text-gray-400 hover:cursor-pointer">edit</button>
                                                                                        <button className="text-red-500 hover:cursor-pointer">delete</button>
                                                                                    </div> */}
                                                                                </div>

                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>Internship(s)</div>
                                                                    <div className="space-y-2">
                                                                        <div className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2 font-semibold text-lg'>
                                                                            <span>education</span><span>from - to</span>
                                                                            <div></div>
                                                                        </div>
                                                                        {
                                                                            prviewData?.internships?.map((intern, index) => (
                                                                                <div key={index} className='bg-gray-100 px-2 py-1 grid grid-cols-2 gap-2'>
                                                                                    <span>{intern?.internship}</span><span>{intern?.from + ' - ' + intern?.to}</span>
                                                                                    {/* <div className="space-x-2">
                                                                                        <button className="text-gray-400 hover:cursor-pointer">edit</button>
                                                                                        <button className="text-red-500 hover:cursor-pointer">delete</button>
                                                                                    </div> */}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>EXPERIENCE</div>
                                                                    <div className="space-y-2">
                                                                        {
                                                                            prviewData?.experience?.map((exp, index) => (
                                                                                <div key={index} className='px-2 py-1 grid grid-cols-2 gap-2 bg-gray-100'>

                                                                                    <span>{exp?.duration}</span>
                                                                                    <span>{exp?.from + ' - ' + exp?.to}</span>
                                                                                    <span>{exp?.companyName}</span>
                                                                                    <span>{exp?.activity_area}</span>
                                                                                    <span>{exp?.jobTitle}</span>
                                                                                    <span>{exp?.projectObjective}</span>
                                                                                    <span>{exp?.accomplishments}</span>
                                                                                    <span>{exp?.programmingLanguagesUsed}</span>
                                                                                    <span>{exp?.softwareToolsUsed}</span>
                                                                                    <span>{exp?.operatingSystem}</span>
                                                                                    <span>{exp?.reference}</span>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            {!submittedApplication ? <div>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full justify-center rounded-md bg-gray-400  text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dialog-btn mr-[1.1vw]"
                                                                    onClick={() => {  localStorage.setItem('isPreview',true); setTab("Application"); }}
                                                                >
                                                                    {lang === 'french' ? "Annuler" : "Cancle"}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                                    onClick={(e) => handleSubmit(e)}
                                                                >
                                                                    {lang === 'french' ? "Soumettre" : "Submit"}
                                                                </button>
                                                            </div> : null}
                                                        </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

            <div>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                    <Dialog.Panel className={`relative transform  rounded-lg bg-white px-2   shadow-xl transition-all sm:my-8  w-[40%]}`}>
                                        <div className='h-full '>
                                            {/* <div className='dialog-header border-b border-gray-400'>
                                                Log in
                                            </div> */}
                                            <div className="  flex   flex-row   items-center  justify-between lg:h-[3vw] h-10 dialog-buttons border-b pl-[1vw] ">
                                                <div className="font-titillium font-semibold lg:text-[1.6vw] text-lg">
                                                    {
                                                        userSign ? "Sign IN" : "Create new account"
                                                    }
                                                </div>
                                                <svg onClick={() => { setOpen(false); setUserSign(true) }} className="lg:w-[2vw] w-[28px] lg:h-[2vw] h-[28px] hover:cursor-pointer hover:w-[2.2vw] hover:h-[2.2vw] " fill="#f00000" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">

                                                    <g id="Layer_2" data-name="Layer 2">
                                                        <g id="invisible_box" data-name="invisible box">
                                                            <rect width="48" height="48" fill="none" />
                                                        </g>
                                                        <g id="icons_Q2" data-name="icons Q2">
                                                            <path d="M42,4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V6A2,2,0,0,0,42,4ZM32.3,29.5a2.1,2.1,0,0,1,.4,2.7,2,2,0,0,1-3.1.2L24,26.8l-5.6,5.6a2,2,0,0,1-3.1-.2,2.1,2.1,0,0,1,.4-2.7L21.2,24l-5.5-5.5a2.2,2.2,0,0,1-.4-2.7,2,2,0,0,1,3.1-.2L24,21.2l5.6-5.6a2,2,0,0,1,3.1.2,2.2,2.2,0,0,1-.4,2.7L26.8,24Z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>

                                            {userSign ? <div className="lg:h-[20vw]  h-[25rem] lg:w-full w-[90vw]  flex flex-col justify-center lg:px-[1vw] px-[14px]">
                                                <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                    <label className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 flex items-center lg:h-[3vw] h-[43px] ">Mail ID</label>
                                                    <input type="text" value={userSignDetails?.email} name="email" onChange={(e) => setUserSignDetails({ ...userSignDetails, ['email']: e.target.value })} placeholder="Enter Your Registered Mail ID" className=" col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md w-full lg:h-[3vw] h-[40px] px-3 lg:text-[1.3vw] text-[18px]" />
                                                </div>
                                                <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                    <label className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 flex items-center lg:h-[3vw] h-[43px]">Password</label>
                                                    <input type={pswtype} value={userSignDetails?.password} name='password' onChange={(e) => setUserSignDetails({ ...userSignDetails, ['password']: e.target.value })} placeholder="Enter Your Password" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md w-full lg:h-[3vw] h-[40px] px-3 lg:text-[1.3vw] text-[18px]" />
                                                </div>
                                                <div className="lg:grid lg:grid-cols-5 lg:space-x-3  ">
                                                    <div className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 lg:flex hidden items-center  lg:h-[3vw] h-[40px]"></div>
                                                    <div className="col-span-3 flex items-center justify-start space-x-1 lg:mt-0 mt-[10px]">
                                                        <input className=" checkboxInput " type="checkbox" onChange={(e) => { if (pswtype === 'text') setPSWType('password'); else setPSWType('text'); }} />
                                                        <label className=" lg:text-[1.2vw] text-[17px] font-titillium">Show Password</label>
                                                    </div>
                                                </div>
                                                <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                    {/* <div className=" text-[1.2vw] font-semibold font-titillium col-span-1 flex items-center justify-end h-[3vw]"></div> */}
                                                    <div className="col-span-4 flex items-center justify-between">
                                                        <div className="font-semibold lg:text-[1.1vw] text-[15px] bg-gray-100 p-[0.5vw] hover:bg-gray-200 text-[#3399FF] hover:cursor-pointer" onClick={() => setUserSign(false)}>Create Account</div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => userSigninHandler(e)}
                                                            className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  lg:text-[1.1vw] text-[15px] font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> :
                                                <div className="lg:h-[30vw] h-[35rem] lg:w-full w-[90vw]  flex flex-col justify-center  overflow-y-scroll lg:px-[1vw] px-[14px]">
                                                    <div className="grid grid-cols-1">
                                                        <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                            <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">First Name</label>
                                                            <input type="text" name="firstName" value={userDetails?.firstName} onChange={(e) => setUserDetails({ ...userDetails, ['firstName']: e.target.value })} placeholder="Enter Your First Name" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[40px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                        </div>
                                                        <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                            <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Last Name</label>
                                                            <input type="text" name="lastName" value={userDetails?.lastName} onChange={(e) => setUserDetails({ ...userDetails, ['lastName']: e.target.value })} placeholder="Enter Your Last Name" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[40px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                        </div>
                                                        <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                            <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Mail ID</label>
                                                            <input type="email" name="email" value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, ['email']: e.target.value })} placeholder="Enter Your mail id" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[40px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                        </div>
                                                        <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                            <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Phone Number</label>
                                                            <input type="tel" max={10} name="phoneNumber" value={userDetails?.phoneNumber} onChange={(e) => setUserDetails({ ...userDetails, ['phoneNumber']: e.target.value })} placeholder="Enter Your phone number" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[40px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                        </div>
                                                        <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                            <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Create Password</label>
                                                            <input type="text" name="password" value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, ['password']: e.target.value })} placeholder="Create Password" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[40px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                        </div>
                                                    </div>

                                                    <div className="lg:grid lg:grid-cols-5 lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                        <div className="col-span-5 flex items-center justify-between">
                                                            <div className="font-semibold lg:text-[1.1vw] text-[15px] text-[#3399FF] bg-gray-100 p-[0.5vw] hover:bg-gray-200 hover:cursor-pointer" onClick={() => setUserSign(true)}>Sign in insted</div>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => newUserHandler(e)}
                                                                className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  lg:text-[1.1vw] text-[15px] font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    );
}

export default Careers;