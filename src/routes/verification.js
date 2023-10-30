import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";

function Verification() {
    const location = useLocation().search
    const navigate = useNavigate();
    const [show, setSHow] = useState(false)
let a= new URLSearchParams(location).get('authtoken');
    var decoded = jwt_decode(a);
    console.log("aaa",decoded)
    let val = '';
    localStorage.setItem("langPref", 'french');
    localStorage.setItem('isValid', '')
    localStorage.setItem("email", decoded.email);
    if ((decoded?.email?.includes('gmail')) || (decoded?.email?.includes('yahoo'))) {
        val = 'casual'
    } else {
        val = 'professional'
    }
    localStorage.setItem("visitorType", val);
    const handler = async (e) => {
        const token = new URLSearchParams(location).get('authtoken');
        console.log("nav", token)
        



        await axios.post(`https://bondaf-api.azurewebsites.net/users/verify`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async res => {
            console.log("res", res)

            if (res?.data?.code === 1) {
                await toast.success(res?.data?.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "layout-toast",
                });
                // setSHow(true);
                navigate('/career');
                // navigate('/career')

            } else if (res?.data?.code === 0) {
                await toast.warning(res?.data?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setSHow(true);
                // setInterval(function () { navigate('/career') }, 3000);
            }

        }).catch(error => {
            toast.error(error?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }
    return (
        <>
            <ToastContainer />
            <div className="h-screen  lg:pt-[5vw] pt-10 lg:flex flex lg:items-start items-center justify-center lg:justify-center">
                <div className="border border-dashed border-black flex flex-col items-center justify-center h-[15vw] w-[50vw]">
                    <div className="lg:flex flex lg:items-center items-center justify-center lg:justify-center">
                        <div className="flex items-center justify-center lg:mr-[2vw] mr-10">
                        Veuillez vérifier votre e-mail &#128073;
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button onClick={(e) => handler(e)} className="bg-[#3399FF] lg:px-[3vw] px-2 lg:w-[6vw] w-20 lg:h-[2.5vw] h-10 lg:text-[1.3vw] text-lg lg:py-[2vw] py-1 text-white rounded-md ">Suivant</button>
                        </div>
                    </div>
                    <div className=' lg:pt-[2vw] pt-5 lg:flex flex lg:items-center items-center justify-center lg:justify-center'>
                        {show ? <><p>Cliquez sur le lien pour visiter la page</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="underline text-[#3399FF]" onClick={() => { navigate('/career'); setSHow(false); }} >Redirect</button></> : null}
                    </div>
                </div>
            </div>


        </>
    );
}

export default Verification;