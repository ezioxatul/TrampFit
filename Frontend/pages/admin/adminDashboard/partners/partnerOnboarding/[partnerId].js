import AdminSideBar from "@/components/AdminSideBar";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "@/components/Popup";
import { Textarea } from "@/components/ui/textarea"
import CancelIcon from '@mui/icons-material/Cancel';

export default function viewGymDetail() {
    let router = useRouter();
    let [showLogo, setShowLogo] = useState(false);
    let [showInterior, setShowInterior] = useState(false);
    let [showDocument, setShowDocument] = useState();
    let [checkDocuments, setCheckDocuments] = useState({});
    let [getApproval, setGetApproval] = useState(false);
    let [rejectionConfirmation, setRejectionConfirmation] = useState(false);
    let [rejectionReason, setRejectionReason] = useState(false);
    let [rejectionReasonMessage, setRejectionReasonMessage] = useState();
    let partnerId = router.query.partnerId

    let status = router.query.status

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

                fetch(`http://localhost/adminDashboard/partnerViewDetail?partnerId=${partnerId}`, option).then(async (res) => {

                    let gymData = await res.json();

                    if (gymData.response) {

                        let gymLogo = gymData.data.gymLogo;
                        gymLogo = gymLogo.substring(18);
                        let result = gymLogo.replace(/\\/g, '/')
                        gymData.data.gymLogo = result

                        let interiorPhoto = gymData.data.interiorPhoto;
                        interiorPhoto = interiorPhoto.substring(18);
                        let interiorPhotoResult = interiorPhoto.replace(/\\/g, '/')
                        gymData.data.interiorPhoto = interiorPhotoResult

                        let document = gymData.data.panImage;
                        document = document.substring(18);
                        let documentResult = document.replace(/\\/g, '/')
                        gymData.data.panImage = documentResult

                        setCheckDocuments(gymData.data)

                    } else {
                        toast.error(gymData.message);
                    }

                }).catch((err) => {
                    console.log(err);
                })

            } catch (err) {
                console.log(err);
            }

        }

    }, []);

    const showLogoImage = () => {
        setShowLogo(true);
    }

    const closeShowLogo = () => {
        setShowLogo(false);
    }

    const showInteriorImage = () => {
        setShowInterior(true);
    }

    const closeInteriorImage = () => {
        setShowInterior(false);
    }

    const closeDocument = () => {
        setShowDocument(false)
    }

    const showDocumentImage = () => {
        setShowDocument(true)
    }

    const confirmApproval = () => {
        setGetApproval(true);
    }

    const cancelEvent = () => {
        setGetApproval(false);
    }

    const approvedEvent = async () => {
        let partnerName = router.query.partnerName;
        let gymName = router.query.gymName;
        let email = router.query.email;
        try {
            const option = {
                method: "PUT"
            }
            let approvalResponse = await fetch(`http://localhost/adminDashboard/partnerApproval?partnerId=${partnerId}&partnerName=${partnerName}&gymName=${gymName}&email=${email}`, option);
            approvalResponse = await approvalResponse.json();

            if (approvalResponse.response) {
                toast.success(approvalResponse.message);

                setTimeout(() => {
                    router.push('/admin/adminDashboard/partners/partnerOnboarding');
                }, 3000);
            } else {
                toast.error(approvalResponse.message);
            }

        } catch (err) {
            console.log(err);
        }

        setGetApproval(false)
    }


    const confirmRejection = () => {
        setRejectionConfirmation(true);
    }

    const cancelRejection = () => {
        setRejectionConfirmation(false);
    }

    const rejectionEvent = () => {
        setRejectionConfirmation(false);
        setRejectionReason(true);
    }

    const getRejectionReason = (e) => {
        setRejectionReasonMessage(e.target.value);
    }


    const handleCancelSubmit = () => {
        setRejectionReason(false);
    }

    const handleRejectedPartner = async () => {
        let email = router.query.email;

        try {

            const option = {
                method: "PUT"
            }

            let rejectedResponse = await fetch(`http://localhost/adminDashboard/partnerRejected?partnerId=${partnerId}&email=${email}&rejectedReason=${rejectionReasonMessage}`, option);
            rejectedResponse = await rejectedResponse.json();

            if (rejectedResponse.response) {
                setRejectionReason(false);
                toast.success(rejectedResponse.message)
                setTimeout(() => {
                    router.push('/admin/adminDashboard/partners/partnerOnboarding');
                }, 3000);
            } else {
                toast.error(rejectedResponse.message)
            }

        } catch (err) {

            console.log(err);

        }
    }


    return (
        <>
            <div className=" flex mb-10 ">
                <AdminSideBar />
                <div className=" mt-8 ml-20 ">
                    <div className="space-y-4">
                        <h1 className=" text-3xl text-green-600  ">Gym Partner Onboarding</h1>
                        <div className="flex justify-between mr-3">
                            <p className="text-base text-gray-400">Review and approve the gym partner's onboarding details.</p>
                            <p className=" text-sm text-gray-300 rounded-sm  font-semibold p-2">{status === "Rejected" && <CancelIcon className=" text-red-400 mt-[-0.2rem]" />}  <span className={status === "Rejected" && "text-red-400"}>{status === "Rejected" && "Rejected"}</span></p>
                        </div>
                    </div>
                    <div className="flex  space-x-32 mt-8">
                        <p className="text-green-600 text-lg ">Gym Name : </p>
                        <p className=" text-gray-400 text-lg">{checkDocuments.gymName}</p>
                    </div>
                    <div className=" flex mt-8 space-x-32">
                        <p className="text-green-600 text-lg flex">Description <span className="ml-2"> :</span> </p>
                        <p className=" text-gray-400 text-lg  w-[60rem]">{checkDocuments.gymDescription}</p>
                    </div>

                    <div className="flex mt-8 space-x-40">
                        <p className="text-green-600 text-lg flex">Logo <span className="ml-2"> :</span></p>
                        <div className="flex w-[60rem] justify-between mt-2">
                            <p className="text-gray-400 text-md"><InsertDriveFileOutlinedIcon className="mt-[-0.5rem]" /> Logo.png</p>
                            <Button className="  hover:bg-gray-50 w-20 bg-white text-gray-400 border float-right" onClick={showLogoImage}>View</Button>
                        </div>
                    </div>
                    <div className="flex mt-8 space-x-36">
                        <p className="text-green-600 text-lg mt-5">Photos : </p>
                        <div className="flex w-[60rem] justify-between mt-2">
                            <p className="text-gray-400 text-md mt-4"><InsertDriveFileOutlinedIcon className="mt-[-0.5rem]" /> Interior.png</p>
                            <Button className="  hover:bg-gray-50 w-20 bg-white text-gray-400 border float-right mt-4" onClick={showInteriorImage}>View</Button>
                        </div>
                    </div>

                    <div className="flex mt-8 space-x-24">
                        <p className="text-green-600 text-lg mt-5">Pan Number : </p>
                        <p className="text-gray-400 text-lg mt-5">{checkDocuments.panNumber}</p>
                    </div>

                    <div className="flex mt-8 space-x-24">
                        <p className="text-green-600 text-lg mt-5">GST Number : </p>
                        <p className="text-gray-400 text-lg mt-5">{checkDocuments.gstNumber}</p>
                    </div>

                    <div className="flex mt-8 space-x-28">
                        <p className="text-green-600 text-lg mt-5 flex ">Document<span className="ml-2"> :</span></p>
                        <div className="flex w-[60rem] justify-between ">
                            <p className="text-gray-400 text-md mt-5"><InsertDriveFileOutlinedIcon className="mt-[-0.5rem]" /> PanImage.png</p>
                            <Button className="  hover:bg-gray-50 w-20 bg-white text-gray-400 border mt-4" onClick={showDocumentImage}>View</Button>
                        </div>
                    </div>

                    <div className="flex float-right mt-5 mb-5 space-x-4 mr-6">
                        {
                            status !== "Rejected" &&
                            <Button className="  hover:bg-gray-50 w-20 bg-white text-gray-400 border mt-4" onClick={confirmRejection}>Reject</Button>
                        }
                        <Button className="  hover:bg-green-700 w-20 bg-green-600 text-white mt-4" onClick={confirmApproval}>Approve</Button>
                    </div>

                    {/* show Logo Dialog box */}
                    <Dialog open={showLogo}>
                        <DialogContent className="w-[35rem] h-[30rem] ">
                            <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={closeShowLogo}><CloseIcon /></p>
                            <center>
                                <Image
                                    src={checkDocuments.gymLogo}
                                    width={430}
                                    height={150}
                                    alt="gym logo"
                                    className="object-cover"
                                />
                            </center>
                        </DialogContent>
                    </Dialog>

                    {/* show Interior Image Dialog box */}
                    <Dialog open={showInterior}>
                        <DialogContent className="w-[35rem] h-[26rem] ">
                            <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={closeInteriorImage}><CloseIcon /></p>
                            <center>
                                <Image
                                    src={checkDocuments.interiorPhoto}
                                    width={630}
                                    height={250}
                                    alt="gym Interior"
                                    className="object-cover"
                                />
                            </center>
                        </DialogContent>
                    </Dialog>


                    {/* show Document Image Dialog box */}
                    <Dialog open={showDocument}>
                        <DialogContent className="w-[35rem] h-[26rem] ">
                            <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={closeDocument}><CloseIcon /></p>
                            <center>
                                <Image
                                    src={checkDocuments.panImage}
                                    width={630}
                                    height={250}
                                    alt="gym Interior"
                                    className="object-cover"
                                />
                            </center>
                        </DialogContent>
                    </Dialog>

                    {/* rejction message */}
                    <Dialog open={rejectionReason}>
                        <DialogContent className="w-[35rem] h-56">
                            <Textarea placeholder="Enter the Message" className=' h-28 text-base resize-none' onChange={getRejectionReason} />
                            <div className="flex float-right space-x-3">
                                <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-2 mb-3 text-sm" onClick={handleCancelSubmit}>Cancel</Button>
                                <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-2 mb-3 text-sm" onClick={handleRejectedPartner}>Submitt</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Popup open={getApproval} title={"Do you want to Approve?"} cancel="Cancel" logout="Approve" logoutEvent={approvedEvent} cancelEvent={cancelEvent} />
                    <Popup open={rejectionConfirmation} title={"Do you want to Reject?"} cancel="Cancel" logout="Reject" logoutEvent={rejectionEvent} cancelEvent={cancelRejection} />
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}