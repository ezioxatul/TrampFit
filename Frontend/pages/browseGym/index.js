import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Separator } from "@/components/ui/separator";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from '@stripe/stripe-js';
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Popover from '@mui/material/Popover';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";
import Popup from "@/components/Popup";

export async function getStaticProps() {
    const res = await fetch('http://localhost/getActiveMembership', { method: "GET" })
    let information = await res.json()
    let planDetail = information.data;
    return { props: { planDetail } }
}


export default function browseGym({ planDetail }) {

    let [browseGymDetail, setBrowseGymDetail] = useState([]);
    let [searching, setSearching] = useState(false);
    let [searchText, setSearchText] = useState();
    let [nextStart, setNextStart] = useState(false);
    let [start, setStart] = useState(false);
    let [subscriptionId, setSubscriptionId] = useState();
    let [membershipDetails, setMembershipDetails] = useState({
        membershipId: planDetail[0].id,
        membershipPlan: planDetail[0].membershipName,
        selectPlanValidity: planDetail[0].validity,
        payableAmount: planDetail[0].amount,
        planDescription: planDetail[0].description
    })

    let [gymStudioData, setGymStudioData] = useState(false);
    let [cityName, setCityName] = useState("");
    let [airConditioner, setAirConditioner] = useState("");
    let [wifi, setWifi] = useState("");
    let [parking, setParking] = useState("");
    let [locker, setLocker] = useState("");
    let [shower, setShower] = useState("");
    let [waterCooler, setWaterCooler] = useState("");

    let featureNameFirstColumn = ['Air Conditioner', 'WiFi', 'Shower']
    let featureNameSecondColumn = ['Parking', 'Locker', 'Water Cooler']
    let [gymCities, setGymCities] = useState([]);
    let [activeFilter, setActiveFilter] = useState(false);
    let [activeCityFilter, setCityFilter] = useState(false);

    useEffect(() => {
        if ((airConditioner == "" && shower == "" && wifi == "" && locker == "" && parking == "" && waterCooler == "" ) || cityName == "") {
            try {

                const option = {
                    method: "GET"
                }

                fetch('http://localhost/browseGym', option).then(async (res) => {

                    let browseGymData = await res.json();
                    if (browseGymData.response) {

                        if (browseGymData.data.length > 0) {
                            setGymStudioData(false);
                            let gymCities = [];
                            browseGymData.data.map((val, i) => {
                                if (!gymCities.includes(val.gymCity)) {
                                    gymCities.push(val.gymCity);
                                }
                                let gymLogo = val.gymLogo;
                                gymLogo = gymLogo.substring(18);
                                let result = gymLogo.replace(/\\/g, '/')
                                browseGymData.data[i].gymLogo = result

                                let limitGymDescription = val.gymDescription.substring(0, 150);
                                browseGymData.data[i].gymDescription = limitGymDescription + "..."
                            })

                            setGymCities(gymCities);

                            setBrowseGymDetail(browseGymData.data);
                        } else {
                            setGymStudioData(true);
                        }

                    } else {
                        toast.error(browseGymData.message)
                    }

                }).catch((err) => {
                    console.log(err);
                })

            } catch (err) {
                console.log(err);
            }
        }

    }, [activeFilter,activeCityFilter])

    useEffect(() => {

        if (searchText != undefined) {
            try {

                const option = {
                    method: "GET"
                }

                fetch(`http://localhost/browseGym/searchGym?searchText=${searchText}`, option).then(async (res) => {

                    let browseGymData = await res.json();
                    if (browseGymData.response) {

                        if (browseGymData.data.length > 0) {
                            setGymStudioData(false);
                            browseGymData.data.map((val, i) => {
                                let gymLogo = val.gymLogo;
                                gymLogo = gymLogo.substring(18);
                                let result = gymLogo.replace(/\\/g, '/')
                                browseGymData.data[i].gymLogo = result

                                let limitGymDescription = val.gymDescription.substring(0, 150);
                                browseGymData.data[i].gymDescription = limitGymDescription + "..."
                            })

                            setBrowseGymDetail(browseGymData.data);
                        } else {
                            setGymStudioData(true);
                        }

                    } else {
                        toast.error(browseGymData.message)
                    }

                }).catch((err) => {
                    console.log(err);
                })

            } catch (err) {
                console.log(err);
            }
        }

    }, [searching])

    useEffect(() => {

        try {

            if (airConditioner != "" || shower != "" || wifi != "" || locker != "" || parking != "" || waterCooler != "") {
                const option = {
                    method: "GET"
                }

                fetch(`http://localhost/browseGym/applyAmenitiesFilter?AirConditioner=${airConditioner}&Shower=${shower}&wifi=${wifi}&locker=${locker}&parking=${parking}&waterCooler=${waterCooler}`, option).then(async (res) => {

                    let browseGymData = await res.json();
                    if (browseGymData.response) {
                        if (browseGymData.data.length > 0) {
                            setGymStudioData(false);
                            browseGymData.data.map((val, i) => {
                                let gymLogo = val.gymLogo;
                                gymLogo = gymLogo.substring(18);
                                let result = gymLogo.replace(/\\/g, '/')
                                browseGymData.data[i].gymLogo = result

                                let limitGymDescription = val.gymDescription.substring(0, 150);
                                browseGymData.data[i].gymDescription = limitGymDescription + "..."
                            })

                            setBrowseGymDetail(browseGymData.data);
                        } else {
                            setGymStudioData(true);
                        }

                    } else {
                        toast.error(browseGymData.message)
                    }


                }).catch((err) => {
                    console.log(err);
                })
            }

        } catch (err) {
            console.log(err);
        }

    }, [activeFilter])

    // city filter 

    useEffect(() => {

        if (cityName != "") {
            try {
                console.log("sdgfddggdgh")
                const option = {
                    method: "GET"
                }

                fetch(`http://localhost/browseGym/applyCityFilter?cityName=${cityName}`, option).then(async (res) => {

                    let browseGymData = await res.json();
                    if (browseGymData.response) {
                        browseGymData.data.map((val, i) => {
                            let gymLogo = val.gymLogo;
                            gymLogo = gymLogo.substring(18);
                            let result = gymLogo.replace(/\\/g, '/')
                            browseGymData.data[i].gymLogo = result

                            let limitGymDescription = val.gymDescription.substring(0, 150);
                            browseGymData.data[i].gymDescription = limitGymDescription + "..."
                        })

                        setBrowseGymDetail(browseGymData.data);

                    } else {
                        toast.error(browseGymData.message)
                    }


                }).catch((err) => {
                    console.log(err);
                })

            } catch (err) {
                console.log(err);
            }
        }



    }, [activeCityFilter])

    console.log(gymStudioData)
    const getSearchValue = (e) => {
        setSearching(!searching);
        setSearchText(e.target.value)
    }

    const notConfirmed = () => {
        setNextStart(false);
    }

    const openConfirmation = () => {
        setNextStart(true);
    }

    const handlePayment = async () => {

        setNextStart(false);
        const stripePromise = await loadStripe(process.env.payment_gateway_publish_key);

        try {
            let token = localStorage.getItem("token");

            if (token) {
                const option = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(membershipDetails)
                }

                let paymentResponse = await fetch('http://localhost/createSubscription', option);
                paymentResponse = await paymentResponse.json();

                if (paymentResponse.response) {

                    if (paymentResponse.sessionId) {

                        stripePromise.redirectToCheckout({
                            sessionId: paymentResponse.sessionId,
                        });

                    } else {

                        setStart(true);
                        setSubscriptionId(paymentResponse.subscriptionId);
                    }
                } else {
                    toast.error(paymentResponse.message);
                    setTimeout(() => {
                        router.push('/browseGym');
                    }, 3000);
                }
            } else {
                router.push('/login')
            }


        } catch (err) {
            console.log(err);
        }

    }

    const handleClose = () => {
        setStart(true);
    }


    const handleDelete = async () => {
        try {
            const option = {
                method: "DELETE"
            }
            let response = await fetch(`http://localhost/cancelSubscription?subscriptionId=${subscriptionId}`, option);
            response = await response.json();

            if (response.response) {
                setStart(false);
                toast.success("Plan has no more Exists");
            } else {
                toast.error("Something Went wrong !!");
            }

        } catch (err) {
            console.log(err);
        }
    }

    let [openingPopover, setOpeningPopover] = useState(false);

    let [open, setOpen] = useState(false);
    let [payableAmount, setPayableAmount] = useState(planDetail[0].amount);

    let [firstStyle, setFirstStyle] = useState({
        bgColor: "bg-green-600",
        textColor: "text-white",
        iconColor: "text-white",
        sideText: "text-white"
    });

    let [secondStyle, setSecondStyle] = useState({
        bgColor: "bg-white",
        textColor: "text-green-600",
        iconColor: "text-green-600",
        sideText: "text-Black"
    });

    let [thirdStyle, setThirdStyle] = useState({
        bgColor: "bg-white",
        textColor: "text-green-600",
        iconColor: "text-green-600",
        sideText: "text-Black"
    });



    const getFilterValue = (e) => {
        if (e.target.checked) {
            if (e.target.name === "Air Conditioner") {
                setAirConditioner(e.target.value);
            } else if (e.target.name === "WiFi") {
                setWifi(e.target.value);
            } else if (e.target.name === "Shower") {
                setShower(e.target.value);
            } else if (e.target.name === "Locker") {
                setLocker(e.target.value);
            } else if (e.target.name === "Parking") {
                setParking(e.target.value);
            } else {
                setWaterCooler(e.target.value);
            }
        } else {
            if (e.target.name === "Air Conditioner") {
                setAirConditioner("");
            } else if (e.target.name === "WiFi") {
                setWifi("");
            } else if (e.target.name === "Shower") {
                setShower("");
            } else if (e.target.name === "Locker") {
                setLocker("");
            } else if (e.target.name === "Parking") {
                setParking("");
            } else {
                setWaterCooler("");
            }
        }
    }

    const handleCity = () => {
        setOpen(true)
    }

    const getCity = (e) => {
        setCityName(e.target.value);
        setCityFilter(!activeCityFilter);
        setOpen(false)
    }

    const handleAmenities = () => {
        setWaterCooler("");
        setParking("");
        setLocker("");
        setShower("");
        setWifi("");
        setAirConditioner("");
        setOpeningPopover(true)
    }

    const handleApplyAmmenities = () => {
        setActiveFilter(!activeFilter);
        setOpeningPopover(false)
    }

    const handleClosing = () => {
        setActiveFilter(!activeFilter);
        setOpeningPopover(false)
    }

    const selectFirstPlan = (i) => {

        membershipDetails.membershipId = planDetail[i].id;
        membershipDetails.membershipPlan = planDetail[i].membershipName;
        membershipDetails.selectPlanValidity = planDetail[i].validity;
        membershipDetails.payableAmount = planDetail[i].amount;
        membershipDetails.planDescription = planDetail[i].description;

        setMembershipDetails({ ...membershipDetails });

        setPayableAmount(planDetail[0].amount);

        // changing the css of the clicked div
        firstStyle.bgColor = "bg-green-600"
        firstStyle.textColor = "text-white"
        firstStyle.iconColor = "text-white"
        firstStyle.sideText = "text-white"

        setFirstStyle({ ...firstStyle })

        secondStyle.bgColor = "bg-white",
            secondStyle.textColor = "text-green-600",
            secondStyle.iconColor = "text-green-600",
            secondStyle.sideText = "text-Black"

        setSecondStyle({ ...secondStyle })

        thirdStyle.bgColor = "bg-white",
            thirdStyle.textColor = "text-green-600",
            thirdStyle.iconColor = "text-green-600",
            thirdStyle.sideText = "text-Black"

        setThirdStyle({ ...thirdStyle })
    }


    const selectSecondPlan = (i) => {

        membershipDetails.membershipId = planDetail[i].id;
        membershipDetails.membershipPlan = planDetail[i].membershipName;
        membershipDetails.selectPlanValidity = planDetail[i].validity;
        membershipDetails.payableAmount = planDetail[i].amount;
        membershipDetails.planDescription = planDetail[i].description;

        setMembershipDetails({ ...membershipDetails });

        setPayableAmount(planDetail[1].amount);

        secondStyle.bgColor = "bg-green-600"
        secondStyle.textColor = "text-white"
        secondStyle.iconColor = "text-white"
        secondStyle.sideText = "text-white"

        setSecondStyle({ ...secondStyle })


        firstStyle.bgColor = "bg-white",
            firstStyle.textColor = "text-green-600",
            firstStyle.iconColor = "text-green-600",
            firstStyle.sideText = "text-Black"

        setFirstStyle({ ...firstStyle })

        thirdStyle.bgColor = "bg-white",
            thirdStyle.textColor = "text-green-600",
            thirdStyle.iconColor = "text-green-600",
            thirdStyle.sideText = "text-Black"

        setThirdStyle({ ...thirdStyle })
    }

    const selectThirdPlan = (i) => {

        membershipDetails.membershipId = planDetail[i].id;
        membershipDetails.membershipPlan = planDetail[i].membershipName;
        membershipDetails.selectPlanValidity = planDetail[i].validity;
        membershipDetails.payableAmount = planDetail[i].amount;
        membershipDetails.planDescription = planDetail[i].description;

        setMembershipDetails({ ...membershipDetails });

        setPayableAmount(planDetail[2].amount);

        thirdStyle.bgColor = "bg-green-600"
        thirdStyle.textColor = "text-white"
        thirdStyle.iconColor = "text-white"
        thirdStyle.sideText = "text-white"

        setThirdStyle({ ...thirdStyle })

        secondStyle.bgColor = "bg-white",
            secondStyle.textColor = "text-green-600",
            secondStyle.iconColor = "text-green-600",
            secondStyle.sideText = "text-Black"

        setSecondStyle({ ...secondStyle })

        firstStyle.bgColor = "bg-white",
            firstStyle.textColor = "text-green-600",
            firstStyle.iconColor = "text-green-600",
            firstStyle.sideText = "text-Black"

        setFirstStyle({ ...firstStyle })

    }


    const handleCloseCities = () => {
        setOpen(false);
    }

    const clearCity = () => {
        setCityFilter(!activeCityFilter);
        setCityName("");
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

                            <div className="w-80">
                                <RadioGroup className="flex mt-5">
                                    <div className=" ml-6 mb-4 flex flex-wrap gap-x-16 gap-y-5">
                                        {
                                            gymCities.map((val) => {
                                                return (
                                                    <div className="flex w-20  items-center space-x-2">
                                                        <RadioGroupItem value={val} id="r1" className="text-green-600 text-md border-gray-400" onClick={getCity} />
                                                        <Label htmlFor="r1" className="text-gray-400 text-md">{val}</Label>
                                                    </div>
                                                );

                                            })
                                        }
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex float-right space-x-4 ml-1 p-5 pt-0 pr-10 mr-4">
                                <Button className="h-8 w-20 hover:bg-gray-100 hover:border-gray-200  rounded-sm bg-white text-gray-400 border-2 border-gray-300" onClick={clearCity}>Clear</Button>
                                <Button className="h-8 w-20 hover:bg-gray-100 hover:border-gray-200  rounded-sm bg-white text-gray-400 border-2 border-gray-300" onClick={handleCloseCities}>Close</Button>
                            </div>

                        </Popover>


                        <Input type="text" placeholder={"Amenities"} className="text-black pt-1 pl-7 text-lg w-[30rem] h-11 rounded-3xl border-2 border-green-600 mr-8 " value="" onClick={handleAmenities} />
                        <ArrowDropDownIcon className="absolute ml-[42rem] mt-1.5 h-8 w-8 text-green-600" onClick={handleAmenities} />
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
                                                    <Checkbox color="success" value={val} onChange={getFilterValue} name={val} />
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
                                                    <Checkbox color="success" value={val} onChange={getFilterValue} name={val} />
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
                                <Button className="h-8 w-20 hover:bg-gray-100 hover:border-gray-200  rounded-sm bg-white text-gray-400 border-2 border-gray-300" onClick={handleClosing}>Close</Button>
                                <Button className=" h-8 w-20 rounded-sm bg-green-600 text-white hover:bg-green-700" onClick={handleApplyAmmenities}>Apply</Button>
                            </div>
                        </Popover>

                        <Input type="text" placeholder={"Find the fitness center"} className=" text-lg pl-16 pt-1.5 w-[60rem] h-11 rounded-3xl border-2 border-gray-400" onChange={getSearchValue} />
                        <SearchIcon className="absolute ml-[49rem] mt-[0.65rem] h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex mb-10 mt-5">
                        {
                            gymStudioData === false ?
                                <div className="ml-10 space-y-8">
                                    {
                                        browseGymDetail.map((val) => {
                                            return (
                                                <div className=" w-[60rem] h-36 border-2 rounded-sm mb-5">
                                                    <div className=" flex">
                                                        <div className="flex">
                                                            <div className="ml-3 mt-3 mb-3">
                                                                <Image
                                                                    src={val.gymLogo} // Path to your image
                                                                    alt="Description of the image" // Description of the image for accessibility
                                                                    width={100} // Reduced width of the image
                                                                    height={150} // Reduced height of the image
                                                                    className="object-cover rounded-md"
                                                                />
                                                            </div>
                                                            <div className="ml-8 mt-3">
                                                                <h1 className=" text-lg font-semibold">{val.gymName}</h1>
                                                                <h1 className="text-md text-gray-400">{val.gymLocation} , {val.gymCity}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="w-96 ml-6 mt-3 flex">
                                                            <Separator orientation="vertical" className="border-l-2 h-28 ml-4 mb-3 mr-6" />
                                                            <h1 className="text-md  font-thin mt-2">{val.gymDescription}</h1>
                                                        </div>
                                                        <div className="flex ml-16 mt-24">
                                                            <Link href={`/browseGym/${val.id}`} className="text-md text-green-600 cursor-pointer">View Details</Link>
                                                            <KeyboardDoubleArrowRightIcon className=" text-green-600" />
                                                        </div>
                                                    </div>
                                                    {/* <div className="">
                                                <Button className=" w-36 h-12 hover:bg-green-700 text-md bg-green-600 mt-2.5 mb-3.5 mr-5 p-2 float-right">Reserve Workout</Button>
                                            </div> */}
                                                </div>
                                            );
                                        })
                                    }

                                </div> :
                                <div className=" w-[60rem] ml-10 h-36 mb-5 ">
                                    <p className="text-green-600 text-center text-2xl mt-12">No gym  Found...</p>
                                </div>
                        }

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
                                                <div className={`w-36 h-16 border rounded-md border-green-600 ${firstStyle.bgColor} cursor-pointer`} onClick={() => { selectFirstPlan(i) }}>
                                                    <p className={`text-sm mt-5 text-center ${firstStyle.sideText} `}><CurrencyRupeeIcon className={`w-4 h-4 ${firstStyle.iconColor} mt-[-0.3rem]`} /><span className={`${firstStyle.textColor}`}>{val.amount}</span>/ {val.validity}</p>
                                                </div> :
                                                i === 2 ?
                                                    <div className={` w-36 h-16 border rounded-md border-green-600 ${thirdStyle.bgColor} cursor-pointer`} onClick={() => { selectThirdPlan(i) }} >
                                                        <p className={` text-sm mt-5 text-center ${thirdStyle.sideText} `}><CurrencyRupeeIcon className={` w-4 h-4 ${thirdStyle.iconColor} mt-[-0.3rem]`} /><span className={`${thirdStyle.textColor}`}>{val.amount}</span>/ {val.validity}</p>
                                                    </div> :
                                                    <div className={`w-36 h-16 border rounded-md border-green-600 ${secondStyle.bgColor} cursor-pointer`} onClick={() => { selectSecondPlan(i) }}>
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

                            {/* <ToastContainer /> */}
                            <div className="flex mt-10 ml-12">
                                <div className="h-12 w-[14rem] border-2 rounded-sm cursor-pointer">
                                    <p className="text-xl text-green-600 text-center mt-2"><CurrencyRupeeIcon className=" w-4 h-4 mt-[-0.3rem]" />{payableAmount}</p>
                                </div>
                                <div className="h-12 w-[14rem]  rounded sm bg-green-600 cursor-pointer">
                                    <p className="text-xl text-white text-center mt-2.5 cursor-pointer" onClick={openConfirmation}>PROCEED</p>
                                </div>
                            </div>
                        </div>
                        <Popup open={nextStart} title={"Recurring payment Confirmation"} cancel="No" logout="Yes" logoutEvent={handlePayment} cancelEvent={notConfirmed} />
                        <Popup open={start} contentItem={"Subscription Already exists"} title={"Do you want to cancel the subscription?"} cancel="close" logout="Delete" logoutEvent={handleDelete} cancelEvent={handleClose} />
                    </div>
                </div >
                <Footer />
            </div >
        </>
    );
}