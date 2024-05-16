import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserSideBar from "@/components/UserSideBar";
import { Button } from "@/components/ui/button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function deleteAccount() {
    let router = useRouter();
    let queryParameter = router.query.userInfo;
    let phoneNumber = queryParameter;

    let [fullName, setFullName] = useState();
    let [buttonText, setButtonText] = useState("Request OTP");
    let [changingButton, setChangingButton] = useState(false);
    let [otp, setOtp] = useState("");
    let [response, setResponse] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        setFullName(localStorage.getItem("fullName"))
        if (token) {
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            fetch('http://localhost/tokenCheck', option).then(async (res) => {
                let tokenCheckResponse = await res.json();
                if (tokenCheckResponse.response) {
                    setResponse(true);
                } else {
                    toast.error(tokenCheckResponse.message);
                    setTimeout(()=>{
                        router.push("/");
                    },3000);
                    setResponse(false);
                }
            }).catch((err) => {
                setResponse(false);
            })
        } else {
            router.push('/');
        }

    }, [])

    const [open, setOpen] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setButtonText("Request OTP")
            setChangingButton(false)
        }, 1000)

    };

    const getOtp = (e) => {
        setOtp(e.target.value);
    }

    const enterOtp = async () => {
        if (buttonText === 'Request OTP') {
            setChangingButton(true);
            setButtonText("Verify OTP");
        } else {
            if (otp === '123456') {
                let token = localStorage.getItem("token");
                try {
                    const option = {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    let deleteAccount = await fetch("http://localhost/deleteUserDetails", option);
                    let deleteAccountResponse = await deleteAccount.json();

                    if (deleteAccountResponse.response) {
                        localStorage.removeItem("token");
                        router.push('/');
                    }
                } catch (err) {
                    console.log(err);
                }


            }
        }
    }
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className=" flex">
                    <UserSideBar mobileNumber={phoneNumber} profileName={fullName} />
                    <div className=" mb-10">
                        <h1 className=" font-semibold mt-8 ml-10 text-xl">When you delete your account :</h1>
                        <p className="mt-4 ml-10 text-lg">We will miss you !</p>
                        <ul className=" ml-20 mt-4 list-disc text-lg space-y-3" >
                            <li>You will not be able to access any of the previously reserved/attended workouts assigned to you</li>
                            <li>You will not get any updates about the latest offers and discounts</li>
                            <li>Membership plans offered/gifted to you will be lost</li>
                        </ul>
                        <h1 className=" font-semibold mt-8 ml-10 text-xl">How do I recover my TRAMPFIT account ?</h1>
                        <p className="mt-4 ml-10 text-lg">You CANNOT recover your TRAMPFIT account. If you wish to come back you will have to create a new account.</p>
                        <h1 className=" font-semibold mt-8 ml-10 text-xl">Your Data</h1>
                        <p className="mt-4 ml-10 text-lg">Depending on your usage of our services this data You can export all data linked to this account on might include</p>
                        <ul className=" ml-20 mt-4 list-disc text-lg space-y-3" >
                            <li>Identity and contact details</li>
                            <li>Location and activities</li>
                            <li>Your Transaction history</li>
                        </ul>

                        <Button className=" w-44 h-12 hover:bg-green-700 text-lg bg-green-600 ml-10 mt-8 p-2" onClick={handleClickOpen}>Delete Account</Button>
                        <ToastContainer />
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle className=" text-green-600">Verify Your Account !</DialogTitle>
                            <DialogContent>
                                <DialogContentText className=" mb-4 w-96">
                                    {
                                        changingButton ? <span>OTP was sent to <span className=" font-semibold text-black text-sm">{phoneNumber}</span></span> :
                                            "You will recieve a text to validate your number"
                                    }
                                </DialogContentText>
                                {
                                    changingButton ? <Input placeHolder="Enter the OTP" name="otp" value={otp} onChange={getOtp} /> :
                                        <Input value={phoneNumber} name="mobileNumber" />
                                }

                            </DialogContent>
                            <DialogActions className=" mr-4">
                                <Button onClick={handleClose} className=" mr-3  hover:bg-green-700 bg-green-600 text-white">Cancel</Button>
                                <Button className="  hover:bg-green-700 bg-green-600 text-white" onClick={enterOtp}>{buttonText}</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}