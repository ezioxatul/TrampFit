import PartnerTable from "@/components/PartnerTable";
import PartnerSideBar from "@/components/PartnerSideBar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";




export default function sessionHistory() {
  let router = useRouter();
  let columnName = ["Booking ID", "Name", "Timing", "Date"];
  let [rowData, setRowData] = useState([]);
  let [searchData, setSearchData] = useState("");
  let [activeSearch, setActiveSearch] = useState(false);

  useEffect(() => {

    if (searchData == "") {
      try {

        let partnerToken = localStorage.getItem("partnerToken");

        if (!partnerToken) {
          router.push('/partner/partnerLogin')
        } else {
          const option = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${partnerToken}`
            }
          }

          fetch('http://localhost/partnerDashboard/getSessionHistory', option).then(async (res) => {

            let sessionHistoryResponse = await res.json();

            let storedMapData = []
            let uniqueUserId = [];
            sessionHistoryResponse.data.map((val) => {
              let storeData = [];
              let sessionBooking = Object.values(val);
              let userNameData = Object.values(sessionBooking[3]);
              let sessionTime = Object.values(sessionBooking[4]);
              storeData.push(sessionBooking[0])
              storeData.push(...userNameData);
              storeData.push(...sessionTime);
              storeData.push(sessionBooking[1]);
              storedMapData.push(storeData);
            })

            setRowData(storedMapData);

          }).catch((err) => {
            console.log(err);
          })
        }

      } catch (err) {
        console.log(err);
      }
    }
  }, [activeSearch])

  useEffect(() => {
    console.log(searchData)
    if (searchData != "") {
      try {

        let partnerToken = localStorage.getItem("partnerToken");

        if (!partnerToken) {
          router.push('/partner/partnerLogin')
        } else {
          const option = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${partnerToken}`
            }
          }
          console.log(searchData);

          fetch(`http://localhost/partnerDashboard/getSearchData?searchData=${searchData}`, option).then(async (res) => {

            let sessionHistoryResponse = await res.json();

            let storedMapData = []
            sessionHistoryResponse.data.map((val) => {
              let storeData = [];

              let sessionBooking = Object.values(val);
              let userNameData = Object.values(sessionBooking[3]);
              let sessionTime = Object.values(sessionBooking[4]);
              storeData.push(sessionBooking[0])
              storeData.push(...userNameData);
              storeData.push(...sessionTime);
              storeData.push(sessionBooking[1]);
              storedMapData.push(storeData);
            })

            setRowData(storedMapData);

          }).catch((err) => {
            console.log(err);
          })
        }

      } catch (err) {
        console.log(err);
      }
    }
  }, [activeSearch])

  const getValue = (e) => {
    setSearchData(e.target.value);
    setActiveSearch(!activeSearch);
  }





  return (
    <div className="flex">
      <PartnerSideBar />
      <div>
        <h1 className=" text-green-600 text-3xl ml-24 mt-8"> Session Info. </h1>
        <div className=" mt-8  ml-24">
          <Input
            type="text"
            className=" text-lg  w-72 h-9 pl-10 border border-green-600"
            placeholder="Search"
            onChange={getValue}
          />
          <SearchIcon className="absolute ml-2  mt-[-1.7rem] h-5 w-5  text-green-600" />
        </div>
        <div className=" mt-8  ml-24 border rounded-md border-gray-200 ">
          <PartnerTable columnName={columnName} rowData={rowData} />
        </div>
      </div>
    </div>
  );
}
