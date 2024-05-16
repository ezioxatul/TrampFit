import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function paymentSuccess() {
    let router = useRouter();
    const handleClaimSession = async() => {
        try {

        
            let token = localStorage.getItem("token");
            const option = {
                method : "PUT",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }

            let sessionResponse = await fetch('http://localhost/claimSessions',option);
            sessionResponse = await sessionResponse.json();

            if(sessionResponse.response) {
                toast.success("Session Claimed Successfully");
                setTimeout(()=>{
                    router.push('/');
                },3000);
            } else {
                toast.error("Something went wrong !!");
            }

        } catch(err) {
            console.log(err);
        }

       
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="space-y-2 mt-10 mb-10">
                    <h1 className=" text-center text-xl ">Your membership  has been activated successfully. </h1>
                    <h1 className="text-center text-xl">claim your session by simply click on <span className="text-green-600 font-bold">Claim Now</span> button</h1>
                    <center>
                        <Button className=" hover:bg-green-700 bg-green-600 w-32 text-lg  mb-5 mt-5" onClick={handleClaimSession}> Claim Now </Button>
                    </center>
                    <ToastContainer />
                </div>
                <Footer />
            </div>
        </>
    )
}
