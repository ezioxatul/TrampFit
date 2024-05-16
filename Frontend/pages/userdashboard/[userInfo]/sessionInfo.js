import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserTable from "@/components/UserTable";
import UserSideBar from "@/components/UserSideBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Session() {
    let router = useRouter();
    let phoneNumber = router.query.userInfo
    let[fullName,setFullName] = useState();
    useEffect(()=>{
        setFullName(localStorage.getItem("fullName"));
    },[])
    let columnName = ["Session ID","Gym Name","City","Session Timing","Date",""];
    let rowData = [["#123456","Atul Fitness Club","Pathankot","6PM - 8PM","1-4-2024","View Detail"]];
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex">
                    <UserSideBar mobileNumber={phoneNumber} profileName={fullName}/>
                    <div className=" mx-auto mt-12">
                        <div className="flex w-[42rem] h-36 bg-white border-2 border-r-2 rounded-xl">
                            <div className="mt-2.5 ml-2 mr-5">
                                <CheckCircleIcon className=" h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <div className=" flex">
                                    <h1 className=" text-2xl mt-2 text-green-600">Last Booked Session</h1>
                                    <h1 className="text-sm mt-3.5 ml-60 mr-2 text-gray-400">Session #12345678</h1>
                                </div>
                                <div className="flex ml-[-2rem] mt-3">
                                    <LocationOnIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                    <p className="text-md  text-gray-400 mt-2">Atul Fitness Club</p>
                                </div>
                                <div className="flex ml-[-2rem] mt-3">
                                    <DateRangeIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                    <div className="flex ">
                                        <p className="text-md  text-gray-400 mt-2">26-3-2024 12:00 PM</p>
                                        <p className=" text-md text-green-600 ml-[21.5rem] mt-2 hover:text-green-700 cursor-pointer">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 rounded-xl mt-10 mb-10">
                            <UserTable columnName={columnName} rowData={rowData}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}