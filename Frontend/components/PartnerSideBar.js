import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Person2Icon from '@mui/icons-material/Person2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from 'react';
import Link from 'next/link';
import Popup from './Popup';
import { useRouter } from 'next/router';

export default function PartnerSideBar() {

    let SideBarHeading = ['Partner Info', 'Gym Info', 'Session History', 'Logout'];

    let router = useRouter();
    let [start, setStart] = useState(false);

    const logout = () => {
        setStart(!start);
    }

    const logoutEvent = () => {
        localStorage.removeItem('partnerToken');
        setStart(false);
        router.push('/partner/partnerLogin')
    }


    return (
        <>
            <div className=" w-72  m-[-8px] p-1  mb-10">
                <h1 className=' text-green-600 text-3xl font-semibold text-center mt-8 '>TrampFit</h1>

                <List className='bg-white mt-8 ml-6 space-y-2'>
                    {
                        SideBarHeading.map((text, index) => {
                            return (
                                index === 1 ?
                                    <>

                                        <ListItemButton className=' space-x-4 flex justify-between hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                            <Link href="/partner/partnerDashboard/gymInfo" className='flex space-x-4 '>
                                                <HandshakeIcon className='text-2xl' />
                                                <ListItemText primary={text} />
                                            </Link>
                                        </ListItemButton>

                                    </> :
                                    index === 0 ?
                                        <Link href="/partner/partnerDashboard/partnerInfo">
                                            <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                <Person2Icon className='text-2xl' />
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </Link> :
                                        index === 2 ?
                                            <Link href="/partner/partnerDashboard/sessionHistory">
                                                <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                    <CardTravelIcon className='text-2xl' />
                                                    <ListItemText primary={text} />
                                                </ListItemButton>
                                            </Link> :
                                            <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600' onClick={logout}>
                                                <LogoutIcon className='text-2xl' />
                                                <ListItemText primary={text} />
                                                <Popup open={start} title={"Do you Really want to Logout?"} cancel="Cancel" logout="Logout" logoutEvent={logoutEvent} cancelEvent={logout} />
                                            </ListItemButton>

                            )
                        })
                    }
                </List>
            </div>
        </>
    );
}