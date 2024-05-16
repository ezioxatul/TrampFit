import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function partnerEmailVerification() {
    const [emailVerification, setEmailVerification] = useState(false);
    const [partnerDetails,setpartnerDetails] = useState({
        fullName: "",
        email: "",
        mobileNumber: ""
    })
    const router = useRouter();

    useEffect(()=>{
        let partnerInfo = localStorage.getItem("partnerDetails");
        partnerInfo = JSON.parse(partnerInfo);

        partnerDetails.email = partnerInfo.email;
        partnerDetails.mobileNumber = partnerInfo.mobileNumber;
        partnerDetails.fullName = partnerInfo.fullName;

        setpartnerDetails({...partnerDetails});

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
                body: JSON.stringify(partnerDetails)
            }

            let partnerResponse = await fetch('http://localhost/partner/partnerLogin', option);
            let jsonResponse = await partnerResponse.json();

            if (jsonResponse.response) {

                localStorage.setItem('token', jsonResponse.token)
                localStorage.removeItem('partnerDetails')
                toast.success(jsonResponse.message)
                
                setTimeout(() => {
                    router.push('/partner/partnerOnboarding');
                }, 2000)

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
                            <p className="text-center text-xl">Your email <span className=" text-green-600"> {partnerDetails.email} </span>has been verified Successfully .</p>
                            <center>
                                <Button className=" hover:bg-green-700 bg-green-600 w-36 text-md mb-5 " onClick={generateAccount} >Login</Button>
                            </center>
                        </div> :
                        <div className=" mt-20 mb-20 space-y-4">
                            <p className=" text-center text-xl">Please go to your <span className=" text-green-600"> {partnerDetails.email} </span> account</p>
                            <h1 className=" text-center text-xl">We have sent an verification email into your <span className=" text-green-600">google </span> account</h1>
                        </div>
                }
                <ToastContainer />
                <Footer />
            </div>
        </>
    )
}