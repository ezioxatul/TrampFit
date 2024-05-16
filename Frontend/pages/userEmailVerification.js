import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function userEmailVerification() {
    const [emailVerification, setEmailVerification] = useState(false);
    const [userDetails,setUserDetails] = useState({
        fullName: "",
        email: "",
        gender: "",
        city: "",
        mobileNumber: ""
    })
    const router = useRouter();

    useEffect(()=>{
        let userInfo = localStorage.getItem("userDetails");
        userInfo = JSON.parse(userInfo);
    
        userDetails.city = userInfo.city;
        userDetails.email = userInfo.email;
        userDetails.mobileNumber = userInfo.mobileNumber;
        userDetails.fullName = userInfo.fullName;
        userDetails.gender = userInfo.gender;

        setUserDetails({...userDetails});

        if(router.query.response == undefined){
            setEmailVerification(true);
        }
    },[]);

    const generateAccount = async () => {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            }

            let userResponse = await fetch('http://localhost/userLogin', option);
            let jsonResponse = await userResponse.json();

            if (jsonResponse.response) {

                localStorage.setItem('token', jsonResponse.token)
                localStorage.removeItem('userDetails')
                toast.success(jsonResponse.message)
                setTimeout(() => {
                    router.push('/');
                }, 6000)

            } else {

                toast.error(jsonResponse.message);

            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                {
                    emailVerification ?
                        <div className=" mt-20 mb-24 space-y-8">
                            <p className="text-center text-xl">Your email <span className=" text-green-600"> {userDetails.email} </span>has been verified Successfully .</p>
                            <center>
                                <Button className=" hover:bg-green-700 bg-green-600 w-36 text-md mb-5 " onClick={generateAccount} >Login</Button>
                            </center>
                        </div> :
                        <div className=" mt-20 mb-20 space-y-4">
                            <p className=" text-center text-xl">Please go to your <span className=" text-green-600"> {userDetails.email} </span> account</p>
                            <h1 className=" text-center text-xl">We have sent an verification email into your <span className=" text-green-600">google </span> account</h1>
                        </div>
                }
                <ToastContainer />
                <Footer />
            </div>
        </>
    )
}