import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserTable from "@/components/UserTable";
import UserSideBar from "@/components/UserSideBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Session() {
    let router = useRouter();
    let phoneNumber = router.query.userInfo
    let [fullName, setFullName] = useState();
    let [userSessionInfo, setUserSessionInfo] = useState([]);
    let [lastBookedSession, setLastBookedSession] = useState({});
    let [viewSessionDetails, setViewSessionDetails] = useState(false);

    let [viewSessionDetail, setViewSessionDetail] = useState([]);
    let [viewLastSessionBooked, setViewLastSessionBooked] = useState(false);

    let [availableSlot, setAvailableSlot] = useState(false);

    useEffect(() => {
        setFullName(localStorage.getItem("fullName"));
        try {

            let userToken = localStorage.getItem("token");
            if (!userToken) {
                router.push('/login');
            } else {
                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }

                fetch('http://localhost/userDashboard/sessionInfo', option).then(async (res) => {

                    let sessionInfoResponse = await res.json();

                    let storeAllSessionData = [];

                    if (sessionInfoResponse.data.length > 0) {
                        sessionInfoResponse.data.map((val) => {
                            let getData = [];
                            let sessionBooking = Object.values(val);
                            let sessionInfo = Object.values(sessionBooking[2]);
                            let gymDetails = Object.values(sessionInfo[1]);

                            getData.push(sessionBooking[1]);
                            getData = [...getData, ...gymDetails];
                            getData.push(sessionInfo[0]);
                            getData.push(sessionBooking[0]);
                            getData.push("View Detail");
                            storeAllSessionData.push(getData);
                        })

                        setUserSessionInfo(storeAllSessionData);

                    } else {
                        setAvailableSlot(true);
                    }

                }).catch((err) => {
                    console.log(err);
                })
            }

        } catch (err) {
            console.log(err);
        }

    }, [])

    useEffect(() => {
        try {

            let userToken = localStorage.getItem("token");

            if (!userToken) {
                router.push('/login');
            } else {
                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }

                fetch('http://localhost/userDashboard/getLastBookedSession', option).then(async (res) => {

                    let lastBookedSession = await res.json();
                    console.log(lastBookedSession);
                    let obj = {
                        BookingId: lastBookedSession.data.id,
                        date: lastBookedSession.data.bookingDate,
                        sessionTime: lastBookedSession.data.sessionInfo.sessionTiming,
                        gymName: lastBookedSession.data.sessionInfo.gymDetails.gymName,
                        gymCity: lastBookedSession.data.sessionInfo.gymDetails.gymCity
                    }

                    setLastBookedSession(obj);

                }).catch((err) => {
                    console.log(err);
                })
            }

        } catch (err) {
            console.log(err);
        }

    }, []);
    let columnName = ["Booking ID", "Gym Name", "City", "Session Timing", "Date", ""];


    const handleViewDetail = (e) => {
        let sessionDetail = e.target.id.split(",");
        console.log(sessionDetail)
        setViewSessionDetail(sessionDetail);
        setViewSessionDetails(true);
    }

    const handleCloseViewDetail = () => {
        setViewSessionDetails(false);
    }


    const handleLastBooking = () => {
        setViewLastSessionBooked(true);
    }

    const handleCloseLastBooking = () => {
        setViewLastSessionBooked(false);
    }


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex">
                    <UserSideBar mobileNumber={phoneNumber} profileName={fullName} />
                    <div className=" mx-auto mt-12">
                        {
                            availableSlot == false ?

                                <div className="flex w-[44rem] h-36 bg-white border-2 border-r-2 rounded-xl">
                                    <div className="mt-2.5 ml-2 mr-5">
                                        <CheckCircleIcon className=" h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <div className=" flex">
                                            <h1 className=" text-2xl mt-2 text-green-600">Last Booked Session</h1>
                                            <h1 className="text-sm mt-3.5 ml-72 mr-2 text-gray-400">BookingID #{lastBookedSession.BookingId}</h1>
                                        </div>
                                        <div className="flex ml-[-2rem] mt-3">
                                            <LocationOnIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                            <p className="text-md  text-gray-400 mt-2">{lastBookedSession.gymName}</p>
                                        </div>
                                        <div className="flex ml-[-2rem] mt-3">
                                            <DateRangeIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                            <div className="flex ">
                                                <p className="text-md  text-gray-400 mt-2">{lastBookedSession.date} | {lastBookedSession.sessionTime}</p>
                                                <p className=" text-md text-green-600 ml-[23.5rem] mt-2 hover:text-green-700 cursor-pointer" onClick={handleLastBooking}>View Details</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <p className=" text-green-600 text-xl text-center">Oop's no Session Booked yet..</p>
                        }

                        <Dialog open={viewLastSessionBooked} className="mb-56">
                            <DialogContent className="w-[35rem] h-56 ">

                                <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={handleCloseLastBooking}><CloseIcon /></p>
                                <p className=" float-right mt-3 text-gray-400 mr-[-0.5rem]"><span className="text-green-600 mr-2">BookingID :</span> #{lastBookedSession.BookingId}</p>


                                <div className="flex justify-between ml-1 mt-12">
                                    <p className="text-green-600 ">{lastBookedSession.gymName}</p>
                                    <p className="text-green-600">Date : <span className="text-gray-400 text-sm">{lastBookedSession.date}</span></p>
                                </div>

                                <div className="flex justify-between ml-1 mt-5">
                                    <p className="text-green-600 ">Gym City : </p>
                                    <p className="text-gray-400 ">{lastBookedSession.gymCity}</p>
                                </div>

                                <div className="flex justify-between ml-1 mt-5">
                                    <p className="text-green-600 ">Session Timing : </p>
                                    <p className="text-gray-400 ">{lastBookedSession.sessionTime}</p>
                                </div>

                            </DialogContent>
                        </Dialog>
                        
                        {
                            availableSlot == false &&
                            <div className="border-2 rounded-xl mt-10 mb-10">
                                <UserTable columnName={columnName} rowData={userSessionInfo} viewDetail={handleViewDetail} />
                            </div>
                        }

                        <Dialog open={viewSessionDetails} className="mb-56">
                            <DialogContent className="w-[35rem] h-56 ">

                                <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={handleCloseViewDetail}><CloseIcon /></p>
                                <p className=" float-right mt-3 text-gray-400 mr-[-0.5rem]"><span className="text-green-600 mr-2">BookingID :</span> #{viewSessionDetail[0]}</p>


                                <div className="flex justify-between ml-1 mt-12">
                                    <p className="text-green-600 ">{viewSessionDetail[1]}</p>
                                    <p className="text-green-600">Date : <span className="text-gray-400 text-sm">{viewSessionDetail[4]}</span></p>
                                </div>

                                <div className="flex justify-between ml-1 mt-5">
                                    <p className="text-green-600 ">Gym City : </p>
                                    <p className="text-gray-400 ">{viewSessionDetail[2]}</p>
                                </div>

                                <div className="flex justify-between ml-1 mt-5">
                                    <p className="text-green-600 ">Session Timing : </p>
                                    <p className="text-gray-400 ">{viewSessionDetail[3]}</p>
                                </div>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}