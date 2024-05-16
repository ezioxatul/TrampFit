import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Separator } from "@/components/ui/separator";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HeatPumpIcon from '@mui/icons-material/HeatPump';
const calculateDay = (currentDay) => {
    let latestDay = "";
    switch (currentDay) {
        case 1:
            latestDay = "Mon"
            break;

        case 2:
            latestDay = "Tue"
            break;

        case 3:
            latestDay = "Wed"
            break;

        case 4:
            latestDay = "Thu"
            break;

        case 5:
            latestDay = "Fri"
            break;

        case 6:
            latestDay = "Sat"
            break;

        case 0:
            latestDay = "Sun"
            break;
    }

    return latestDay;
}


const calculateSevenDay = (currentDate) => {
    let reserveWorkout = [];
    let reserveDay = [];

    let nextDate = new Date(currentDate);
    let current = currentDate;
    reserveWorkout.push(current.getDate())

    reserveDay.push("/ " + calculateDay(current.getDay()));

    for (let i = 1; i <= 6; i++) {
        nextDate.setDate(current.getDate() + 1);
        reserveDay.push("/ " + calculateDay(nextDate.getDay()))
        reserveWorkout.push(nextDate.getDate())
        current = nextDate;
    }
    let finalReservation = [];
    finalReservation.push(reserveWorkout);
    finalReservation.push(reserveDay);
    return finalReservation;
}
export default function gymDetail() {
    let currentDate = new Date();
    let reserveWorkout = calculateSevenDay(currentDate);

    let selectPlan = [['1278.72', '2046.72', '5118.72'], ['1 Month', '1 Month', '3 Month']]



    let [firstPlanStyle, setFirstPlanStyle] = useState({
        textColor: "text-white",
        bgColor: "bg-green-600"
    })

    let [secondPlanStyle, setSecondPlanStyle] = useState({
        textColor: "",
        bgColor: ""
    })

    let [thirdPlanStyle, setThirdPlanStyle] = useState({
        textColor: "",
        bgColor: ""
    })

    let [changePara, setChangePara] = useState(false);
    let [changeInfo, setChangeInfo] = useState(false);
    let [payableAmount, setPayableAmount] = useState("1278.72")

    let [firstPara, setFirstPara] = useState({
        fontSize: "font-semibold",
        textColor: "text-black",
        border: "border-b-2",
        borderColor: "border-green-600"
    })

    let [secondPara, setSecondPara] = useState({
        fontSize: "",
        textColor: "text-gray-300",
        border: "",
        borderColor: ""
    })

    const firstParaSelect = () => {
        setChangePara(false)

        firstPara.fontSize = "font-semibold",
            firstPara.textColor = "text-black",
            firstPara.border = "border-b-2",
            firstPara.borderColor = "border-green-600"

        setFirstPara({ ...firstPara })

        secondPara.fontSize = ""
        secondPara.textColor = "text-gray-300"
        secondPara.border = ""
        secondPara.borderColor = ""

        setSecondPara({ ...secondPara })
    }

    const secondParaSelect = () => {
        setChangePara(true)

        secondPara.fontSize = "font-semibold",
            secondPara.textColor = "text-black",
            secondPara.border = "border-b-2",
            secondPara.borderColor = "border-green-600"

        setSecondPara({ ...secondPara })

        firstPara.fontSize = ""
        firstPara.textColor = "text-gray-300"
        firstPara.border = ""
        firstPara.borderColor = ""

        setFirstPara({ ...firstPara })
    }



    const firstPlan = () => {
        setChangeInfo(false)
        setPayableAmount(selectPlan[0][0])

        firstPlanStyle.textColor = "text-white"
        firstPlanStyle.bgColor = "bg-green-600"

        setFirstPlanStyle({ ...firstPlanStyle });

        secondPlanStyle.textColor = ""
        secondPlanStyle.bgColor = ""

        setSecondPlanStyle({ ...secondPlanStyle });

        thirdPlanStyle.textColor = ""
        thirdPlanStyle.bgColor = ""

        setThirdPlanStyle({ ...thirdPlanStyle })
    }

    const secondPlan = () => {
        setChangeInfo(true)
        setPayableAmount(selectPlan[0][1])

        secondPlanStyle.textColor = "text-white"
        secondPlanStyle.bgColor = "bg-green-600"

        setSecondPlanStyle({ ...secondPlanStyle });

        thirdPlanStyle.textColor = ""
        thirdPlanStyle.bgColor = ""

        setThirdPlanStyle({ ...thirdPlanStyle })

        firstPlanStyle.textColor = ""
        firstPlanStyle.bgColor = ""

        setFirstPlanStyle({ ...firstPlanStyle })
    }


    const thirdPlan = () => {
        setChangeInfo(true)
        setPayableAmount(selectPlan[0][2])

        thirdPlanStyle.textColor = "text-white"
        thirdPlanStyle.bgColor = "bg-green-600"

        setThirdPlanStyle({ ...thirdPlanStyle });

        firstPlanStyle.textColor = ""
        firstPlanStyle.bgColor = ""

        setFirstPlanStyle({ ...firstPlanStyle })

        secondPlanStyle.textColor = ""
        secondPlanStyle.bgColor = ""

        setSecondPlanStyle({ ...secondPlanStyle });

    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex mt-10 ml-10 space-x-6">
                    <div className=" space-y-10 mb-20">
                        <div className=" w-[60rem] h-56 border-2 rounded-sm mb-5 ">
                            <h1 className=" text-4xl font-semibold mt-3 ml-5">Dream Gym Fitness & spa</h1>
                            <div className="flex ml-5 mt-5 space-x-8">
                                <Image
                                    src="/gymname.png" // Path to your image
                                    alt="Description of the image" // Description of the image for accessibility
                                    width={100} // Reduced width of the image
                                    height={150} // Reduced height of the image
                                    className="object-cover rounded-md "
                                />
                                <div>
                                    <div className="flex space-x-2">
                                        <AccessTimeFilledIcon className=" text-gray-400" />
                                        <p className=" text-md font-semibold">Opening Time</p>
                                    </div>
                                    <p className="text-lg ml-12 font-semibold">06:30-20:00</p>
                                </div>

                                <div className="w-16 h-16 bg-green-600 rounded-md pt-2">
                                    <p className="text-white text-center">20+</p>
                                    <p className="text-white text-center">Reviews</p>
                                </div>

                                <div>
                                    <div className="flex space-x-2">
                                        <LocationCityIcon className=" text-gray-400" />
                                        <p className=" text-md font-semibold">Location</p>
                                    </div>
                                    <p className="text-md">Landmark-gurudwara</p>
                                    <p className="text-md">gursagar near suian wala</p>
                                    <p className="text-md">Hospital, sector 76,Mohali,</p>
                                    <p className="text-md">141008</p>
                                </div>
                            </div>
                        </div>

                        <div className=" w-[60rem] h-72 border-2 rounded-sm mb-5">
                            <div className=" mt-3 mr-5 ml-5 space-y-4">
                                <p className=" text-md ">
                                    Try the best fitness classes and premium gyms with one pass to india's Largest Fitness Network
                                    at no extra cost. Simply choose and reserve your preferred slot to workout hassle-free
                                </p>
                                <h1 className="text-2xl font-semibold">Reserve a Workout</h1>
                                <Separator className="border-gray-400" />
                                <div className=" flex space-x-2">
                                    {
                                        reserveWorkout[0].map((val, i) => {
                                            return (
                                                <div className="h-16 w-40 bg-gray-100 rounded-sm cursor-pointer">
                                                    <p className="text-md text-center mt-3"><span className="font-bold text-2xl">{val}</span>{reserveWorkout[1][i]}</p>
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                                <Separator className="border-gray-400" />
                            </div>
                        </div>

                        <div className="w-[60rem]  h-[30rem] border-2 rounded-sm mb-5 flex space-x-2">
                            <div className="h-96 w-[28rem]">
                                <div className="flex mt-6 ml-5  ">
                                    <p className={`text-xl ${firstPara.fontSize} ${firstPara.textColor} ${firstPara.border} w-60 pb-2 text-center ${firstPara.borderColor} cursor-pointer`} onClick={firstParaSelect}>What is TRAMPFIT ?</p>
                                    <p className={`text-xl ${secondPara.textColor} ${secondPara.border} ${secondPara.fontSize} w-60 pb-2 text-center ${secondPara.borderColor} cursor-pointer`} onClick={secondParaSelect}>How does it work ?</p>
                                </div>
                                {
                                    changePara ?
                                        <div className="ml-5 mt-8">
                                            <ul className=" list-disc ml-5 space-y-4">
                                                <li className="text-md">Register or log in using your mobile number</li>
                                                <li className="text-md">Choose a suitable plan and activate your TRAMPFIT pass</li>
                                                <li className="text-md">Browse through studios and reserve a workout of your choice</li>
                                                <li className="text-md">Attend the session to achieve your fitness goals</li>
                                            </ul>
                                        </div>
                                        :
                                        <div className="ml-5 mt-8">
                                            <ul className=" list-disc ml-5 space-y-4">
                                                <li className="text-md">TRAMPFIT is One membership to India's Largest Fitness Network</li>
                                                <li className="text-md">Across 7,500+ gyms and fitness studios pan-india</li>
                                                <li className="text-md">Access gyms and fitness studios anywhere , anytime-near your home, office or friends place</li>
                                            </ul>
                                        </div>
                                }

                            </div>
                            <div className=" h-80 w-[30rem]  mt-6 mr-5 ">
                                <h1 className="text-green-600 text-xl text-center mt-4 ">CHOOSE PLAN</h1>
                                <div className="flex ml-2  mt-5">
                                    <p className="h-8 w-28 text-xs border font-semibold text-center pt-2 rounded-sm ml-4">BASIC PLAN</p>
                                    <p className="h-8 w-28 text-xs bg-orange-400 text-white  font-semibold text-center pt-2 rounded-sm ml-12">PREMIUM</p>
                                    <p className="h-8 w-28 text-xs border bg-orange-400 text-white font-semibold text-center pt-2 rounded-sm ml-12">PREMIUM</p>
                                </div>
                                <div className="flex space-x-5 ml-2 mr-2 mt-4">
                                    {
                                        selectPlan[0].map((val, i) => {
                                            return (
                                                i === 0 ?
                                                    <div className={`w-36 h-28 border-2 rounded-lg border-green-600 ${firstPlanStyle.bgColor} pt-7 cursor-pointer`} onClick={firstPlan}>
                                                        <div className="flex justify-center">
                                                            <CurrencyRupeeIcon className={`text-lg ${firstPlanStyle.textColor} mt-0.5`} />
                                                            <p className={`font-bold ${firstPlanStyle.textColor}`}>{val}</p>
                                                        </div>
                                                        <p className={`text-center ${firstPlanStyle.textColor}`}>{selectPlan[1][i]}</p>
                                                    </div> :
                                                    i === 1 ?
                                                        <div className={`w-36 h-28 border-2 rounded-lg border-green-600  ${secondPlanStyle.bgColor} pt-7 cursor-pointer`} onClick={secondPlan}>
                                                            <div className="flex justify-center">
                                                                <CurrencyRupeeIcon className={`text-lg ${secondPlanStyle.textColor} mt-0.5`} />
                                                                <p className={`font-bold ${secondPlanStyle.textColor} `}>{val}</p>
                                                            </div>
                                                            <p className={`text-center ${secondPlanStyle.textColor}`}>{selectPlan[1][i]}</p>
                                                        </div> :
                                                        <div className={`w-36 h-28 border-2 rounded-lg border-green-600 ${thirdPlanStyle.bgColor} pt-7 cursor-pointer`} onClick={thirdPlan}>
                                                            <div className="flex justify-center">
                                                                <CurrencyRupeeIcon className={`text-lg mt-0.5 ${thirdPlanStyle.textColor}`} />
                                                                <p className={`font-bold ${thirdPlanStyle.textColor}`}>{val}</p>
                                                            </div>
                                                            <p className={`text-center ${thirdPlanStyle.textColor} `}>{selectPlan[1][i]}</p>
                                                        </div>
                                            );
                                        })
                                    }
                                </div>
                                {
                                    changeInfo ?
                                        <p className="mt-4 text-sm">The new UNLIMITED ACCESS pass to 7,500+ Fitness Centers Across 40+ cities of India !</p> :
                                        <p className="mt-4 text-sm">The same Old Amazing One pass to 7,500+ Fitness Centers Across 40+ cities of India !</p>
                                }
                                <div className="flex justify-between mt-5">
                                    <p className="font-semibold">Payable Amount</p>
                                    <div className="flex mr-2.5">
                                        <CurrencyRupeeIcon className="text-green-600 text-lg mt-1" />
                                        <p className="text-green-600 font-semibold">{payableAmount}</p>
                                    </div>
                                </div>
                                <Button className=" h-12 w-[30rem] mt-10 rounded-md bg-green-600 text-white hover:bg-green-700" >PROCEED</Button>
                            </div>
                        </div>
                    </div>
                    <div className=" space-y-4 mb-10">
                        <Image
                            src="/gymInfo.png" // Path to your image
                            alt="Description of the image" // Description of the image for accessibility
                            width={550} // Reduced width of the image
                            height={100} // Reduced height of the image
                            className="object-cover h-72"
                        />
                        <p className="text-2xl ml-5 font-semibold ">About us</p>
                        <Separator className="border-gray-400 w-[29rem] ml-5" />
                        <p className=" ml-5 " >
                            Gyms provide a one-stop shop for your fitness journey.
                            They typically have a variety of cardio and weightlifting equipment to suit different workout styles.
                            For those who prefer personalized guidance, there's the option of hiring a personal trainer.
                            Some gyms even go the extra mile with amenities like saunas, steam rooms,
                            or childcare to make your workout experience more convenient and enjoyable.
                        </p>

                        <p className="text-3xl font-semibold ml-5">
                            What will you achieve- Dream Gym Fitness & spa
                        </p>
                        <Separator className="border-gray-400 w-[29rem] ml-5" />
                        <p className=" ml-5">
                            With multiple options like Strength +
                            Cardio, Body Weight and much more
                            available in just one tap,achieving your
                            fitness goals is now fun, convenient and easy.
                        </p>
                        <p className="text-2xl ml-5 font-semibold">Amentity</p>
                        <Separator className="border-gray-400 w-[29rem] ml-5" />
                        <div className="h-16 w-16 border ml-5 rounded-lg">
                            <HeatPumpIcon className="ml-[1.21rem] mt-4 text-md text-green-600 " />
                        </div>
                        <p className="ml-7 text-sm ">Heater</p>
                        <p className="text-2xl ml-5 font-semibold">Studio Safety & Hygiene</p>
                        <Separator className="border-gray-400 w-[29rem] ml-5" />
                        <ul className="ml-10 list-disc space-y-5 text-gray-400">  
                            <li>
                                This fitness studio ensures that the arena
                                remains clean and hygenic for its visitors for a delightful experience.
                            </li>
                            <li>
                                Equipment is disinfected by the staff members, after every workout attemp
                                by a particular visitor.
                            </li>
                            <li>
                                Visitors are requested to keep the area clean throughout their
                                workout session or later
                            </li>
                            <li>
                                They also have a strict policy against user
                                misconduct. Any misdeed or neglilence shall not be entertained by
                                any studio personnel.
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}