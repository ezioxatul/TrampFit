import AdminSideBar from "@/components/AdminSideBar";
import { Separator } from "@/components/ui/separator";
import CancelIcon from '@mui/icons-material/Cancel';
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Textarea } from "@/components/ui/textarea"
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';

export default function partnerOnBoarding() {
    let router = useRouter()
    let [start, setStart] = useState(false);
    let [approval, setApproval] = useState(false);
    let [partnerOnboardingData, setPartnerOnboardingData] = useState([]);
    let [partnerId, setPartnerId] = useState();
    let [gymName, setGymName] = useState();
    let [partnerName, setPartnerName] = useState();
    let [email, setEmail] = useState();
    let [isChanged, setIsChanged] = useState(false);
    let [rejectionReason, setRejectionReason] = useState(false);
    let [rejectionConfirmation, setRejectionConfirmation] = useState(false);
    let [rejectionReasonMessage, setRejectionReasonMessage] = useState();
    let [partnerPendingRequest, setPartnerPendingRequest] = useState(false);

    useEffect(() => {

        let token = localStorage.getItem("adminToken");
        if (!token) {
            router.push('/admin');
        } else {
            try {

                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                fetch("http://localhost/adminDashboard/getPartnersOnboardingData", option).then(async (res) => {
                    let partnerOnboardingData = await res.json();

                    if (partnerOnboardingData.response) {

                        if (partnerOnboardingData.data.length > 0) {
                            partnerOnboardingData.data.map((val, i) => {

                                let timeZone = new Date(val.createdAt);

                                let date = `${timeZone.getDate()}/${timeZone.getMonth() + 1}/${timeZone.getFullYear()}`

                                partnerOnboardingData.data[i].createdAt = date

                            });

                            setPartnerOnboardingData(partnerOnboardingData.data);

                        } else {
                            setPartnerPendingRequest(true);
                        }

                    } else {
                        toast.error(partnerOnboardingData.message);
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }

    }, [isChanged]);

    const approvedEvent = async () => {
        try {
            const option = {
                method: "PUT"
            }
            let approvalResponse = await fetch(`http://localhost/adminDashboard/partnerApproval?partnerId=${partnerId}&partnerName=${partnerName}&gymName=${gymName}&email=${email}`, option);
            approvalResponse = await approvalResponse.json();

            if (approvalResponse.response) {
                setIsChanged(!isChanged);
                toast.success(approvalResponse.message);
            } else {
                toast.error(approvalResponse.message);
            }

        } catch (err) {
            console.log(err);
        }
        // setApproval(true);
        setStart(false);
    }

    const cancelEvent = () => {
        setStart(false);
    }

    const handleApprove = (e) => {
        let partnerInfo = e.target.id.split("+");

        setPartnerId(partnerInfo[0]);
        setGymName(partnerInfo[1]);
        setPartnerName(partnerInfo[2]);
        setEmail(partnerInfo[3]);

        setStart(true);
    }

    const handleRejection = (e) => {
        let partnerInfo = e.target.id.split("+");

        setPartnerId(partnerInfo[0]);
        setGymName(partnerInfo[1]);
        setPartnerName(partnerInfo[2]);
        setEmail(partnerInfo[3]);

        setRejectionConfirmation(true);
    }

    const rejectionEvent = () => {
        setRejectionConfirmation(false);
        setRejectionReason(true);
    }

    const cancelRejection = () => {
        setRejectionConfirmation(false);
    }

    const handleCancelSubmit = () => {
        setRejectionReason(false);
    }


    const getRejectionReason = (e) => {
        setRejectionReasonMessage(e.target.value);
    }

    const handleRejectedPartner = async () => {
        try {

            const option = {
                method: "PUT"
            }

            let rejectedResponse = await fetch(`http://localhost/adminDashboard/partnerRejected?partnerId=${partnerId}&partnerName=${partnerName}&gymName=${gymName}&email=${email}&rejectedReason=${rejectionReasonMessage}`, option);
            rejectedResponse = await rejectedResponse.json();

            if (rejectedResponse.response) {
                setIsChanged(!isChanged);
                setRejectionReason(false);
                toast.success(rejectedResponse.message)
            } else {
                toast.error(rejectedResponse.message)
            }

        } catch (err) {

            console.log(err);

        }
    }


    const openViewDetail = (e) => {
        let partnerInfo = e.target.id.split("+");

        let partnerId = partnerInfo[0];
        let gymName = partnerInfo[1];
        let partnerName = partnerInfo[2];
        let email = partnerInfo[3];
        let status = partnerInfo[4];
        router.push({
            pathname: `/admin/adminDashboard/partners/partnerOnboarding/${partnerId}`,
            query: {
                gymName: gymName,
                partnerName: partnerName,
                email: email,
                status: status
            }
        })
    }

    return (
        <>
            <div className=" flex">
                <AdminSideBar />
                <div className=" space-y-12">
                    <h1 className=" text-green-600 ml-20 text-2xl mt-8 ">Partners Onboarding</h1>
                    {
                        partnerPendingRequest === false ?

                            <div className=" space-y-6">
                                {
                                    partnerOnboardingData.map((val) => {
                                        return (
                                            <div className=" w-[54rem] border h-48 ml-20 rounded-lg">
                                                <div className="flex justify-between mt-4 ml-4 mr-4 mb-4">
                                                    <p className=" text-lg text-green-600">{val.partnerInfo.fullName}</p>
                                                    <p className=" text-lg text-gray-400">#{val.partnerId}</p>
                                                </div>
                                                <Separator className="border-gray-400 ml-4 w-[52rem]" />
                                                <div className=" flex justify-between mt-4 ml-4 mr-4 mb-2">
                                                    <p className=" text-sm text-gray-400">Request Date : {val.createdAt}</p>
                                                    <p className=" text-sm text-gray-300 rounded-sm  font-semibold p-2">{val.partnerInfo.status === "Rejected" && <CancelIcon className=" text-red-400 mt-[-0.2rem]" />}  <span className={val.partnerInfo.status === "Rejected" && "text-red-400"}>{val.partnerInfo.status === "Pending" ? "Need Approval" : val.partnerInfo.status}</span></p>
                                                </div>
                                                <div className=" flex justify-between ml-4 mr-4 mb-4 mt-4">
                                                    <div className="flex space-x-4">

                                                        <p className=" text-green-600 text-xs hover:bg-green-200 hover:text-green-700 transition bg-green-100 p-2 rounded-lg w-20 text-center cursor-pointer" id={`${val.partnerId}+${val.gymName}+${val.partnerInfo.fullName}+${val.partnerInfo.email}`} onClick={handleApprove}>APPROVE</p>
                                                        {
                                                            val.partnerInfo.status !== 'Rejected' &&
                                                            <p className=" text-red-600 text-xs hover:bg-red-200 hover:text-red-700 transition bg-red-100 p-2 rounded-lg w-20 text-center cursor-pointer" id={`${val.partnerId}+${val.gymName}+${val.partnerInfo.fullName}+${val.partnerInfo.email}`} onClick={handleRejection}>REJECT</p>

                                                        }



                                                    </div>
                                                    <p className=" cursor-pointer text-xs rounded-lg text-green-600 border-green-600 border p-2" id={`${val.partnerId}+${val.gymName}+${val.partnerInfo.fullName}+${val.partnerInfo.email}+${val.partnerInfo.status}`} onClick={openViewDetail}>VIEW DETAIL</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <Dialog open={rejectionReason}>
                                    <DialogContent className="w-[35rem] h-56">

                                        <Textarea placeholder="Enter the Message" className=' h-28 text-base resize-none' onChange={getRejectionReason} />
                                        <div className="flex float-right space-x-3">
                                            <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-2 mb-3 text-sm" onClick={handleCancelSubmit}>Cancel</Button>
                                            <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-2 mb-3 text-sm" onClick={handleRejectedPartner}>Submitt</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Popup open={start} title={"Do you want to Approve?"} cancel="Cancel" logout="Approve" logoutEvent={approvedEvent} cancelEvent={cancelEvent} />
                                <Popup open={rejectionConfirmation} title={"Do you want to Reject?"} cancel="Cancel" logout="Reject" logoutEvent={rejectionEvent} cancelEvent={cancelRejection} />
                            </div> :
                            <p className=" text-green-500 text-xl ml-12 text-center">No pending request...</p>
                    }

                    <ToastContainer />
                </div>
            </div>
        </>
    );
}