import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserSideBar from "@/components/UserSideBar";
import UserTable from "@/components/UserTable";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Dialog from '@mui/material/Dialog';
import { Button } from "@/components/ui/button";
import DialogContent from '@mui/material/DialogContent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Membership() {
    let router = useRouter();
    let phoneNumber = router.query.userInfo
    let [fullName, setFullName] = useState();
    let [membershipDetails, setMembershipDetails] = useState([]);
    let [downloadLink, setDownloadLink] = useState([]);
    let [activeMembershipInfo, setActiveMembershipInfo] = useState({});
    let [activesubscription, setActiveSubscription] = useState(true);
    let [viewMembershipDetail, setViewMembershipDetail] = useState(false);
    let [displayViewDetail, setDisplayViewDetail] = useState([]);

    useEffect(() => {
        setFullName(localStorage.getItem("fullName"));
        try {

            let token = localStorage.getItem("token");

            if (token) {
                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                fetch('http://localhost/getMembershipDetails', option).then(async (res) => {

                    let membershipInfo = await res.json();
                    if (membershipInfo.response) {
                        let membershipData = membershipInfo.data[0].paymentInfo

                        let newMembershipInfo = [];


                        membershipData.map((val) => {
                            let membership = Object.values(val);


                            let downloadLinking = {}
                            downloadLinking.subscriptionId = membership[0]
                            downloadLinking.downloadLink = membership[6]

                            downloadLink.push(downloadLinking);

                            membership.pop();
                            membership.push('View Detail');
                            newMembershipInfo.push(membership);
                        })

                        setDownloadLink([...downloadLink]);

                        setMembershipDetails(newMembershipInfo);
                    } else {
                        toast.error(membershipInfo.message);

                        setTimeout(() => {
                            router.push('/');
                        }, 3000);
                    }


                }).catch((err) => {
                    console.log(err);
                })
            } else {
                router.push('/');
            }


        } catch (err) {
            console.log(err);
        }
    }, [])


    useEffect(() => {
        try {

            let token = localStorage.getItem("token");

            if (token) {
                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                fetch("http://localhost/getActiveMembershipDetails", option).then(async (res) => {

                    let activeMembership = await res.json();

                    if (activeMembership.response) {

                        let activedata = activeMembership.data[0].paymentInfo[0]

                        let activeLinks = {}
                        activeLinks.subscriptionId = activedata.subscriptionId
                        activeLinks.downloadLink = activedata.downloadInvoice

                        downloadLink.push(activeLinks);

                        setDownloadLink([...downloadLink]);

                        setActiveMembershipInfo(activedata);

                    } else {
                        setActiveSubscription(false);
                    }

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                router.push("/");
            }


        } catch (err) {
            console.log(err)
        }
    }, [])


    const handleViewDetail = (e) => {
        let data = e.target.id.split(",");
        console.log(downloadLink)
        downloadLink.map((val) => {
            if (data[0] == val.subscriptionId) {
                data.push(val.downloadLink);
            }
        })
        setDisplayViewDetail(data);

        setViewMembershipDetail(true);

    }

    const handleCloseViewDetail = () => {
        setViewMembershipDetail(false);
    }

    let columnName = ["Membership ID", "Membership Type", "Amount", "Start From", "Valid To", "Status", ""];

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex">
                    <UserSideBar mobileNumber={phoneNumber} profileName={fullName} />
                    <div className=" mx-auto mt-12">
                        {
                            activesubscription ?

                                <div className="flex w-[60rem] h-36 bg-white border-2 border-r-2 rounded-xl">
                                    <div className="mt-2.5 ml-2 mr-5">
                                        <FitnessCenterIcon className=" h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <div className=" flex">
                                            <h1 className=" text-2xl mt-2 text-green-600 w-48">{activeMembershipInfo.subscriptionName}</h1>
                                            <h1 className="text-sm mt-3.5 ml-[27rem]  text-gray-400">#{activeMembershipInfo.subscriptionId}</h1>
                                        </div>
                                        <div className=" flex justify-between">
                                            <div className="flex ml-[-2rem] mt-3">
                                                <CurrencyRupeeIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                                <p className="text-md  text-gray-400 mt-2">{activeMembershipInfo.paidAmount}</p>
                                            </div>
                                            <p className="text-green-600  mr-2   mt-5">{activeMembershipInfo.status}</p>
                                        </div>
                                        <div className="flex ml-[-2rem] mt-3">
                                            <DateRangeIcon className="h-6 w-6 mt-2 mr-2  text-green-600" />
                                            <div className="flex ">
                                                <h1 className="text-md  text-gray-400 mt-2">{activeMembershipInfo.startDate} To {activeMembershipInfo.endDate}</h1>
                                                <h1 className=" text-md text-green-600 ml-[38.5rem] mt-2 hover:text-green-700 cursor-pointer" id={`${activeMembershipInfo.subscriptionId},${activeMembershipInfo.subscriptionName},${activeMembershipInfo.paidAmount},${activeMembershipInfo.startDate},${activeMembershipInfo.endDate},${activeMembershipInfo.status}`} onClick={handleViewDetail}>View Detail</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <p className=" text-green-600 text-xl text-center">Does not have any membership</p>
                        }

                        <div className="border-2 rounded-xl mt-10 mb-10">
                            <UserTable columnName={columnName} rowData={membershipDetails} viewDetail={handleViewDetail} />
                        </div>
                        <Dialog open={viewMembershipDetail} className="mb-56">
                            <DialogContent className="w-[35rem] h-72 ">
                                <p className=" float-right text-gray-400 text-sm">#{displayViewDetail[0]}</p>
                                <div className=" flex justify-between ml-1 mr-1 mt-10">
                                    <p className=" text-green-600 text-lg">{displayViewDetail[1]}</p>
                                    {
                                        displayViewDetail[5] === "active" ?
                                            <p className="text-green-600 bg-green-100 rounded-lg w-20 text-center">{displayViewDetail[5]}</p> :
                                            <p className="text-red-600 bg-red-100 rounded-lg w-20 text-center">{displayViewDetail[5]}</p>
                                    }

                                </div>
                                <div className="flex justify-between ml-1 mr-3 mt-6">
                                    <p className="text-green-600">Amount</p>
                                    <p className="ml-4 text-md text-gray-400"><CurrencyRupeeIcon className="text-sm mt-[-0.2rem]" />{displayViewDetail[2]}</p>
                                </div>

                                <div className="flex justify-between ml-1 mr-3 mt-6">
                                    <p className="text-green-600">Start Date : <span className="text-gray-400 text-sm">{displayViewDetail[3]}</span></p>
                                    <p className="text-green-600">End Date : <span className="text-gray-400 text-sm">{displayViewDetail[4]}</span></p>
                                </div>

                                <div className="flex float-right space-x-4 mr-3 mt-2">
                                    <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 w-20 text-white mr-2 mb-3 h-10 " onClick={handleCloseViewDetail}>Close</Button>
                                    <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-5 mb-3 " ><Link href={displayViewDetail[7]}>Download Invoice</Link></Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <ToastContainer />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}