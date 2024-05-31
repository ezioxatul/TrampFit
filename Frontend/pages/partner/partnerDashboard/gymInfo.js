import PartnerSideBar from "@/components/PartnerSideBar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Close } from "@radix-ui/react-toast";


export default function gymInfo() {
  const inputClassName = "w-96 text-lg border-2";
  const labelClassName = "text-lg text-green-600 font-normal";
  const containerClassName = "ml-80";

  let [airConditioner, setAirConditioner] = useState("");
  let [wifi, setWifi] = useState("");
  let [parking, setParking] = useState("");
  let [shower, setShower] = useState("");
  let [waterCooler, setWaterCooler] = useState("");
  let [locker, setLocker] = useState("");
  let router = useRouter();
  let [amenities, setAmenities] = useState("")
  let [gymData, setGymData] = useState({})
  let [displayAmenities, setDisplayAmenities] = useState(false);

  let [addedSlot, setAddedSlot] = useState([]);
  let [addRows, setAddRows] = useState({
    sessionTiming: "",
    sessionCount: "",
    date: "",
    gymId: ""
  });

  let [toggleState, setToggleState] = useState(false);
  let [sessionTime, setSessionTime] = useState("");
  let [sessionCapacity, setSessionCapacity] = useState("");
  let [currentDate, setCurrentDate] = useState("");
  let [sessionTimeSlot, setSessionTimeSlot] = useState([]);
  let [displaySession, setDisplaySession] = useState(false);
  let [sessionToggleState, setSessionToggleState] = useState(false);

  //token verification and getting gym details
  useEffect(() => {

    let partnerToken = localStorage.getItem("partnerToken");
    if (!partnerToken) {
      router.push("/partner/partnerLogin")
    }
    else {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${partnerToken}`
        }
      }
      fetch("http://localhost/partnerDashboard/gymInfo", options)
        .then(async (res) => {
          let gymInfo = await res.json()
          if (!gymInfo.response) {
            router.push("/partner/partnerLogin")
          }
          else {
            if (gymInfo.data.amenities == null ) {
              setDisplayAmenities(true);
            }
              setGymData(gymInfo.data) 
          }
        })
        .catch((err) => {
          console.log(err)
        }

        )
    }

  }, [toggleState]);

  useEffect(() => {

    let partnerToken = localStorage.getItem("partnerToken");

    if (!partnerToken) {
      router.push("/partner/partnerLogin");
    } else {
      try {

        const option = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${partnerToken}`
          }
        }

        fetch('http://localhost/partnerDashboard/getAllSlots', option).then(async (res) => {
          let sessionTime = await res.json();

          if (sessionTime.response) {
            if (sessionTime.data.length > 0) {
              console.log(sessionTime.data)
              setDisplaySession(true);
              setSessionTimeSlot(sessionTime.data);
            }

          } else {
            router.push("/partner/partnerLogin");
          }
        }).catch((err) => {
          console.log(err);
        })

      } catch (err) {
        console.log(err);
      }
    }

  }, [sessionToggleState])

  console.log(displayAmenities)

  // Function to handle the checkbox
  const handleCheck = (e) => {

    if (e.target.checked) {
      if (e.target.name === "Air Conditioner") {
        setAirConditioner(e.target.value)
      }
      else if (e.target.name === "WiFi") {
        setWifi(e.target.value)
      }
      else if (e.target.name === "Parking") {
        setParking(e.target.value)
      }
      else if (e.target.name === "Shower") {
        setShower(e.target.value)
      }
      else if (e.target.name === "Water Cooler") {
        setWaterCooler(e.target.value)
      }
      else if (e.target.name === "Locker") {
        setLocker(e.target.value)
      }
    }
    else {
      if (e.target.name === "Air Conditioner") {
        setAirConditioner("")
      }
      else if (e.target.name === "WiFi") {
        setWifi("")
      }
      else if (e.target.name === "Parking") {
        setParking("")
      }
      else if (e.target.name === "Shower") {
        setShower("")
      }
      else if (e.target.name === "Water Cooler") {
        setWaterCooler("")
      }
      else if (e.target.name === "Locker") {
        setLocker("")
      }

    };
  };


  //Function to handle the Amenities update button
  const handleAmenitiesButton = async () => {

    let amenitiesArray = airConditioner + "," + wifi + "," + parking + "," + shower + "," + waterCooler + "," + locker
    let amenitiesArraySplit = amenitiesArray.split(",")
    let amenitiesArrayFilter = amenitiesArraySplit.filter(value => { return value !== '' }).toString()

    setAmenities(amenitiesArrayFilter)

    const bodyData = { id: gymData.id, amenities: amenitiesArrayFilter }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    }
    let updateAmenitiesResponse = await fetch("http://localhost/partnerDashboard/updateAmenities", options)
    updateAmenitiesResponse = await updateAmenitiesResponse.json()
    if (updateAmenitiesResponse.response) {
      toast.success(updateAmenitiesResponse.message)
      setDisplayAmenities(true);
      setToggleState(!toggleState);
    }
    else {
      toast.error(updateAmenitiesResponse.message)
    }

    setAirConditioner("");
    setWifi("");
    setParking("");
    setShower("");
    setWaterCooler("");
    setLocker("");
  };


  const getSessionTiming = (e) => {
    if (e.target.name === "capacity") {
      setSessionCapacity(e.target.value);
    } else {
      setSessionTime(e.target.value);
    }
  }

  const addRow = () => {
    // {sessionTiming : "07:00", sessionCount : 30, date : "12/12/2024", gymId : 1}
    addRows.sessionTiming = sessionTime;
    addRows.sessionCount = sessionCapacity;

    let currentDate = new Date();
    setCurrentDate(currentDate);

    addRows.date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    addRows.gymId = gymData.id;

    // Check if there's a gap of one hour
    let canAdd = true;
    addedSlot.forEach(slot => {
      const existingTime = new Date(`2000-01-01T${slot.sessionTiming}`);
      const newTime = new Date(`2000-01-01T${addRows.sessionTiming}`);
      if (Math.abs(existingTime - newTime) < 3600000) { // 3600000 milliseconds = 1 hour
        canAdd = false;
      }
    });

    if (canAdd) {
      setAddRows({ ...addRows });
      addedSlot.push(addRows);
      setAddedSlot([...addedSlot]);
    } else {
      toast.error("Cannot add slot. There must be a gap of 1 hour between sessions.");
    }
  }

  const handleSlotStore = async () => {
    console.log(addedSlot)
    try {

      const option = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addedSlot)
      }

      let addSlotResponse = await fetch(`http://localhost/partnerDashboard/addSessionSlots?currentDate=${currentDate}`, option);
      addSlotResponse = await addSlotResponse.json();

      if (addSlotResponse.response) {
        setSessionToggleState(!sessionToggleState);
        toast.success(addSlotResponse.message);
      } else {
        toast.error(addSlotResponse.message);
      }

    } catch (err) {
      console.log(err);
    }
  }

  const addMoreAmenities = () => {
    setDisplayAmenities(false);
  }
 
  const cancelUpdate = () => {
    setDisplayAmenities(true);
  }

  return (
    <>
      <div className="flex">
        <PartnerSideBar />

        {/* Gym Details Section */}
        <div className="flex-col">
          <div className="mt-8 ml-16 flex flex-col">
            <h1 className=" text-3xl text-green-600 font-semibold">
              {gymData.gymName}
            </h1>
            <h1 className=" text-lg text-gray-400 mt-1">
              {gymData.gymLocation} | {gymData.gymCity}
            </h1>

            {/* Amenities Section */}
            <div className="mr-32 mt-10 space-y-5">
              <h1 className=" text-2xl ">Amenities</h1>
              {
                displayAmenities ?
                  <>
                    <div className=" flex flex-wrap gap-x-4 gap-y-4 w-80">
                      {
                        
                        gymData.amenities != undefined &&
                        
                        gymData.amenities.map((val) => {
                          return (
                            <div className=" bg-gray-50 rounded-xl">
                              <p className="text-gray-400 p-2">{val}</p>
                            </div>
                          );
                        })
                      }
                    </div>
                    <Button className="w-20 bg-green-600 hover:bg-green-700 space-x-1" onClick={addMoreAmenities}>
                      <span>Edit</span>
                    </Button>
                  </> :
                  <div className="flex flex-col">
                    <div className="flex space-x-20">
                      <div className=" w-48">
                        <Checkbox color="success" name="Air Conditioner" value="Air Conditioner" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="Air Conditioner"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          Air Conditioner
                        </Label>
                      </div>
                      <div className=" w-48">
                        <Checkbox color="success" name="WiFi" value="WiFi" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="WiFi"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          WiFi
                        </Label>
                      </div>
                      <div className=" w-48">
                        <Checkbox color="success" name="Parking" value="Parking" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="Parking"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          Parking
                        </Label>
                      </div>
                    </div>
                    <div className="flex space-x-20">
                      <div className=" w-48">
                        <Checkbox color="success" name="Shower" value="Shower" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="Shower"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          Shower
                        </Label>
                      </div>
                      <div className=" w-48">
                        <Checkbox color="success" name="Water Cooler" value="Water Cooler" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="Water Cooler"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          Water Cooler
                        </Label>
                      </div>
                      <div className=" w-48">
                        <Checkbox color="success" name="Locker" value="Locker" onChange={handleCheck} />
                        <Label
                          htmlFor="name"
                          name="Locker"
                          className="text-lg text-green-600 mt-1.5 font-normal"
                        >
                          Locker
                        </Label>
                      </div>
                    </div>
                    <div className="flex space-x-6 mt-5">
                      <Button className="w-20 bg-white hover:bg-gray-50 text-gray-400 border space-x-1" onClick={cancelUpdate}>
                        <span>Cancel</span>
                      </Button>
                      <Button className="w-20 bg-green-600 hover:bg-green-700 space-x-1" onClick={handleAmenitiesButton}>
                        <span>Update</span>
                      </Button>
                    </div>
                  </div>
              }

            </div>

            {/* Session Section */}

            <div className="mt-14">
              <h1 className=" text-2xl ">Sessions</h1>

              {
                displaySession ?
                  <>
                    <h1 className="text-gray-400 mt-5 ">Session Capacity : {sessionTimeSlot[0].gymDetails.totalSessionCapacity}</h1>
                  </> :
                  <div className="flex space-x-5 mt-8">
                    <div className="space-y-3">
                      <div className="flex space-x-16">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-lg text-green-600 mt-1.5 font-normal"
                          >
                            Slot Timing
                          </Label>
                          <Input type="time" className="w-36" onChange={getSessionTiming} />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-lg text-green-600 mt-1.5 font-normal"
                          >
                            Session Capacity
                          </Label>
                          <Input type="text" className="w-40" placeHolder="Enter the Capacity" name="capacity" onChange={getSessionTiming} />
                        </div>
                        <Button className="w-24 bg-green-600 mt-[2.2rem] hover:bg-green-700 space-x-1" onClick={addRow}>
                          Add Slot
                        </Button>
                      </div>
                    </div>
                  </div>
              }

              {
                displaySession ?
                  <>
                    <h1 className="text-gray-400 mt-5 ">Session Timing </h1>
                    <div className="w-[70vw] mt-2 gap-x-2 gap-y-3 flex flex-wrap">
                      {
                        sessionTimeSlot.map((val) => {
                          return (
                            <div className=" w-24 h-8 border-2 mt-4 rounded-md">
                              <p className=" text-center mt-0.5 text-gray-400">{val.sessionTiming}</p>
                            </div>
                          );
                        })
                      }

                    </div>
                  </> :

                  <div className="w-[70vw] mt-4 gap-x-2 gap-y-3 flex flex-wrap">
                    {
                      addedSlot.map((val) => {
                        return (
                          <div className=" w-24 h-8 border-2 mt-4 rounded-md">
                            <p className=" text-center mt-0.5 text-gray-400">{val.sessionTiming}</p>
                          </div>
                        );
                      })
                    }

                  </div>
              }
              {
                displaySession == false &&
                <div className="flex space-x-9 mt-7 mb-5">
                  <Button className="w-20 bg-white hover:bg-gray-50 text-gray-400 border space-x-1">
                    <span>Cancel</span>
                  </Button>
                  <Button className="w-24 bg-green-600 hover:bg-green-700 " onClick={handleSlotStore}>
                    Confirm
                  </Button>
                </div>
              }

            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  );
}

