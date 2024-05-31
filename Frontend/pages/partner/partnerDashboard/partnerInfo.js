import PartnerSideBar from "@/components/PartnerSideBar";
import { Avatar } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

export default function partnerInfo() {
    const inputClassName = "w-96 text-lg border-2";
    const labelClassName = "text-lg text-green-600 font-normal";
    const containerClassName = "ml-80";
    const router = useRouter();


    let [partnerData, setPartnerData] = useState({});
    let [gymData, setgymData] = useState({});




    useEffect(() => {
        let partnerToken = localStorage.getItem("partnerToken");
        if(!partnerToken){
            router.push("/partner/partnerLogin")
        }
        else{
            const options = {
                method: "GET",
                headers: {
                    Authorization : `Bearer ${partnerToken}`
                }
            }
            fetch("http://localhost/partnerDashboard/partnerInfo", options)
            .then(async(res)=>{
                let partnerInfo = await res.json()
                if(!partnerInfo.response){
                    router.push("/partner/partnerLogin")
                }
                else{
                    let gymLogo = partnerInfo.data.gymLogo;
                        gymLogo = gymLogo.substring(18);
                        let result = gymLogo.replace(/\\/g, '/')
                        partnerInfo.data.gymLogo = result
                        setPartnerData(partnerInfo.data.partnerInfo)
                        setgymData(partnerInfo.data)

                    console.log(partnerInfo.data)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }





    }, []);



    return (
        <>
            <div className="flex flex-col">
                <div className="flex">
                    <PartnerSideBar />
                        <Avatar className="w-36 mx-auto mt-12 h-36 text-6xl bg-black" src={gymData.gymLogo} />
                </div>
                <div className=" mt-[-5rem]">
                    <h1 className={`${containerClassName} text-2xl mb-4`}>Personal Information</h1>
                    <div className={`${containerClassName} flex mb-10`}>
                        <div className="mr-32 space-y-2">
                            <Label htmlFor="name" className={labelClassName}>
                                Name
                            </Label>
                            <Input type="text" value = {partnerData.fullName} className={inputClassName} />
                        </div>
                        <div className="ml-32 space-y-2">
                            <Label htmlFor="panNumber" className={labelClassName}>
                                PAN Number
                            </Label>    
                            <Input type="text" value = {gymData.panNumber} className={inputClassName} />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className={`${containerClassName} text-2xl mb-4 mt-4`}>Contact Information</h1>
                    <div className={`${containerClassName} flex mb-10`}>
                        <div className="mr-32 space-y-2">
                            <Label htmlFor="name" className={labelClassName}>
                                Mobile Number
                            </Label>
                            <Input type="text" value = {partnerData.mobileNumber} className={inputClassName} />
                        </div>
                        <div className="ml-32 space-y-2 mb-10">
                            <Label htmlFor="city" className={labelClassName}>
                                Email Address
                            </Label>
                            <Input type="text" value = {partnerData.email} className={inputClassName} />
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
}
