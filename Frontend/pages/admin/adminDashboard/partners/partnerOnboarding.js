import AdminSideBar from "@/components/AdminSideBar";
import { Separator } from "@/components/ui/separator";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popup from "@/components/Popup";
import { useState } from "react";

export default function partnerOnBoarding() {
    let [start, setStart] = useState(false);
    let [approval , setApproval] = useState(false);

    const approvedEvent = () => {
        setApproval(true);
        setStart(false);
    }

    const cancelEvent = () => {
        setStart(false);
    }

    const handleApprove = () => {
        setStart(true);
    }

    return (
        <>
            <div className=" flex">
                <AdminSideBar />
                <div className=" space-y-12">
                    <h1 className=" text-green-600 ml-20 text-2xl mt-8 ">Partners Onboarding</h1>
                    <div className=" space-y-4">
                        <div className=" w-[54rem] border h-48 ml-20 rounded-lg">
                            <div className="flex justify-between mt-4 ml-4 mr-4 mb-4">
                                <p className=" text-lg text-green-600">Ajay Rathore</p>
                                <p className=" text-lg text-gray-400">#123</p>
                            </div>
                            <Separator className="border-gray-400 ml-4 w-[52rem]" />
                            <div className=" flex justify-between mt-4 ml-4 mr-4 mb-2">
                                <p className=" text-sm text-gray-400">Request Date : 3/5/2024</p>
                                <p className=" text-xs text-gray-300 rounded-sm bord font-semibold p-2">{approval && <CheckCircleIcon className=" text-green-600" />}  <span className={approval && "text-green-600"}>{approval ? "Approved" : "Need Approval"}</span></p>
                            </div>
                            <div className=" flex justify-between ml-4 mr-4 mb-4 mt-4">
                                <div className="flex space-x-4">
                                    <p className=" text-green-600 text-xs hover:bg-green-200 hover:text-green-700 transition bg-green-100 p-2 rounded-lg w-20 text-center cursor-pointer" onClick={handleApprove}>APPROVE</p>
                                    <Popup open={start} title={"Do you want to Approve?"} cancel="Cancel" logout="Approve" logoutEvent={approvedEvent} cancelEvent={cancelEvent} />

                                    <p className=" text-red-600 text-xs hover:bg-red-200 hover:text-red-700 transition bg-red-100 p-2 rounded-lg w-20 text-center cursor-pointer">REJECT</p>
                                </div>
                                <p className=" cursor-pointer text-xs rounded-lg text-green-600 border-green-600 border p-2">VIEW DETAIL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}