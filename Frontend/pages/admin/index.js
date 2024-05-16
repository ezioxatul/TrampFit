import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const router = useRouter();
    let [adminCredential, setAdminCredential] = useState({
        username: "",
        password: ""
    })

    let [activeUsername, setActiveUsername] = useState(false);
    let [activePassword, setActivePassword] = useState(false);
    const getAdminCredential = (e) => {
        if (e.target.name === 'username') {
            adminCredential.username = e.target.value;
            setAdminCredential({ ...adminCredential });
        } else {
            adminCredential.password = e.target.value;
            setAdminCredential({ ...adminCredential });
        }

    }

    const authenticateAdmin = async (e) => {
        e.preventDefault();

        if (adminCredential.username === "") {
            setActiveUsername(true);
            setActivePassword(false);
        } else if (adminCredential.password == "") {
            setActiveUsername(false);
            setActivePassword(true);
        } else {
            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminCredential)
            }

            let adminLogin = await fetch('http://localhost/adminLogin', option);
            adminLogin = await adminLogin.json();

            if (adminLogin.response) {
                let token = adminLogin.token;
                localStorage.setItem("adminToken", token);

                toast.success("Login Successfully");
                setTimeout(() => {
                    router.push('/admin/adminDashboard')
                }, 6000);

            } else {
                toast.error(adminLogin.message);
                adminCredential.username = ""
                adminCredential.password = ""
                setAdminCredential({ ...adminCredential });
            }
        }

    }
    return (
        <>
            <div className="flex mx-auto w-[60rem] h-[30rem]  mt-[22vh] justify-around space-x-4 ">
                <div className=" w-[350px] mt-12">
                    <CardHeader>
                        <CardTitle className="text-green-600">Login</CardTitle>
                        <CardDescription className="text-gray-400">Login with your admin credentials.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid w-full items-center gap-5">
                                <div className="flex flex-col space-y-1.5">
                                    <Input id="name" placeholder="Enter your username" type="text" className="mt-5  text-md" name="username" onChange={getAdminCredential} value={adminCredential.username} />
                                    {activeUsername && <p className="text-red-600 text-sm h-4">*username is required</p>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Input id="name" placeholder="Enter your password" type="password" className="text-md" name="password" onChange={getAdminCredential} value={adminCredential.password} />
                                    {activePassword && <p className="text-red-600 text-sm h-4">*Password is required</p>}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className=" hover:bg-green-700 bg-green-600 w-96 mb-5" onClick={authenticateAdmin}>Login</Button>
                        <ToastContainer />
                    </CardFooter>
                </div>
                <Separator orientation="vertical" className="h-96 my-auto bg-green-400 border " />
                <Image
                    src="/hero-image2.png" // Path to your image
                    alt="Description of the image" // Description of the image for accessibility
                    width={400} // Reduced width of the image
                    height={250} // Reduced height of the image
                    className="object-cover "
                />
            </div>
        </>
    )
}