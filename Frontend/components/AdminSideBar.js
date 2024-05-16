import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Person2Icon from '@mui/icons-material/Person2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ReceiptIcon from '@mui/icons-material/Receipt';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from 'react';
import Link from 'next/link';
import Popup from './Popup';
import { useRouter } from 'next/router';

export default function AdminSideBar() {

    let SideBarHeading = ['Users', 'Partners', 'Manage Membership', 'Payment History', 'Logout'];
    let partnerSubMenu = ['Booked Session', 'Partner Onboarding']

    let router = useRouter();
    let [open, setOpen] = useState(false)
    let [start, setStart] = useState(false);

    const handleExpandMore = () => {
        setOpen(true);
    };

    const handleExpandLess = () => {
        setOpen(false);
    };

    const logout = () => {
        setStart(!start);
    }


    const logoutEvent = () => {
        localStorage.removeItem('adminToken');
        setStart(false);
        router.push('/admin')
    }
    return (
        <>
            <div className=" w-72  m-[-8px] p-1  mb-10">
                <Link href="/admin/adminDashboard"><h1 className=' text-green-600 text-3xl font-semibold text-center mt-8 cursor-pointer'>TrampFit</h1></Link>

                <List className='bg-white mt-8 ml-6 space-y-2'>
                    {
                        SideBarHeading.map((text, index) => {
                            return (
                                index === 1 ?
                                    <>

                                        <ListItemButton className=' space-x-4 flex justify-between hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                            <Link href="/admin/adminDashboard/partners" className='flex space-x-4 '>
                                                <HandshakeIcon className='text-2xl' />
                                                <ListItemText primary={text} />
                                            </Link>
                                            {
                                                open ? <ExpandLess onClick={handleExpandLess} /> : <ExpandMore onClick={handleExpandMore} />
                                            }
                                        </ListItemButton>


                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List className='bg-white space-y-2'>
                                                {
                                                    partnerSubMenu.map((val, i) => {
                                                        return (
                                                            i === 0 ?
                                                                <ListItemButton sx={{ pl: 4 }} className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                                    <FitnessCenterIcon className='text-2xl' />
                                                                    <ListItemText primary={val} />
                                                                </ListItemButton> :
                                                                <Link href="/admin/adminDashboard/partners/partnerOnboarding">
                                                                    <ListItemButton sx={{ pl: 4 }} className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                                        <CheckBoxIcon className='text-2xl' />
                                                                        <ListItemText primary={val} />
                                                                    </ListItemButton>
                                                                </Link>
                                                        );
                                                    })
                                                }

                                            </List>
                                        </Collapse>
                                    </> :
                                    index === 0 ?
                                        <Link href="/admin/adminDashboard/users">
                                            <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                <Person2Icon className='text-2xl' />
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </Link> :
                                        index === 2 ?
                                            <Link href="/admin/adminDashboard/manageMembership">
                                                <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                    <CardTravelIcon className='text-2xl' />
                                                    <ListItemText primary={text} />
                                                </ListItemButton>
                                            </Link> :
                                            index === 3 ?
                                                <Link href="/admin/adminDashboard/paymentHistory">
                                                    <ListItemButton className=' space-x-4 hover:bg-green-100 hover:rounded-2xl hover:text-green-600'>
                                                        <ReceiptIcon className='text-2xl' />
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