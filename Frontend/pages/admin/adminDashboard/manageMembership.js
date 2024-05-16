import AdminSideBar from "@/components/AdminSideBar";
import { Button } from "@/components/ui/button";
import AddIcon from '@mui/icons-material/Add';
import { Separator } from "@/components/ui/separator";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Input } from "@/components/ui/input"
import DialogTitle from '@mui/material/DialogTitle';
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Popup from "@/components/Popup";

export default function manageMembership() {
    let router = useRouter();
    let [isContain, setIsContain] = useState();
    let [ischanged, setIsChanged] = useState("");
    let [updateForm, setUpdateForm] = useState(false);
    let [membershipInfo, setMembershipInfo] = useState([]);
    let [planId, setPlanId] = useState();
    let [deactivatedId, SetDeactivatedId] = useState();
    let [start, setStart] = useState(false);
    let [viewPlanDetail, setViewPlanDetail] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("adminToken");
        if (token) {
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            fetch("http://localhost/adminDashboard/manageMembership", option).then(async (res) => {
                let membershipData = await res.json();

                if (!membershipData.response) {
                    router.push('/admin');
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            router.push('/admin');
        }

    }, [])

    useEffect(() => {
        fetch('http://localhost/adminDashboard/manageMembership/getMembershipDetails', { method: "GET" }).then(async (res) => {
            let membershipData = await res.json()
            // membershipData = membershipData.data;
            setMembershipInfo(membershipData.data);

            if (membershipData == undefined) {
                setIsContain(false)
            } else {
                setIsContain(true)
            }
        })
        console.log(membershipInfo)
    }, [ischanged])



    let [addMembership, setAddMembership] = useState(false);
    let [addMembershipData, setAddMembershipData] = useState({
        membershipName: "",
        amount: "",
        validity: "",
        session: "",
        description: ""
    });
    let [viewDetail, setViewDetail] = useState({
        name: "",
        amount: "",
        validity: "",
        description: "",
        session: "",
        status: ""
    });

    const openAddMembershipForm = () => {
        setUpdateForm(false);

        addMembershipData.membershipName = ""
        addMembershipData.amount = ""
        addMembershipData.validity = ""
        addMembershipData.session = ""
        addMembershipData.description = ""
        setAddMembershipData({ ...addMembershipData });

        setAddMembership(true);
    }

    const closeFormHandler = () => {
        setAddMembership(false);
    }

    const getValue = (e) => {

        if (e.target.name === "membershipName") {
            addMembershipData.membershipName = e.target.value;
        } else if (e.target.name === "amount") {
            addMembershipData.amount = e.target.value;
        } else if (e.target.name === "validity") {
            addMembershipData.validity = e.target.value;
        } else if (e.target.name === "session") {
            addMembershipData.session = e.target.value;
        } else {
            addMembershipData.description = e.target.value;
        }
        setAddMembershipData({ ...addMembershipData });

    }

    const addMembershipHandler = async () => {
        console.log(addMembershipData)
        let token = localStorage.getItem("adminToken");
        const option = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(addMembershipData)
        }

        try {

            let addMembershipResponse = await fetch("http://localhost/adminDashboard/manageMembership/addMembership", option);
            addMembershipResponse = await addMembershipResponse.json();

            if (addMembershipResponse.response) {
                setAddMembership(false);
                setIsChanged(!ischanged);
                toast.success("Membership added successfully");
            } else {

                setAddMembership(false);
                toast.error(addMembershipResponse.message);

            }

        } catch (err) {
            console.log(err);
        }
    }

    const updatePlanHandler = (e) => {
        let planinfo = e.target.id.split("+");

        addMembershipData.membershipName = planinfo[1]
        addMembershipData.amount = planinfo[2]
        addMembershipData.validity = planinfo[3];
        addMembershipData.description = planinfo[4];
        addMembershipData.session = planinfo[5];

        setAddMembershipData({ ...addMembershipData });
        setPlanId(planinfo[0]);

        setAddMembership(true);
        setUpdateForm(true);
        console.log()
    }


    const updateMembershipHandler = async () => {
        let token = localStorage.getItem("adminToken");

        const option = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(addMembershipData)
        }

        try {

            let updateResponse = await fetch(`http://localhost/adminDashboard/manageMembership/updateMembership?id=${planId}`, option);
            updateResponse = await updateResponse.json();

            if (updateResponse.message) {

                setAddMembership(false);
                setIsChanged(!ischanged);
                toast.success("Plan updated Successfully");

            } else {
                toast.error(updateResponse.message)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const deactivatedPlanHandler = (e) => {
        setStart(true);
        SetDeactivatedId(e.target.id);
    }

    const handleCancel = () => {
        setStart(false);
    }

    const handleDeactivation = async () => {
        let token = localStorage.getItem("adminToken");

        const option = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {

            let deleteResponse = await fetch(`http://localhost/adminDashboard/manageMembership/deleteMembership?id=${deactivatedId}`, option);
            deleteResponse = await deleteResponse.json();

            if (deleteResponse.response) {
                setStart(false);
                setIsChanged(!ischanged);
                toast.success("Plan deactivated Successfully");
            } else {
                setStart(false);
                toast.error(deleteResponse.message);
            }

        } catch (err) {
            console.log(err);
        }
    }


    const handleViewDetail = (e) => {
        let viewDetailArray = e.target.id.split("+");

        viewDetail.name = viewDetailArray[0];
        viewDetail.amount = viewDetailArray[1];
        viewDetail.validity = viewDetailArray[2];
        viewDetail.description = viewDetailArray[3];
        viewDetail.status = viewDetailArray[4];
        viewDetail.session = viewDetailArray[5];

        setViewDetail({ ...viewDetail });

        setViewPlanDetail(true);
    }

    const handleCloseViewDetail = () => {
        setViewPlanDetail(false);
    }

    return (
        <>
            <div className=" flex">
                <AdminSideBar />
                <div className=" space-y-4">
                    <div className=" flex mt-8 ml-20 w-[70vw] justify-between">
                        <h1 className="text-2xl text-green-600">Manage Membership</h1>
                        <Button className=" hover:bg-green-700 bg-green-600  mb-5" onClick={openAddMembershipForm}><AddIcon /> Add Membership</Button>
                        <Dialog open={addMembership}>
                            <DialogTitle className=" text-green-600">{updateForm ? "Update Membership" : "Add Membership"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText className=" mb-4 w-96">
                                    Enter the membership Details
                                </DialogContentText>
                                <div className=" space-y-10">
                                    <Input placeHolder="Membership Name" name="membershipName" onChange={getValue} value={addMembershipData.membershipName} />
                                    <Input placeHolder="Membership Amount" name="amount" onChange={getValue} value={addMembershipData.amount} />
                                    <Input placeHolder="Membership Validity" name="validity" onChange={getValue} value={addMembershipData.validity} />
                                    <Input placeHolder="Membership Session" name="session" onChange={getValue} value={addMembershipData.session} />
                                    <Textarea placeholder="Enter the Plan Description" className=" resize-none" name="description" onChange={getValue} value={addMembershipData.description} />
                                </div>
                                {/* <textarea placeHolder="Enter the Membership Description" name="membershipName" /> */}
                            </DialogContent>
                            <DialogActions className=" mr-4">
                                <Button className=" mr-3  hover:bg-green-700 w-20 bg-green-600 text-white" onClick={closeFormHandler}><CloseIcon />Cancel</Button>
                                {
                                    updateForm ?
                                        <Button className="  hover:bg-green-700 w-20 bg-green-600 text-white" onClick={updateMembershipHandler}>< ModeEditIcon />  Edit</Button>
                                        :
                                        <Button className="  hover:bg-green-700 w-20 bg-green-600 text-white" onClick={addMembershipHandler}><AddIcon />  Add</Button>
                                }

                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className=" space-y-8  ">
                        {
                            isContain ?
                                membershipInfo.map((info) => {
                                    return (
                                        <div className=" w-[54rem] h-56 border ml-20 rounded-lg">
                                            <div className=" mt-4 ml-4 mb-4 mr-4 flex justify-between">
                                                <h1 className=" text-lg text-green-600">{info.membershipName}</h1>
                                                <p className=" text-lg text-gray-400">#{info.id}</p>
                                            </div>
                                            <Separator className="border-gray-400 ml-4 w-[52rem]" />
                                            <div className=" flex justify-between  mt-4 ml-4 mr-4">
                                                <h1 className="text-sm text-gray-400">Amount : <CurrencyRupeeIcon className="text-sm mt-[-0.3rem]" />{info.amount}</h1>
                                                {
                                                    info.status === "Active" ?
                                                        <h1 className="text-sm text-green-600 bg-green-100  text-center w-20 pt-0.5 h-[1.7rem] rounded-lg">{info.status}</h1>
                                                        :
                                                        <h1 className="text-sm text-red-600 bg-red-100  text-center w-24 pt-0.5 h-[1.7rem] rounded-lg">{info.status}</h1>
                                                }
                                            </div>
                                            <div className="flex justify-between">
                                                <h1 className="text-sm text-gray-400 ml-4 mt-4">Validity : {info.validity}</h1>
                                                <h1 className="text-sm text-gray-400 ml-4 mr-5 mt-6">Session : {info.session}</h1>
                                            </div>

                                            <div className=" flex justify-between ml-4 mr-4 mt-6">
                                                <div className=" flex space-x-4">
                                                    {
                                                        info.status === "Active" ?
                                                            <>
                                                                <p className=" cursor-pointer text-xs rounded-lg text-yellow-500 bg-yellow-100  p-2 w-20 text-center" id={`${info.id}+${info.membershipName}+${info.amount}+${info.validity}+${info.description}+${info.session}`} onClick={updatePlanHandler}>EDIT PLAN</p>
                                                                <p className=" cursor-pointer text-xs rounded-lg text-red-600 bg-red-100 p-2 w-20 text-center" id={info.id} onClick={deactivatedPlanHandler}>DELETE</p>
                                                            </> :
                                                            <>
                                                                <p className=" cursor-pointer text-xs rounded-lg text-yellow-300 bg-yellow-50  p-2 w-20 text-center" >EDIT PLAN</p>
                                                                <p className=" cursor-pointer text-xs rounded-lg text-red-200 bg-red-50 p-2 w-20 text-center">DELETE</p>
                                                            </>
                                                    }

                                                </div>
                                                <p className=" cursor-pointer text-xs rounded-lg text-green-600 border-green-600 border p-2" id={`${info.membershipName}+${info.amount}+${info.validity}+${info.description}+${info.status}+${info.session}`} onClick={handleViewDetail}>VIEW PLAN DETAILS</p>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                isContain == false && <h1 className=" ml-20 text-center mt-[20vh] text-3xl text-green-600">No Membership Added...</h1>
                        }
                        <div className="mt-20"></div>
                        <Popup open={start} title={"Do you want to deactivated the plan?"} cancel="Cancel" logout="Remove" cancelEvent={handleCancel} logoutEvent={handleDeactivation} />
                        {/* view Plan Detail */}

                        <Dialog open={viewPlanDetail}>
                            <DialogContent className="w-[35rem] h-80">
                                <p className=" cursor-pointer hover:text-green-600 transition text-center mt-[-1rem] float-right mr-[-1rem]" onClick={handleCloseViewDetail}><CloseIcon /></p>
                                <div className=" flex justify-between ml-4 mr-4 mt-4">
                                    <p className="text-2xl text-green-600">{viewDetail.name}</p>
                                    {
                                        viewDetail.status === "Active" ?
                                            <p className="text-sm text-green-600 bg-green-100  text-center w-20 pt-0.5 h-[1.7rem] rounded-lg mt-2">{viewDetail.status}</p>
                                            :
                                            <p className="text-sm text-red-600 bg-red-100  text-center w-24 pt-0.5 h-[1.7rem] rounded-lg">{viewDetail.status}</p>

                                    }
                                </div>
                                <div className=" flex justify-between mr-5 space-x-2 mt-5">
                                    <p className="ml-4 text-green-600">Amount</p>
                                    <p className="ml-4 text-md text-gray-400"><CurrencyRupeeIcon className="text-sm mt-[-0.2rem]" />{viewDetail.amount} </p>
                                </div>
                                <div className=" flex justify-between mr-5 space-x-2 mt-5">
                                    <p className="ml-4 text-green-600">Validity</p>
                                    <p className="ml-4 text-md text-gray-400"> {viewDetail.validity}</p>
                                </div>

                                <div className=" flex justify-between mr-5 space-x-2 mt-5">
                                    <p className="ml-4 text-green-600">Session</p>
                                    <p className="ml-4 text-md text-gray-400"> {viewDetail.session}</p>
                                </div>

                                <div className=" space-y-2 mr-4 mt-4">
                                    <p className="ml-4 text-green-600">Description</p>
                                    <p className=" ml-4 text-gray-400">{viewDetail.description}</p>
                                </div>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}