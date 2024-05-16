import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Separator } from "@/components/ui/separator";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Popover from '@mui/material/Popover';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";

export async function getStaticProps() {
    const res = await fetch('http://localhost/getActiveMembership',{method : "GET"})
    let information = await res.json()
    let planDetail = information.data;
    return { props: { planDetail } }
}

export default function browseGym({planDetail}) {
   
    
    let cityNameFirstColumn = ['Delhi', 'Bengaluru', 'Gurugram', 'Noida',
        'Chandigarh', 'Chennai', 'Gaziabad', 'Vadadara', 'Udaipur', 'Shimla',
        'Riapur', 'Madurai', 'Ludhiana', 'Kanpur', 'Guwahati', 'Dehradun',
        'Bhubaneswar', 'Amritsar', 'Amravati', 'Nashik']

    let cityNameSecondColumn = ['Mumbai', 'Pune', 'Hyderabad', 'Jaipur',
        'Ahmedabad', 'Kolkata', 'Faridabad', 'Jodhpur', 'Surat', 'Ranchi',
        'Patna', 'Lucknow', 'Kochi', 'Indore', 'Goa', 'Coimbatore', 'Bhopal',
        'Agra', 'Akola', 'Kolhapur']

    let featureNameFirstColumn = ['Air Conditioner', 'WiFi', 'Shower']
    let featureNameSecondColumn = ['Parking', 'Locker', 'Water Cooler']

    let [openingPopover, setOpeningPopover] = useState(false);

    let [open, setOpen] = useState(false);
    let [cityName, setCityName] = useState();
    let [payableAmount, setPayableAmount] = useState(planDetail[0].amount);

    let [firstStyle,setFirstStyle] = useState({
        bgColor:"bg-green-600",
        textColor:"text-white",
        iconColor:"text-white",
        sideText:"text-white"
    });

    let [secondStyle,setSecondStyle] = useState({
        bgColor:"bg-white",
        textColor:"text-green-600",
        iconColor:"text-green-600",
        sideText:"text-Black"
    });

    let [thirdStyle,setThirdStyle] = useState({
        bgColor:"bg-white",
        textColor:"text-green-600",
        iconColor:"text-green-600",
        sideText:"text-Black"
    });

    const handleCity = () => {
        setOpen(true)
    }

    const getCity = (e) => {
        setCityName(e.target.value);
        setOpen(false)
    }

    const handleAmenities = () => {
        setOpeningPopover(true)
    }

    const handleApplyAmmenities = () => {
        setOpeningPopover(false)
    }

    const selectFirstPlan = () => {
        setPayableAmount(planDetail[0].amount);

        // changing the css of the clicked div
        firstStyle.bgColor = "bg-green-600"
        firstStyle.textColor = "text-white"
        firstStyle.iconColor="text-white"
        firstStyle.sideText ="text-white"

        setFirstStyle({...firstStyle})

        secondStyle.bgColor = "bg-white",
        secondStyle.textColor = "text-green-600",
        secondStyle.iconColor= "text-green-600",
        secondStyle.sideText = "text-Black"

        setSecondStyle({...secondStyle})

        thirdStyle.bgColor = "bg-white",
        thirdStyle.textColor = "text-green-600",
        thirdStyle.iconColor= "text-green-600",
        thirdStyle.sideText = "text-Black"

        setThirdStyle({...thirdStyle})
    }   


    const selectSecondPlan = () => {

        setPayableAmount(planDetail[1].amount);

        secondStyle.bgColor = "bg-green-600"
        secondStyle.textColor = "text-white"
        secondStyle.iconColor="text-white"
        secondStyle.sideText ="text-white"

        setSecondStyle({...secondStyle})


        firstStyle.bgColor = "bg-white",
        firstStyle.textColor = "text-green-600",
        firstStyle.iconColor= "text-green-600",
        firstStyle.sideText = "text-Black"

        setFirstStyle({...firstStyle})

        thirdStyle.bgColor = "bg-white",
        thirdStyle.textColor = "text-green-600",
        thirdStyle.iconColor= "text-green-600",
        thirdStyle.sideText = "text-Black"

        setThirdStyle({...thirdStyle})
    }

    const selectThirdPlan = () => {

        setPayableAmount(planDetail[2].amount);

        thirdStyle.bgColor = "bg-green-600"
        thirdStyle.textColor = "text-white"
        thirdStyle.iconColor="text-white"
        thirdStyle.sideText ="text-white"

        setThirdStyle({...thirdStyle}) 

        secondStyle.bgColor = "bg-white",
        secondStyle.textColor = "text-green-600",
        secondStyle.iconColor= "text-green-600",
        secondStyle.sideText = "text-Black"

        setSecondStyle({...secondStyle})

        firstStyle.bgColor = "bg-white",
        firstStyle.textColor = "text-green-600",
        firstStyle.iconColor= "text-green-600",
        firstStyle.sideText = "text-Black"

        setFirstStyle({...firstStyle})

    }   


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div >
                    <div className="flex  mt-6 p-10  relative">
                        <Input type="text" className=" w-[30rem] h-11 rounded-3xl border-2 border-green-600 mr-8 cursor-pointer pl-12 text-lg text-green-600" onClick={handleCity} value={cityName} />
                        <LocationOnIcon className="absolute mt-[0.6rem] ml-5 h-6 w-6 text-green-600" />

                        <Popover
                            open={open}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 200, left: 215 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >

                            <div className="w-96 h-96">
                                <RadioGroup className="flex  mt-5">
                                    <div className=" ml-6 space-y-5">
                                        {
                                            cityNameFirstColumn.map((val) => {
                                                return (
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value={val} id="r1" className="text-green-600 text-md border-gray-400" onClick={getCity} />
                                                        <Label htmlFor="r1" className="text-gray-400 text-md">{val}</Label>
                                                    </div>
                                                );

                                            })
                                        }
                                    </div>

                                    <div className=" ml-10 space-y-5">
                                        {
                                            cityNameSecondColumn.map((val) => {
                                                return (
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value={val} id="r1" className="text-green-600 text-md border-gray-400" onClick={getCity} />
                                                        <Label htmlFor="r1" className="text-gray-400 text-md">{val}</Label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </RadioGroup>
                            </div>

                        </Popover>


                        <Input type="text" placeholder={"Amenities"} className="text-black pt-1 pl-7 text-lg w-[30rem] h-11 rounded-3xl border-2 border-green-600 mr-8"  onClick={handleAmenities} />
                        <ArrowDropDownIcon className="absolute ml-[42rem] mt-1.5 h-8 w-8 text-green-600" />
                        <Popover
                            open={openingPopover}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 200, left: 595 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className="w-96 h-36 flex mt-3 ml-2 ">
                                <div>
                                    {
                                        featureNameFirstColumn.map((val) => {
                                            return (
                                                <div className="flex items-center ">
                                                    <Checkbox color="success" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-md "
                                                    >
                                                        {val}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className="ml-16">
                                    {
                                        featureNameSecondColumn.map((val) => {
                                            return (
                                                <div className="flex items-center ">
                                                    <Checkbox color="success" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-md "
                                                    >
                                                        {val}
                                                    </label>
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                            <div className="flex float-right space-x-4 p-5 pt-0 pr-10">
                                <Button className="h-8 w-20 hover:bg-gray-100 hover:border-gray-200  rounded-sm bg-white text-gray-400 border-2 border-gray-300">Clear</Button>
                                <Button className=" h-8 w-20 rounded-sm bg-green-600 text-white hover:bg-green-700" onClick={handleApplyAmmenities}>Apply</Button>
                            </div>
                        </Popover>

                        <Input type="text" placeholder={"Find the fitness center"} className=" text-lg pl-16 pt-1.5 w-[60rem] h-11 rounded-3xl border-2 border-gray-400" />
                        <SearchIcon className="absolute ml-[49rem] mt-[0.65rem] h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex mb-10 mt-5">
                        <div className="ml-10">
                            <div className=" w-[60rem] h-52 border-2 rounded-sm mb-5">
                                <div className=" flex border-b-2">
                                    <div className="flex">
                                        <div className="ml-3 mt-3 mb-3">
                                            <Image
                                                src="/gymname.png" // Path to your image
                                                alt="Description of the image" // Description of the image for accessibility
                                                width={100} // Reduced width of the image
                                                height={150} // Reduced height of the image
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="ml-8 mt-3">
                                            <h1 className=" text-lg font-semibold">Dream Gym Fitness & spa</h1>
                                            <h1 className="text-md text-gray-400">Sector 76 , Mohali</h1>
                                        </div>
                                    </div>
                                    <div className="w-96 ml-6 mt-3 flex">
                                        <Separator orientation="vertical" className="border-l-2 h-28 ml-4 mb-3 mr-6" />
                                        <h1 className="text-md  font-thin mt-2">A gym, short for gymnasium, is a dedicated indoor facility for physical exercise and sports activities.
                                            It offers a variety of equipment, spaces, and classes to cater to different fitness goals and preferences</h1>
                                    </div>
                                    <div className="flex ml-16 mt-24">
                                        <Link href={`/browseGym/Dream-gym-fitness-&-spa`} className="text-md text-green-600 cursor-pointer">View Details</Link>
                                        <KeyboardDoubleArrowRightIcon className=" text-green-600" />
                                    </div>
                                </div>
                                <div className="">
                                    <Button className=" w-36 h-12 hover:bg-green-700 text-md bg-green-600 mt-2.5 mb-3.5 mr-5 p-2 float-right">Reserve Workout</Button>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[30rem]">
                            <h1 className="text-xl font-semibold ml-12 mb-4">What is TRAMPFIT?</h1>
                            <div className=" ml-12">
                                <h1 className=" text-gray-500">TRAMPFIT is One membership to India's Largest Fitness Network</h1>
                                <ul className="  list-disc mt-4 ml-4">
                                    <li className="text-gray-500">Across 7,500+ gyms and fitness studios pan-india</li>
                                    <li className="text-gray-500">Access gyms and fitness studios anywhere , anytime-near your home, office or friends place</li>
                                </ul>
                            </div>
                            <Accordion type="single" className=" ml-12" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-xl hover:no-underline">How does it work ?</AccordionTrigger>
                                    <AccordionContent className=" space-y-2 text-gray-500 text-base">

                                        <p>1. Register or log in using your mobile number</p>
                                        <p>2. Choose a suitable plan and activate your TRAMPFIT pass</p>
                                        <p>3. Browse through studios and reserve a workout of your choice</p>
                                        <p>4. Attend the session to achieve your fitness goals</p>

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <h1 className="text-md ml-12 mt-5 text-gray-400">CHOOSE PLAN</h1>
                            <div className="flex ml-12 space-x-3 mt-5">
                                {
                                    planDetail.map((val, i) => {
                                        return (
                                            i === 0 ?
                                                <div className={ `w-36 h-16 border rounded-md border-green-600 ${firstStyle.bgColor} cursor-pointer`}  onClick={selectFirstPlan}>
                                                    <p className={`text-sm mt-5 text-center ${firstStyle.sideText} `}><CurrencyRupeeIcon className={`w-4 h-4 ${firstStyle.iconColor} mt-[-0.3rem]`} /><span className={`${firstStyle.textColor}`}>{val.amount}</span>/ {val.validity}</p>
                                                </div> :
                                                i === 2 ?
                                                    <div className={` w-36 h-16 border rounded-md border-green-600 ${thirdStyle.bgColor} cursor-pointer`}  onClick={selectThirdPlan} >
                                                        <p className={` text-sm mt-5 text-center ${thirdStyle.sideText} `}><CurrencyRupeeIcon className={` w-4 h-4 ${thirdStyle.iconColor} mt-[-0.3rem]`} /><span className={`${thirdStyle.textColor}`}>{val.amount}</span>/ {val.validity}</p>
                                                    </div> :
                                                    <div className={`w-36 h-16 border rounded-md border-green-600 ${secondStyle.bgColor} cursor-pointer`}  onClick={selectSecondPlan}>
                                                        <p className={`${secondStyle.sideText} text-sm text-center mt-5`}><CurrencyRupeeIcon className={`w-4 h-4 ${secondStyle.iconColor} mt-[-0.3rem]`} /><span className={`${secondStyle.textColor}`}>{val.amount}</span>/ {val.validity}</p>
                                                    </div>
                                        )
                                    })
                                }
                            </div>

                            <Accordion type="single" className=" ml-12 mt-4" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-sm hover:no-underline text-gray-400 font-normal">ORDER SUMMARY</AccordionTrigger>
                                    <AccordionContent className=" text-base flex justify-between">
                                        <p className=" font-semibold mt-4">Payable Amount</p>
                                        <p className=" font-semibold mt-4 text-green-600 "><CurrencyRupeeIcon className=" w-4 h-4 mt-[-0.3rem] text-green-600 " />{payableAmount}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="flex mt-10 ml-12">
                                <div className="h-12 w-[14rem] border-2 rounded-sm cursor-pointer">
                                    <p className="text-xl text-green-600 text-center mt-2"><CurrencyRupeeIcon className=" w-4 h-4 mt-[-0.3rem]" />{payableAmount}</p>
                                </div>
                                <div className="h-12 w-[14rem]  rounded sm bg-green-600 cursor-pointer">
                                    <p className="text-xl text-white text-center mt-2.5">PROCEED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Footer />
            </div >
        </>
    );
}