import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserSideBar from "@/components/UserSideBar";
import { Avatar } from "@mui/material";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
    let router = useRouter();
    let [loading,setLoading] = useState(false);
    let [response, setResponse] = useState();
    let [personalInfo, setPersonalInfo] = useState({
        name: "",
        city: "",
        mobileNumber: "",
        email: ""
    })
    const drawerWidth = 240;

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            try {

                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                fetch('http://localhost/getUserDetails', option).then(async (res) => {
                    let userDetailsResponse = await res.json();

                    if (userDetailsResponse.response) {

                        personalInfo.name = userDetailsResponse.personalInfo.fullName
                        personalInfo.city = userDetailsResponse.personalInfo.city
                        personalInfo.email = userDetailsResponse.personalInfo.email,
                            personalInfo.mobileNumber = userDetailsResponse.personalInfo.mobileNumber

                        setPersonalInfo({ ...personalInfo });

                        localStorage.setItem("fullName", personalInfo.name)

                        setResponse(true)

                    } else {
                        setResponse(false)
                        toast.error(userDetailsResponse.message);
                        setTimeout(()=>{
                            router.push('/');
                        },3000);
                        
                    }
                }).catch((err) => {
                    setResponse(false);
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            router.push('/');
        }

    }, []);
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex">
                    <UserSideBar mobileNumber={personalInfo.mobileNumber} profileName={personalInfo.name} />
                    <div className=" mx-auto mt-12">
                        <Avatar className=" w-36 h-36 text-6xl bg-black" src="/avtar.png"></Avatar>
                    </div>
                </div>
                <div>
                    <h1 className=" ml-96 text-3xl mb-4 ">Personal Information</h1>
                    <div className="flex ml-96 mb-10">
                        <div className="mr-32 space-y-2">
                            <Label htmlFor="name" className="text-lg text-green-600 font-normal">Name</Label>
                            <Input type="text" className=" w-96 text-lg border-2" value={personalInfo.name} />
                        </div>
                        <div className="ml-32 space-y-2">
                            <Label htmlFor="city" className="text-lg text-green-600 font-normal">City</Label>
                            <Input type="text" className=" w-96 text-lg border-2" value={personalInfo.city} />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className=" ml-96 text-3xl mb-4 mt-4 ">Contact Information</h1>
                    <div className="flex ml-96 mb-10">
                        <div className="mr-32 space-y-2">
                            <Label htmlFor="name" className="text-lg text-green-600 font-normal">Mobile Number</Label>
                            <Input type="text" className=" w-96 text-lg border-2" value={personalInfo.mobileNumber} />
                        </div>
                        <div className="ml-32 space-y-2 mb-10">
                            <Label htmlFor="city" className="text-lg text-green-600 font-normal">Email Address</Label>
                            <Input type="text" className=" w-96 text-lg border-2" value={personalInfo.email} />
                        </div>
                        <ToastContainer />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}