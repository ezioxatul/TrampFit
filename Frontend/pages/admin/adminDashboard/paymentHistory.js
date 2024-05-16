import SearchIcon from '@mui/icons-material/Search';
import { Input } from "@/components/ui/input";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AdminSideBar from "@/components/AdminSideBar";
import { Separator } from "@/components/ui/separator";
import Dialog from '@mui/material/Dialog';
import { Button } from "@/components/ui/button";
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function paymentHistory() {
    let router = useRouter();
    let [searchTransaction, setSearchTransaction] = useState();
    let [applyPaymentSearch, setApplyPaymentSearch] = useState(false);

    let [paymentDetails, setPaymentDetails] = useState();
    let [paymentHistoryDetail, setPaymentHistoryDetail] = useState({
        fullName: "",
        invoiceId: "",
        invoiceNumber: "",
        paidAmount: "",
        startDate: "",
        downloadInvoice: "",

    });
    let [viewPaymentHistory, setViewPaymentHistory] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("adminToken");
        if (token) {
            try {

                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                fetch("http://localhost/adminDashboard/paymentHistory", option).then(async (res) => {

                    let paymentInfo = await res.json();
                    if(paymentInfo.response) {
                        paymentInfo = paymentInfo.data;
                        setPaymentDetails(paymentInfo)

                    } else {
                        toast.error(paymentInfo.message);
                        setTimeout(()=>{
                            router.push('/admin');
                        },3000);
                    }

                }).catch((err) => {

                    console.log(err);

                })

            } catch (err) {
                console.log(err);
            }
        } else {
            router.push('/admin');
        }

    }, []);

    useEffect(() => {

        if (searchTransaction != undefined) {
            try {

                const option = {
                    method: "GET"
                }

                fetch(`http://localhost/adminDashboard/paymentHistory/searchTransaction?searchTransaction=${searchTransaction}`, option).then(async (res) => {

                    let paymentInfo = await res.json();

                    paymentInfo = paymentInfo.data;

                    setPaymentDetails(paymentInfo);

                }).catch((err) => {
                    console.log(err);
                })

            } catch (err) {
                console.log(err);
            }
        }

    }, [applyPaymentSearch])

    const handleViewHistory = (fullName, val) => {

        paymentHistoryDetail.fullName = fullName;
        paymentHistoryDetail.invoiceId = val.invoiceId;
        paymentHistoryDetail.invoiceNumber = val.invoiceNumber;
        paymentHistoryDetail.paidAmount = val.paidAmount;
        paymentHistoryDetail.downloadInvoice = val.downloadInvoice;
        paymentHistoryDetail.startDate = val.startDate;

        setPaymentHistoryDetail({ ...paymentHistoryDetail });

        setViewPaymentHistory(true);
    }

    const handleCloseButton = () => {
        setViewPaymentHistory(false);
    }

    const handleSearchPaymentHistory = (e) => {
        setSearchTransaction(e.target.value);
        setApplyPaymentSearch(!applyPaymentSearch);
    }

    return (
        <>
            <div className="flex">
                <AdminSideBar />
                <div className=" mt-8 ml-20 ">
                    <h1 className="text-2xl text-green-600 ">Payment History</h1>
                    <div className='mt-10'>
                        <Input type="text" className=" text-lg  w-80 h-11 pl-10 border border-green-600" placeholder="Search " onChange={handleSearchPaymentHistory} />
                        <SearchIcon className="absolute ml-2  mt-[-2.1rem] h-6 w-6  text-green-600" />
                    </div>
                    <div className='mt-20 mb-20 space-y-10'>
                        {
                            paymentDetails != undefined &&
                            paymentDetails.map((info) => {
                                return (
                                    info.paymentInfo.map((val) => {
                                        return (
                                            <div className='w-[44rem] h-24 rounded-xl border cursor-pointer' onClick={() => { handleViewHistory(info.fullName, val) }}>
                                                <div className='flex justify-between ml-4 mr-6 mt-3 '>
                                                    <div className='flex space-x-3'>
                                                        <CheckCircleIcon className='text-green-600' />
                                                        <p className='text-gray-400'><CurrencyRupeeIcon className='text-lg mt-[-0.3rem]' />{val.paidAmount}</p>
                                                    </div>
                                                    <p className='text-green-600 text-lg'>Credited By</p>
                                                </div>
                                                <div className=' flex justify-between mt-3 ml-4 mr-6'>
                                                    <div className=' flex space-x-3'>
                                                        <p className='text-gray-400'>{val.startDate}</p>
                                                        <Separator orientation="vertical" className="h-6" />
                                                        <p className='text-gray-400'>Invoice Number : {val.invoiceNumber}</p>
                                                    </div>
                                                    <p className='text-gray-400'>{info.fullName}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            })
                        }

                        <Dialog open={viewPaymentHistory} className="">
                            <DialogContent className="w-[35rem] h-[17rem]">
                                <p className='float-right text-gray-400'><span className='text-green-600'>Invoice ID : </span>{paymentHistoryDetail.invoiceId}</p>
                                <div className='flex justify-between mt-10'>
                                    <p className=' text-green-600 '>Credited By </p>
                                    <p className='text-gray-400 '>{paymentHistoryDetail.fullName}</p>
                                </div>
                                <div className='flex justify-between mt-5'>
                                    <p className='text-green-600'>Amount</p>
                                    <p className='text-gray-400'><CurrencyRupeeIcon className='text-lg mt-[-0.3rem]' />{paymentHistoryDetail.paidAmount}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='text-green-600 mt-5'>Date : <span className='text-gray-400'>{paymentHistoryDetail.startDate}</span></p>
                                    <p className='text-green-600 mt-5'>invoice Number : <span className='text-gray-400'>{paymentHistoryDetail.invoiceNumber}</span></p>
                                </div>
                                <div className="flex float-right space-x-4  mt-2">
                                    <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 w-20 text-white mr-2 mb-3 h-10 " onClick={handleCloseButton}>Close</Button>
                                    <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-5 mb-3 " ><Link href={paymentHistoryDetail.downloadInvoice}>Download Invoice</Link></Button>
                                </div>
                                <ToastContainer />
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </>
    );
}