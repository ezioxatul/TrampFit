import * as React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import AdminSideBar from '@/components/AdminSideBar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import HandshakeIcon from '@mui/icons-material/Handshake';
export default function adminDashboard() {
    const router = useRouter();
    let [counts,setCounts] = useState({
        totalUsers : "",
        totalPartners : "",
        activeMembers : ""
    })
    useEffect(() => {
        let token = localStorage.getItem("adminToken");
        if (token) {
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                fetch("http://localhost/adminDashboard/count", option).then(async (response) => {
                    let adminTokenCheckResponse = await response.json();
                    if (!adminTokenCheckResponse.response) {
                        router.push('/admin');
                    } else {
                        counts.totalUsers = adminTokenCheckResponse.totalUsers;
                        counts.totalPartners = adminTokenCheckResponse.totalPartners;
                        counts.activeMembers = adminTokenCheckResponse.activeMembers;

                        setCounts({...counts});
                    }
                }).catch((err) => {
                    router.push("/admin")
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            router.push('/admin');
        }
    }, [])

    return (
        <>
            <div className=' flex'>
                <AdminSideBar />
                <div>
                    <h1 className='text-2xl mt-8 ml-20 text-green-600 font-semibold'>ADMIN DASHBOARD</h1>
                    <div className='flex justify-center ml-20 mr-20 mt-20 space-x-10 w-[70vw]'>
                        <div className='border w-60 h-36 rounded-xl'>
                            <p className='flex justify-between ml-5 mt-5 text-base text-gray-400 mr-5'>Total Users<GroupAddIcon className='text-green-500 text-4xl ' /></p>
                            <p className='text-3xl text-green-500 ml-5 mt-4'>{counts.totalUsers}</p>

                        </div>
                        <div className='border w-60 h-36 rounded-xl'>
                            <p className='flex justify-between ml-5 mt-5 text-base text-gray-400 mr-5'>Active Members<LoyaltyIcon className='text-green-500 text-4xl ' /></p>
                            <p className='text-3xl text-green-500 ml-5 mt-4'>{counts.activeMembers}</p>
                        </div>
                        <div className='border w-60 h-36 rounded-xl'>
                            <p className='flex justify-between ml-5 mt-5 text-base text-gray-400 mr-5'>Total Partners<HandshakeIcon className='text-green-500 text-4xl ' /></p>
                            <p className='text-3xl text-green-500 ml-5 mt-4'>{counts.totalPartners}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}