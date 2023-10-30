import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const initialSkill = [{ skill: "", level: "" }]
const initialKnowHow = [{ knowhow: "" }]
const initialLang = [{ language: "", level: "" }]
const initialDeplo = [{ education: "", from: "", to: "" }]
const initialIntern = [{ internship: "", from: "", to: "" }]
const initialExp = [{ duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", programmingLanguagesUsed: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]
function Career() {
    const location = useLocation();

    let email = localStorage.getItem("email");
    let isValid = localStorage.getItem('isValid')
    const [lang, setLang] = useState("french");
    const [careerList, setCareerRoles] = useState([]);
    const [showJob, setShowJob] = useState();
    const [tab, setTab] = useState('Description')
    const [open, setOpen] = useState(false);
    const [userSign, setUserSign] = useState(true);
    const [existData, setExistData] = useState({});
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
    const [pswtype, setPSWType] = useState('password');
    const [npswtype, setNPSWType] = useState('password');


    const [skillSet, setskillSet] = useState(initialSkill);
    const [knowhowList, setknowhowList] = useState(initialKnowHow);
    const [languageList, setLanguageList] = useState(initialLang);
    const [diplomaList, setDiplomaList] = useState(initialDeplo);
    const [internShipsList, setInternShipsList] = useState(initialIntern);
    const [expList, setExpList] = useState(initialExp);
    const [userData, setUserData] = useState();
    const [prviewData, setPreviewData] = useState({});

    const navigate = useNavigate();

    let usetType = localStorage.getItem('visitorType')
    const [type,setType]=useState(usetType)
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
        if(localStorage.getItem("email") === '' || localStorage.getItem("email") === null || localStorage.getItem("email") === undefined){
            localStorage.setItem("redirect", location.pathname);
            navigate('/');
    
        }
    }, [])

    useEffect(() => {

        async function fetchData() {
            const res = await fetch(`https://bondaf-api.azurewebsites.net/career/roles/list`)
            let data = (await res.json());
            console.log("data", data)
            setCareerRoles(data?.careerRoles)
            setShowJob(data?.careerRoles[0]?.careerRole)
        }
        fetchData();
    }, [])
    const [showVerify, setShowVerify] = useState(false);
    const newUserHandler = (e) => {
        e.preventDefault();

        axios.post('https://bondaf-api.azurewebsites.net/users/signup', userDetails).then(function (response) {
            console.log(response);
            if (response?.status === 201) {
                setUserDetails({ ...userDetails, 'firstName': '', 'lastName': '', 'phoneNumber': '', 'password': '' })
                setShowVerify(true);

                // toast.success(`Veuillez vérifier votre email.`, {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
            }
            // else {
            //     setUserDetails({ ...userDetails, 'firstName': '', 'lastName': '', 'phoneNumber': '', 'password': '' })
            //     alert(response?.data?.message);
            //     setOpen(false);
            //     setUserSign(true);

            // }
        })
            .catch(function (error) {
                setUserDetails({ ...userDetails, 'firstName': '', 'lastName': '', 'phoneNumber': '', 'password': '' })
                // console.log(error)
                toast.error(error?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setOpen(false);
                setUserSign(true);


            });
    }
    console.log("career", careerList)




    const userSigninHandler = (e) => {
        // e.preventDefault();

        axios.post('https://bondaf-api.azurewebsites.net/users/login', userSignDetails).then(async function (response) {
            console.log(response);
            if (response.status === 201) {
                // alert(response?.data?.message);
                setUserData(response?.data?.user)
                console.log("res===", response)
                const appkey = careerList?.find((app) => (app.careerRole === showJob))
                await axios.get(`https://bondaf-api.azurewebsites.net/applications/email/${userDetails?.email}/careerRoleId/${appkey?.careerRoleId}`).then(res => {
                    console.log(res, "result")
                    if (res.data.application === null || Object.keys(res.data.application).length === 0) {

                        setTab("Application");
                    } else {
                        setExistData(res?.data)

                        setTab("Preview_Application");
                    }
                }).catch((err) => toast.error(err?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }))
                // toast.success(response?.data?.message, {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
                setUserSignDetails({ ...userSignDetails, 'password': '' });
                localStorage.setItem('isValid', JSON.parse(JSON.stringify('valid')));
                setOpen(false);
                setPSWType('password');
                setUserSign(true);

                window.dispatchEvent(new Event("storage"));


            } else {
                setUserSignDetails({ ...userSignDetails, 'password': '' })
                toast.success(response?.data?.message, {
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
        }).catch(function (error) {
            setUserSignDetails({ ...userSignDetails, 'password': '' })
            console.log(error)
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }



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
            default: console.log("nothing")
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
            default: console.log("error")
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
            default: console.log("nothing match")
        }

    };


    const handlePreview = (e) => {
        let knowlist = [];
        const appkey = careerList?.find((app) => (app.careerRole === showJob))

        knowhowList.forEach((know) => knowlist.push(know?.knowhow))

        let setdiplomaListData = [];
        let setinternShipsListData = [];
        let setexpListData = [];

        // for (let i = 0; i < diplomaList.length; i++) {
        //     const obj = {
        //         education: diplomaList[i]?.education,
        //         from: moment(diplomaList[i]?.from).unix(),
        //         to: moment(diplomaList[i]?.to).unix()
        //     }
        //     setdiplomaListData.push(obj)
        // }
        // for (let i = 0; i < internShipsList.length; i++) {
        //     const obj = {
        //         internship: internShipsList[i]?.internship,
        //         from: moment(internShipsList[i]?.from).unix(),
        //         to: moment(internShipsList[i]?.to).unix()
        //     }
        //     setinternShipsListData.push(obj)
        // }
        for (let i = 0; i < expList.length; i++) {
            const obj = {
                duration: expList[i]?.duration,
                from: moment(expList[i]?.from).unix(),
                to: moment(expList[i]?.to).unix(),
                companyName: expList[i]?.companyName,
                activity_area: expList[i]?.activity_area,
                jobTitle: expList[i]?.jobTitle,
                projectObjective: expList[i]?.projectObjective,
                accomplishments: expList[i]?.accomplishments,
                programmingLanguagesUsed: expList[i]?.programmingLanguagesUsed,
                softwareToolsUsed: expList[i]?.softwareToolsUsed,
                operatingSystem: expList[i]?.operatingSystem,
                reference: expList[i]?.reference
            }
            setexpListData.push(obj);
        }

        let application_data = {
            // applicationType: appkey?.applicationType,
            careerRoleInfo: {
                careerRoleId: appkey?.careerRoleId,
                careerRole: appkey?.careerRole
            },
            userDetails: userData,
            softSkills: skillSet,
            toKnowYourSelft: knowlist,
            languages: languageList,
            education: diplomaList,
            internships: internShipsList,
            experience: setexpListData
        }


        console.log('appkey', appkey)
        setPreviewData(application_data);
        // setisPreview(false);
        // localStorage.setItem('isPreview',false)
        setTab("Preview");
    }


    const handleSubmit = async (e) => {

        console.log("application data", prviewData)
        e.preventDefault();

        axios.post('https://bondaf-api.azurewebsites.net/applications/create', prviewData).then(async function (response) {
            console.log(response);
            if (response?.status === 201) {
                toast.success(`Applied.`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }); setskillSet([{ skill: "", level: "" }]);
                setknowhowList([{ knowhow: "" }]);
                setDiplomaList([{ education: "", from: "", to: "" }]);
                setLanguageList([{ language: "", level: "" }]);
                setInternShipsList([{ internship: "", from: "", to: "" }]);
                setExpList([{ duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", programmingLanguagesUsed: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]);
                setPreviewData({})
                const appkey = careerList?.find((app) => (app.careerRole === showJob))
                await axios.get(`https://bondaf-api.azurewebsites.net/applications/email/${userDetails?.email}/careerRoleId/${appkey?.careerRoleId}`).then(res => {
                    console.log(res, "result")
                    if (res.data.application === null || Object.keys(res.data.application).length === 0) {
                        setTab("Application");
                    } else {
                        setExistData(res?.data)
                        setTab("Preview_Application");
                    }
                }).catch((err) => {
                    toast.success(err?.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
            } else {
                toast.success(response?.data?.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        })
            .catch(function (error) {
                // console.log(error)
                toast.success(error?.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });

    }
    const resetData = (e, jobs) => {
        e.preventDefault();
        setTab('Description');
        setExistData({});
        setShowJob(jobs.careerRole);
        setskillSet([{ skill: "", level: "" }]);
        setknowhowList([{ knowhow: "" }]);
        setDiplomaList([{ education: "", from: "", to: "" }]);

        setLanguageList([{ language: "", level: "" }]);
        setInternShipsList([{ internship: "", from: "", to: "" }]);
        setExpList([{ duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", programmingLanguagesUsed: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]);
        setPreviewData({})

    }
    console.log("ex", prviewData, diplomaList)
    return (
        <div>
            <ToastContainer />
            {/* <CasualHeader /> */}
            <div>
                <h2 className="servicesHeading1" >{lang === 'french' ? 'Tous les emplois' : 'All jobs'}</h2>
                <div className="servicesPara">{lang === 'french' ? 'Nous recrutons des collaborateurs qui ont à cœur les valeurs prônées.' : 'We invite professionals with commendable values into our offices.'}</div>
            </div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-3 px-3 lg:mt-[2vw] mt-[27px]">
                {/* web version career list */}
                <div className="lg:block hidden">
                    {
                        careerList.map((jobs, index) => (
                            <div key={index} className='mb-[2vw] mt-[1vw]'>
                                <div className={`text-[1.38vw] font-semibold font-titillium hover:cursor-pointer text-end ${(jobs.careerRole) === showJob ? 'text-blue-500' : 'text-black'} `} onClick={(e) => resetData(e, jobs)}>{jobs.careerRole}{" ( "}{moment(jobs?.metaInfo?.createdAt *1000).format("DD/MM/YYYY")}{" ) "}</div>
                            </div>
                        ))
                    }
                </div>
                {/* mobile version career list */}
                <div className="lg:hidden flex flex-col  my-10 ">
                    <div className="text-lg lg:text-[1.4vw] ">Career List:</div>
                    <select
                        name="jobs"
                        value={showJob}

                        className=" border-2 truncate focus:border-blue-300 focus:outline-none rounded-md h-12 dropdowncareer"
                        onChange={e => {
                            e.preventDefault();
                            setShowJob(e.target.value); setExistData({}); setTab("Description");
                            setskillSet([{ skill: "", level: "" }]);
                            setknowhowList([{ knowhow: "" }]);
                            setDiplomaList([{ education: "", from: "", to: "" }]);

                            setLanguageList([{ language: "", level: "" }]);
                            setInternShipsList([{ internship: "", from: "", to: "" }]);
                            setExpList([{ duration: "", from: "", to: "", companyName: "", activity_area: "", jobTitle: "", projectObjective: "", accomplishments: "", programmingLanguagesUsed: "", softwareToolsUsed: "", operatingSystem: "", reference: "" }]);
                            setPreviewData({});

                        }}
                    >
                        {
                            careerList.map((jobs, index) => (
                                <option key={index} value={jobs?.careerRole} className={`text-[1.38vw] font-semibold font-titillium hover:cursor-pointer ${(jobs?.careerRole) === showJob ? 'text-blue-500' : 'text-black'} `} >
                                    {jobs.careerRole}{" ( "}{moment(jobs?.metaInfo?.createdAt *1000).format("DD/MM/YYYY")}{" ) "}
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
                                    (jobs.careerRole === showJob)
                                    &&
                                    <div className="bg-white py-3 px-4 rounded-t">
                                        <div className="header text-black text-center">{jobs.careerRole}</div>
                                        <div className="lg:flex hidden lg:text-[1.5vw] text-xl">
                                            <div className={` py-[0.5vw] pr-[1vw] hover:cursor-pointer ${tab === 'Description' ? 'text-blue-400 border-b border-blue-400 border-r' : ''}`} onClick={() => setTab("Description")}>
                                                Description
                                            </div>
                                            {tab === 'Application' ? <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'Application' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("Application")}>
                                                Application
                                            </div> : null}
                                            {tab === 'Preview' ? <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'Preview' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("Preview")}>
                                                Aperçu
                                            </div> : null}
                                            {tab === 'Preview_Application' || (existData && Object?.keys(existData)?.length > 0) ? <div className={`py-[0.5vw] px-[1vw] hover:cursor-pointer ${tab === 'Preview_Application' ? 'text-blue-400 border-b border-blue-400 border-l' : ''}`} onClick={() => setTab("Preview_Application")}>
                                                Aperçu
                                            </div> : null}
                                        </div>
                                        <br />
                                        {tab === 'Description' ?
                                            <div>
                                                <div className="descrip" dangerouslySetInnerHTML={{ __html: jobs?.description }}></div>
                                                {Object?.keys(existData)?.length > 0 ? null : type ==='casual' ? <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                    onClick={async () => {

                                                        if (isValid === 'valid') {
                                                            const appkey = careerList?.find((app) => (app.careerRole === showJob))
                                                            console.log("ap key", appkey)
                                                            await axios.get(`https://bondaf-api.azurewebsites.net/applications/email/${userDetails?.email}/careerRoleId/${appkey?.careerRoleId}`).then(res => {
                                                                console.log(res, "result")
                                                                if (res.data.application === null || Object.keys(res.data.application).length === 0) {
                                                                    setTab("Application");
                                                                } else {
                                                                    setExistData(res?.data)
                                                                    // alert('Already Applied :)')
                                                                    setTab("Preview_Application");
                                                                }
                                                            }).catch((err) => alert(err?.message))
                                                        }
                                                        else setOpen(true)
                                                    }}
                                                >
                                                    Postuler
                                                </button>:''}
                                            </div> :
                                            null}
                                        {
                                            tab === 'Application' ? <div>
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
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "skills")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2 " >
                                                                            <select
                                                                                name="level"
                                                                                value={x.level}

                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[43px] px-3 lg:text-[1.3vw] text-[18px]"
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
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
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
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "language")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <select
                                                                                name="level"
                                                                                value={x.level}

                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[43px] px-3 lg:text-[1.3vw] text-[18px]"
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
                                                    <div className="lg:text-[1.5vw] text-[21px] font-semibold pt-[0.6vw] ">EDUCATION</div>
                                                    <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">DIPLÔME(S)</div>
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
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "diploma")}
                                                                            />
                                                                        </div>
                                                                        {/* <div className="col-span-2  ">
                                                                            <input
                                                                                name="from"
                                                                                type='text'
                                                                                placeholder={lang === 'french' ? "De" : "From"}
                                                                                value={x.from}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "diploma")}
                                                                            />
                                                                        </div> */}
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="to"
                                                                                type='text'
                                                                                placeholder={lang === 'french' ? "À" : "To"}
                                                                                value={x.to}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
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
                                                    <div className="lg:text-[1.3vw] text-[18px] font-semibold py-[1vw]">FORMATION</div>
                                                    <div>
                                                        {internShipsList.map((x, i) => {
                                                            return (
                                                                <div key={i} className="">
                                                                    <div className="lg:grid lg:grid-cols-5 lg:gap-2 lg:space-y-0 space-y-3">
                                                                        <div className="col-span-4">
                                                                            <input
                                                                                name="internship"
                                                                                placeholder={lang === 'french' ? "Formation" : "Formation"}
                                                                                value={x.internship}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "internship")}
                                                                            />
                                                                        </div>
                                                                        {/* <div className="col-span-2  ">
                                                                            <input
                                                                                name="from"
                                                                                type='text'
                                                                                placeholder={lang === 'french' ? "De" : "From"}
                                                                                value={x.from}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "internship")}
                                                                            />
                                                                        </div> */}
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="to"
                                                                                type='text'
                                                                                placeholder={lang === 'french' ? "À" : "To"}
                                                                                value={x.to}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
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
                                                                                type='date'
                                                                                className="col-span-3 border  w-full focus:border-blue-300 outline-none focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="to"
                                                                                type='date'
                                                                                placeholder={lang === 'french' ? "À" : "To"}
                                                                                value={x.to}
                                                                                className="col-span-3 border w-full focus:border-blue-300 outline-none focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="duration"
                                                                                placeholder={lang === 'french' ? "Duree:" : "Duration"}
                                                                                value={x.duration}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="companyName"
                                                                                placeholder={lang === 'french' ? "Société" : "company"}
                                                                                value={x.companyName}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="activity_area"
                                                                                placeholder={lang === 'french' ? "Secteur d’activité" : "Industry"}
                                                                                value={x.activity_area}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="jobTitle"
                                                                                placeholder={lang === 'french' ? "Poste" : "Title of the job"}
                                                                                value={x.jobTitle}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>


                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="programmingLanguagesUsed"
                                                                                placeholder={lang === 'french' ? "Langages de programmation" : "Programming languages used"}
                                                                                value={x.programmingLanguagesUsed}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="softwareToolsUsed"
                                                                                placeholder={lang === 'french' ? "Logiciels / Outils utilisés" : "Software tools used"}
                                                                                value={x.softwareToolsUsed}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="operatingSystem"
                                                                                placeholder={lang === 'french' ? "Système d’exploitation" : "Operating System used"}
                                                                                value={x.operatingSystem}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2  ">
                                                                            <input
                                                                                name="reference"
                                                                                placeholder={lang === 'french' ? "Référence(s) entreprise" : "Reference(s)"}
                                                                                value={x.reference}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md lg:h-[3vw] h-[38px] px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-4  ">
                                                                            <textarea
                                                                                name="projectObjective"
                                                                                placeholder={lang === 'french' ? "Titre & Objectif(s) de la mission" : "Title & Objective(s) of the project"}
                                                                                value={x.projectObjective}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md  px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                                rows="2" cols="50"
                                                                            ></textarea>
                                                                        </div>
                                                                        <div className="col-span-4  ">
                                                                            <textarea
                                                                                name="accomplishments"
                                                                                placeholder={lang === 'french' ? "Activités réalisées" : "Accomplishments"}
                                                                                value={x.accomplishments}
                                                                                className="col-span-3 border w-full focus:border-blue-300 focus:outline-none rounded-md  px-3 lg:text-[1.3vw] text-[18px]"
                                                                                onChange={e => handleInputChange(e, i, "experience")}
                                                                                rows="2" cols="50"
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
                                                <div className="w-full">

                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] w-auto lg:px-[0.8vw] lg:py-[0.5vw] px-[14px] py-[10px] mt-[1vw]"
                                                        onClick={(e) => handlePreview(e)}
                                                    >
                                                        {lang === 'french' ? "Aperçu" : "Preview"}
                                                    </button>
                                                </div>
                                            </div> : null
                                        }
                                        {
                                            tab === 'Preview' ?
                                                <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                    <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                        {((prviewData?.softSkills?.length > 0 && prviewData?.softSkills[0]?.skill !== '') || (prviewData?.toKnowYourSelft?.length > 0 && prviewData?.toKnowYourSelft[0] !== '') || (prviewData?.languages?.length > 0 && prviewData?.languages[0]?.language !== '')) ?
                                                            <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                                <div className="bg-gray-200   text-center text-xl lg:text-[1.4vw] font-semibold padding-para">Compétences clés</div>
                                                                {prviewData?.softSkills?.length > 0 && prviewData?.softSkills[0]?.skill !== '' ? <div className="border-2 border-black">
                                                                    <div className="bg-gray-300 border-b-2 border-black  text-center text-lg lg:text-[1.3vw] font-semibold padding-para">SAVOIR FAIRE &amp; OUTILS</div>
                                                                    <div >
                                                                        <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                            <span className=" col-span-2 text-base lg:text-[1.2vw] font-semibold padding-para">Compétences</span>
                                                                            <span className="border-l-2 border-black  text-base lg:text-[1.2vw] font-semibold padding-para">Autonome</span>
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                prviewData?.softSkills?.map((skill, index) => (
                                                                                    <div key={index} className={prviewData?.softSkills?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                        <span className="padding-para col-span-2 text-sm lg:text-[1.1vw]">{skill?.skill}</span>
                                                                                        <span className="border-l-2 border-black padding-para text-sm lg:text-[1.1vw]">{skill?.level}</span>

                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div> : null}
                                                                {prviewData?.toKnowYourSelft?.length > 0 && prviewData?.toKnowYourSelft[0] !== '' ? <div className="border-2 border-black">
                                                                    <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">SAVOIR ÊTRE</div>
                                                                    <div >
                                                                        <div className=" border-b-2 border-black padding-para  text-base lg:text-[1.2vw] font-semibold">
                                                                            Courageous
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                prviewData?.toKnowYourSelft?.map((know, index) => (
                                                                                    <div key={index} className={prviewData?.toKnowYourSelft?.length - 1 === index ? "padding-para text-sm lg:text-[1.1vw]" : "padding-para border-b-2 border-black text-sm lg:text-[1.1vw]"}>
                                                                                        {know}
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div> : null}
                                                                {prviewData?.languages?.length > 0 && prviewData?.languages[0]?.language !== '' ? <div className="border-2 border-black">
                                                                    <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">LANGUES</div>
                                                                    <div >
                                                                        <div className="grid grid-cols-2 border-b-2 border-black text-center">
                                                                            <span className="padding-para  text-base lg:text-[1.2vw] font-semibold">Anglais</span>
                                                                            <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold">Courant/Bilingue</span>
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                prviewData?.languages?.map((language, index) => (
                                                                                    <div key={index} className={prviewData?.languages?.length - 1 === index ? "grid grid-cols-2 text-center" : "grid grid-cols-2 border-b-2 border-black text-center"}>
                                                                                        <span className="padding-para text-sm lg:text-[1.1vw] ">{language?.language}</span>
                                                                                        <span className="border-l-2 border-black padding-para text-sm lg:text-[1.1vw]" >{language?.level}</span>

                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div> : null}
                                                            </div> : null}
                                                        {prviewData?.education?.length > 0 && prviewData?.education[0]?.education !== '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                            <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Education</div>

                                                            <div className="border-2 border-black">
                                                                <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">DIPLÔME(S)</div>
                                                                <div >
                                                                    <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                        <span className="padding-para  text-base lg:text-[1.2vw] font-semibold"> À</span>
                                                                        <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold col-span-2">Diplôme</span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            prviewData?.education?.map((diploma, index) => (
                                                                                <div key={index} className={prviewData?.education?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                    <span className="padding-para text-sm lg:text-[1.1vw]">{diploma?.to}</span>
                                                                                    <span className="border-l-2 border-black padding-para col-span-2 text-sm lg:text-[1.1vw]">{diploma?.education}</span>

                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : null}
                                                        {prviewData?.internships?.length > 0 && prviewData?.internships[0]?.internship !== '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                            {/* <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Formation(s)</div> */}

                                                            <div className="border-2 border-black">
                                                                <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">Formation(s)</div>
                                                                <div >
                                                                    <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                        <span className="padding-para  text-base lg:text-[1.2vw] font-semibold">À</span>
                                                                        <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold col-span-2">Formation(s)</span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            prviewData?.internships?.map((intern, index) => (
                                                                                <div key={index} className={prviewData?.internships?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                    <span className="padding-para text-sm lg:text-[1.1vw]">{intern?.to}</span>
                                                                                    <span className="border-l-2 border-black padding-para col-span-2 text-sm lg:text-[1.1vw]">{intern?.internship}</span>

                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : null}
                                                        {prviewData?.experience?.length > 0 && prviewData?.experience[0]?.duration != '' && prviewData?.experience[0]?.to != '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">

                                                            <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Expérience Professionnelle</div>

                                                            <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                                {
                                                                    prviewData?.experience?.map((exp, index) => (
                                                                        <div key={index} >
                                                                            <div className="lg:grid lg:grid-cols-3">
                                                                                <div className="border-t-2 border-l-2 border-r-2 border-black padding-para space-y-2 lg:text-[1.1vw] font-semibold">
                                                                                    <div className="">
                                                                                        <span>Durée : &nbsp;</span>
                                                                                        <span className="">{exp?.duration}</span>
                                                                                    </div>
                                                                                    <div className="lg:grid lg:grid-cols-2  grid grid-cols-1">
                                                                                        <span>De : &nbsp; {moment(exp?.from * 1000).format("DD/MM/YYYY")}</span>
                                                                                        <span>À : &nbsp; {moment(exp?.to * 1000).format("DD/MM/YYYY")}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div >
                                                                                    <span></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="border-black border-2">
                                                                                <div className="grid grid-cols-3 ">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">SOCIÉTÉ</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.companyName ? exp?.companyName : '-'}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Secteur d’activité</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.activity_area ? exp?.activity_area : '-'}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Poste</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.jobTitle ? exp?.jobTitle : '-'}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Titre &amp; Objectif(s) de la mission</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.projectObjective ? exp?.projectObjective : '-'}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Activités réalisées</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.accomplishments ? exp?.accomplishments : '-'}</span>
                                                                                </div>
                                                                                {exp?.programmingLanguagesUsed ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Langages de programmation</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.programmingLanguagesUsed}</span>
                                                                                </div> : null}
                                                                                {exp?.softwareToolsUsed ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Logiciels / Outils utilisés</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.softwareToolsUsed}</span>
                                                                                </div> : null}
                                                                                {exp?.operatingSystem ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Système d’exploitation</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.operatingSystem ? exp?.operatingSystem : "-"}</span>
                                                                                </div> : null}
                                                                                <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                    <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Référence(s) entreprise</span>
                                                                                    <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.reference ? exp?.reference : '-'}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div> : null}
                                                    </div>
                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-gray-400  text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dialog-btn mr-[1.1vw]"
                                                            onClick={() => { localStorage.setItem('isPreview', true); setTab("Application"); }}
                                                        >
                                                            {lang === 'french' ? "Modifier" : "Edit"}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  text-sm font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                            onClick={(e) => handleSubmit(e)}
                                                        >
                                                            {lang === 'french' ? "Soumettre" : "Submit"}
                                                        </button>
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        {tab === 'Preview_Application' ?
                                            <div >
                                                <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                    {((existData?.application?.softSkills?.length > 0 && existData?.application?.softSkills[0]?.skill !== '') || (existData?.application?.toKnowYourSelft?.length > 0 && existData?.application?.toKnowYourSelft[0] !== '') || (existData?.application?.languages?.length > 0 && existData?.application?.languages[0]?.language !== '')) ?
                                                        <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                            <div className="bg-gray-200   text-center text-xl lg:text-[1.4vw] font-semibold padding-para">Compétences clés</div>
                                                            {existData?.application?.softSkills?.length > 0 && existData?.application?.softSkills[0]?.skill !== '' ? <div className="border-2 border-black">
                                                                <div className="bg-gray-300 border-b-2 border-black  text-center text-lg lg:text-[1.3vw] font-semibold padding-para">SAVOIR FAIRE &amp; OUTILS</div>
                                                                <div >
                                                                    <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                        <span className=" col-span-2 text-base lg:text-[1.2vw] font-semibold padding-para">Compétences</span>
                                                                        <span className="border-l-2 border-black  text-base lg:text-[1.2vw] font-semibold padding-para">Autonome</span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            existData?.application?.softSkills?.map((skill, index) => (
                                                                                <div key={index} className={existData?.application?.softSkills?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                    <span className="padding-para col-span-2 text-sm lg:text-[1.1vw]">{skill?.skill}</span>
                                                                                    <span className="border-l-2 border-black padding-para text-sm lg:text-[1.1vw]">{skill?.level}</span>

                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : null}
                                                            {existData?.application?.toKnowYourSelft?.length > 0 && existData?.application?.toKnowYourSelft[0] !== '' ? <div className="border-2 border-black">
                                                                <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">SAVOIR ÊTRE</div>
                                                                <div >
                                                                    <div className=" border-b-2 border-black padding-para  text-base lg:text-[1.2vw] font-semibold">
                                                                        Courageous
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            existData?.application?.toKnowYourSelft?.map((know, index) => (
                                                                                <div key={index} className={existData?.application?.toKnowYourSelft?.length - 1 === index ? "padding-para text-sm lg:text-[1.1vw]" : "padding-para border-b-2 border-black text-sm lg:text-[1.1vw]"}>
                                                                                    {know}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : null}
                                                            {existData?.application?.languages?.length > 0 && existData?.application?.languages[0]?.language !== '' ? <div className="border-2 border-black">
                                                                <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">LANGUES</div>
                                                                <div >
                                                                    <div className="grid grid-cols-2 border-b-2 border-black text-center">
                                                                        <span className="padding-para  text-base lg:text-[1.2vw] font-semibold">Anglais</span>
                                                                        <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold">Courant/Bilingue</span>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            existData?.application?.languages?.map((language, index) => (
                                                                                <div key={index} className={existData?.application?.languages?.length - 1 === index ? "grid grid-cols-2 text-center" : "grid grid-cols-2 border-b-2 border-black text-center"}>
                                                                                    <span className="padding-para text-sm lg:text-[1.1vw] ">{language?.language}</span>
                                                                                    <span className="border-l-2 border-black padding-para text-sm lg:text-[1.1vw]" >{language?.level}</span>

                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : null}
                                                        </div> : null}
                                                    {existData?.application?.education?.length > 0 && existData?.application?.education[0]?.education !== '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                        <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Education</div>

                                                        <div className="border-2 border-black">
                                                            <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">DIPLÔME(S)</div>
                                                            <div >
                                                                <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                    <span className="padding-para  text-base lg:text-[1.2vw] font-semibold">À</span>
                                                                    <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold col-span-2">Diplôme</span>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        existData?.application?.education?.map((diploma, index) => (
                                                                            <div key={index} className={existData?.application?.education?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                <span className="padding-para text-sm lg:text-[1.1vw]">{diploma?.to}</span>
                                                                                <span className="border-l-2 border-black padding-para col-span-2 text-sm lg:text-[1.1vw]">{diploma?.education}</span>

                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null}
                                                    {existData?.application?.internships?.length > 0 && existData?.application?.internships[0]?.internship !== '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                        {/* <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Formation(s)</div> */}

                                                        <div className="border-2 border-black">
                                                            <div className="bg-gray-300 border-b-2 border-black padding-para text-center text-lg lg:text-[1.3vw] font-semibold">Formation(s)</div>
                                                            <div >
                                                                <div className="grid grid-cols-3 border-b-2 border-black text-center">
                                                                    <span className="padding-para  text-base lg:text-[1.2vw] font-semibold">À</span>
                                                                    <span className="border-l-2 border-black padding-para text-base lg:text-[1.2vw] font-semibold col-span-2">Formation(s)</span>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        existData?.application?.internships?.map((intern, index) => (
                                                                            <div key={index} className={existData?.application?.internships?.length - 1 === index ? "grid grid-cols-3 text-center" : "grid grid-cols-3 border-b-2 border-black text-center"}>
                                                                                <span className="padding-para text-sm lg:text-[1.1vw]">{intern?.to}</span>
                                                                                <span className="border-l-2 border-black padding-para col-span-2 text-sm lg:text-[1.1vw]">{intern?.internship}</span>

                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null}
                                                    {existData?.application?.experience?.length > 0 && existData?.application?.experience[0]?.duration != '' && existData?.application?.experience[0]?.to != '' ? <div className="space-y-[10px] lg:space-y-[1.5vw]">

                                                        <div className="bg-gray-200  padding-para text-center text-xl lg:text-[1.4vw] font-semibold">Expérience Professionnelle</div>

                                                        <div className="space-y-[10px] lg:space-y-[1.5vw]">
                                                            {
                                                                existData?.application?.experience?.map((exp, index) => (
                                                                    <div key={index} >
                                                                        <div className="lg:grid lg:grid-cols-3">
                                                                            <div className="border-t-2 border-l-2 border-r-2 border-black padding-para space-y-2 lg:text-[1.1vw] font-semibold">
                                                                                <div className="">
                                                                                    <span>Durée : &nbsp; </span>
                                                                                    <span className="">{exp?.duration}</span>
                                                                                </div>
                                                                                <div className="lg:grid lg:grid-cols-2 grid grid-cols-1">
                                                                                    <span>De : &nbsp; {moment(exp?.from * 1000).format("DD/MM/YYYY")}</span>
                                                                                    <span>À : &nbsp; {moment(exp?.to * 1000).format("DD/MM/YYYY")}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div >
                                                                                <span></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="border-black border-2">
                                                                            <div className="grid grid-cols-3 ">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">SOCIÉTÉ</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.companyName ? exp?.companyName : '-'}</span>
                                                                            </div>
                                                                            <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Secteur d’activité</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.activity_area ? exp?.activity_area : '-'}</span>
                                                                            </div>
                                                                            <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Poste</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.jobTitle ? exp?.jobTitle : '-'}</span>
                                                                            </div>
                                                                            <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Titre &amp; Objectif(s) de la mission</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.projectObjective ? exp?.projectObjective : '-'}</span>
                                                                            </div>
                                                                            <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Activités réalisées</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.accomplishments ? exp?.accomplishments : '-'}</span>
                                                                            </div>
                                                                            {exp?.programmingLanguagesUsed ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Langages de programmation</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.programmingLanguagesUsed}</span>
                                                                            </div> : null}
                                                                            {exp?.softwareToolsUsed ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Logiciels / Outils utilisés</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.softwareToolsUsed}</span>
                                                                            </div> : null}
                                                                            {exp?.operatingSystem ? <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Système d’exploitation</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.operatingSystem ? exp?.operatingSystem : "-"}</span>
                                                                            </div> : null}
                                                                            <div className="grid grid-cols-3 border-t-2 border-black">
                                                                                <span className="padding-para border-r-2 border-black text-sm lg:text-[1.1vw] font-semibold ">Référence(s) entreprise</span>
                                                                                <span className="col-span-2  border-black padding-para text-sm lg:text-[1.1vw]">{exp?.reference ? exp?.reference : '-'}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div> : null}
                                                </div>

                                            </div>
                                            : null}
                                    </div>
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <Transition.Root show={open} as={Fragment} onClick={() => { setOpen(false); setUserSign(true); }}>
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
                                    <Dialog.Panel className={`relative transform  rounded-lg bg-white    shadow-xl transition-all sm:my-8  w-[40%]}`}>
                                        <div className='h-full '>

                                            <div className="bg-[#3399FF]  flex   flex-row   items-center  justify-center lg:h-[7vw]  text-white h-20 dialog-buttons1 border-b pl-[1vw] ">
                                                <div className="font-titillium font-semibold lg:text-[1.6vw] text-2xl ">
                                                    {
                                                        userSign ? "Se connecter" : (showVerify ? '' : "Créer un compte")
                                                    }
                                                </div>
                                                {/* <svg onClick={() => { setOpen(false); setUserSign(true) }} className="lg:w-[2vw] w-[28px] lg:h-[2vw] h-[28px] hover:cursor-pointer hover:w-[2.2vw] hover:h-[2.2vw] " fill="#f00000" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">

                                                    <g id="Layer_2" data-name="Layer 2">
                                                        <g id="invisible_box" data-name="invisible box">
                                                            <rect width="48" height="48" fill="none" />
                                                        </g>
                                                        <g id="icons_Q2" data-name="icons Q2">
                                                            <path d="M42,4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V6A2,2,0,0,0,42,4ZM32.3,29.5a2.1,2.1,0,0,1,.4,2.7,2,2,0,0,1-3.1.2L24,26.8l-5.6,5.6a2,2,0,0,1-3.1-.2,2.1,2.1,0,0,1,.4-2.7L21.2,24l-5.5-5.5a2.2,2.2,0,0,1-.4-2.7,2,2,0,0,1,3.1-.2L24,21.2l5.6-5.6a2,2,0,0,1,3.1.2,2.2,2.2,0,0,1-.4,2.7L26.8,24Z" />
                                                        </g>
                                                    </g>
                                                </svg> */}
                                            </div>

                                            {userSign ? <div className="lg:h-[25vw]  h-[20rem] lg:w-[25vw] w-[95vw]  flex flex-col justify-center lg:px-[1vw] px-[14px]">
                                                <div className=" lg:space-x-3 lg:mt-[1vw] mt-[8px]">
                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 flex items-center lg:h-[3vw] h-[43px] ">Mail ID</label> */}
                                                    <input type="text" disabled value={userSignDetails?.email} name="email" onChange={(e) => setUserSignDetails({ ...userSignDetails, 'email': e.target.value })} placeholder="Email" className="   focus:border-blue-300 focus:outline-none rounded-md w-full lg:h-[3vw] h-[40px] px-3 lg:text-[1.3vw] text-[18px]" />
                                                </div>
                                                <div className="flex lg:space-x-3 lg:mt-[3vw] mt-[50px] items-center border focus:border-blue-300 rounded-md">
                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 flex items-center lg:h-[3vw] h-[43px]">Password</label> */}
                                                    <input type={pswtype} value={userSignDetails?.password} name='password' onChange={(e) => setUserSignDetails({ ...userSignDetails, 'password': e.target.value })} placeholder="Mot de passe" className="rounded-md focus:border-none outline-none   border-none focus:outline-none  w-full lg:h-[3vw] h-[40px] px-3 lg:text-[1.3vw] text-[18px]" />
                                                    {/* <input type={pswtype} value={userSignDetails?.password} name='password' onChange={(e) => setUserSignDetails({ ...userSignDetails, 'password': e.target.value })} placeholder="Enter Your Password" className="col-span-3 border-2 focus:border-blue-300 focus:outline-none rounded-md w-full lg:h-[3vw] h-[40px] px-3 lg:text-[1.3vw] text-[18px]" /> */}
                                                    <span>
                                                        {pswtype === 'password' ? <svg onClick={() => setPSWType('text')} className="lg:w-[2vw] w-7 h-5 lg:h-[1.5vw]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z" fill="#A5A5A5" />
                                                            <path d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z" fill="#A5A5A5" />
                                                        </svg>
                                                            :
                                                            <svg onClick={() => setPSWType('password')} className="lg:w-[2vw] w-7 h-5 lg:h-[1.5vw]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z" fill="#A5A5A5" />
                                                                <path d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z" fill="#A5A5A5" />
                                                                <path d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z" fill="#A5A5A5" />
                                                                <path d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z" fill="#A5A5A5" />
                                                                <path d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z" fill="#A5A5A5" />
                                                            </svg>}
                                                    </span>
                                                </div>
                                                {/* <div className="lg:grid lg:grid-cols-5 lg:space-x-3  ">
                                                    <div className=" lg:text-[1.2vw] text-[17px] font-semibold font-titillium col-span-2 lg:flex hidden items-center  lg:h-[3vw] h-[40px]"></div>
                                                    <div className="col-span-3 flex items-center justify-start space-x-1 lg:mt-0 mt-[10px]">
                                                        <input className=" checkboxInput " type="checkbox" onChange={(e) => { if (pswtype === 'text') setPSWType('password'); else setPSWType('text'); }} />
                                                        <label className=" lg:text-[1.2vw] text-[17px] font-titillium">Show Password</label>
                                                    </div>
                                                </div> */}
                                                <div className="lg:space-x-3 lg:mt-[3vw] mt-[50px]">
                                                    <div className="col-span-4 flex items-center justify-between w-full ">
                                                        <div className="font-semibold lg:text-[1vw] text-[15px] lg:p-[0.5vw] p-2 border-black  text-[#3399FF] hover:cursor-pointer border dialog-btn" onClick={() => setUserSign(false)}>Créer un compte</div>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => userSigninHandler(e)}
                                                                className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  lg:text-[1.1vw] text-[15px] font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                            >
                                                                Continuer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                                (
                                                    showVerify ? <div className="lg:h-[20vw] h-[15rem] lg:w-[30vw] w-[90vw] flex items-center justify-center lg:text-[2vw] text-2xl">Veuillez vérifier votre email.</div>
                                                        :
                                                        <div className="lg:h-[40vw] h-[35rem] lg:w-[30vw] w-[90vw]  flex flex-col justify-center  overflow-y-scroll lg:px-[1vw] px-[14px]">
                                                            <div className="grid grid-cols-1">
                                                                <div className="lg:space-x-3 lg:mt-[1vw] mt-[30px] border rounded-md border-black">
                                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">First Name</label> */}
                                                                    <input type="text" name="firstName" value={userDetails?.firstName} onChange={(e) => setUserDetails({ ...userDetails, 'firstName': e.target.value })} placeholder="Prénom" className=" focus:border-blue-300 border-none focus:outline-none rounded-md lg:h-[3vw] h-[50px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                                </div>
                                                                <div className="lg:space-x-3 lg:mt-[3vw] mt-[30px] border rounded-md border-black">
                                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Last Name</label> */}
                                                                    <input type="text" name="lastName" value={userDetails?.lastName} onChange={(e) => setUserDetails({ ...userDetails, 'lastName': e.target.value })} placeholder="Nom" className=" focus:border-blue-300 border-none focus:outline-none rounded-md lg:h-[3vw] h-[50px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                                </div>
                                                                <div className="lg:space-x-3 lg:mt-[3vw] mt-[30px] border rounded-md border-black">
                                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Mail ID</label> */}
                                                                    <input type="email" disabled name="email" value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, 'email': e.target.value })} placeholder="Email" className=" focus:border-blue-300 border-none focus:outline-none rounded-md lg:h-[3vw] h-[50px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                                </div>
                                                                <div className="lg:space-x-3 lg:mt-[3vw] mt-[30px] border rounded-md border-black">
                                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Phone Number</label> */}
                                                                    <input type="tel" max={10} name="phoneNumber" value={userDetails?.phoneNumber} onChange={(e) => setUserDetails({ ...userDetails, 'phoneNumber': e.target.value })} placeholder="Numéro de portable" className=" focus:border-blue-300 border-none focus:outline-none rounded-md lg:h-[3vw] h-[50px] w-full px-3 lg:text-[1.3vw] text-[18px]" />
                                                                </div>
                                                                <div className="flex lg:space-x-3 lg:mt-[3vw] mt-[30px] items-center border border-black focus:border-blue-300 rounded-md">
                                                                    {/* <label className=" lg:text-[1.2vw] text-[17px] col-span-2 font-semibold font-titillium flex items-center justify-start lg:h-[3vw] h-[40px] ">Create Password</label> */}
                                                                    <input type={npswtype} name="password" value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, 'password': e.target.value })} placeholder="Mot de passe" className="focus:border-none outline-none rounded-md border-none focus:outline-none  w-full lg:h-[3vw] h-[50px] px-3 lg:text-[1.3vw] text-[18px]" />
                                                                    <span>
                                                                        {npswtype === 'password' ? <svg onClick={() => setNPSWType('text')} className="lg:w-[2vw] w-7 h-5 lg:h-[1.5vw]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z" fill="#A5A5A5" />
                                                                            <path d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z" fill="#A5A5A5" />
                                                                        </svg>
                                                                            :
                                                                            <svg onClick={() => setNPSWType('password')} className="lg:w-[2vw] w-7 h-5 lg:h-[1.5vw]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z" fill="#A5A5A5" />
                                                                                <path d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z" fill="#A5A5A5" />
                                                                                <path d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z" fill="#A5A5A5" />
                                                                                <path d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z" fill="#A5A5A5" />
                                                                                <path d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z" fill="#A5A5A5" />
                                                                            </svg>}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="lg:space-x-3 lg:mt-[3vw] mt-[30px]">
                                                                <div className="col-span-5 flex items-center justify-between">
                                                                    <div className="font-semibold lg:text-[1.1vw] text-[15px] lg:p-[0.5vw] p-2 border-black  text-[#3399FF] hover:cursor-pointer border dialog-btn" onClick={() => setUserSign(true)}>Se connecter</div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => newUserHandler(e)}
                                                                        className="inline-flex w-full justify-center rounded-md bg-[#3399FF]  lg:text-[1.1vw] text-[15px] font-semibold text-white shadow-sm hover:bg-[#33bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3399FF] dialog-btn"
                                                                    >
                                                                        Continuer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                )
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

export default Career;

// export async function getServerSideProps(context) {
//     const res = await axios.get(`https://7459-183-82-122-224.in.ngrok.io/career/roles/list`);
//     // let data = (await res.json());

//     // let data = (await res.json());
// console.log("res",res)
//     return {
//         props: { data:res?.daa }
//     }
// }    