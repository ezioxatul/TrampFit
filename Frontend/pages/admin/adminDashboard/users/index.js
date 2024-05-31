import AdminSideBar from "@/components/AdminSideBar";
import SearchIcon from '@mui/icons-material/Search';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SortIcon from '@mui/icons-material/Sort';
import UserTable from "@/components/UserTable";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";


export default function User() {
    let router = useRouter();
    let [userInfo, setUserInfo] = useState([]);
    let [searchData, setSearchData] = useState();
    let [applySearch, setApplySearch] = useState(false);

    useEffect(() => {
        try {
            let token = localStorage.getItem("adminToken");
            if (token) {
                const option = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

                fetch('http://localhost/adminDasboard/getUserInfo', option).then(async (res) => {

                    let userInfo = await res.json();

                    if (userInfo.response) {

                        let newUserData = [];

                        userInfo.data.map((val) => {
                            let userData = Object.values(val);
                            userData.push('View Detail');
                            newUserData.push(userData);
                        })

                        setUserInfo(newUserData);

                    } else {
                        toast.error(userInfo.message);

                        setTimeout(()=>{
                            router.push("/admin");
                        },3000);
                    }

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                router.push("/admin");
            }


        } catch (err) {
            console.log(err);
        }

    }, []);

    useEffect(() => {

        if (searchData != undefined) {

            try {
                const option = {
                    method: "GET"
                }

                fetch(`http://localhost/adminDashboard/searchUser?searchText=${searchData}`, option).then(async (res) => {

                    let userInfo = await res.json();

                    let newUserData = [];

                    userInfo.data.map((val) => {
                        let userData = Object.values(val);
                        userData.push('View Detail');
                        newUserData.push(userData);
                    })

                    setUserInfo(newUserData);


                }).catch((err) => {
                    console.log(err);
                })
            } catch (err) {
                console.log(err);
            }

        }

    }, [applySearch])

    let columnName = ['User ID', 'Name', 'City', 'Mobile Number', 'Email'];

    const handleSearchData = (e) => {

        setSearchData(e.target.value);
        setApplySearch(!applySearch);

    }

    const handleUserViewDetail = (e)=>{
        let userData = e.target.id.split(',');
        let userId = userData[0];
        let userName = userData[1];
        
        router.push({
            pathname : `/admin/adminDashboard/users/${userId}` ,
            query : {
                userName : userName
            }
        });
    }

    return (
        <>
            <div className=" flex">
                <AdminSideBar />
                <div className=" space-y-12">
                    <h1 className=" text-green-600 ml-20 text-2xl mt-8 "> User Info. </h1>
                    <div className="flex w-[80vw] justify-between">
                        <div className=" ml-20">
                            <Input type="text" className=" text-lg  w-80 h-11 pl-10 border border-green-600" placeholder="Search " onChange={handleSearchData} />
                            <SearchIcon className="absolute ml-2  mt-[-2.1rem] h-6 w-6  text-green-600" />
                        </div>
                        {/* <Button className=" w-20 h-11 flex justify-around hover:bg-green-700  bg-green-600  p-2 "><SortIcon className="" />  Sort</Button> */}
                    </div>
                    <div className="border-2 rounded-xl ml-20">
                        <UserTable columnName={columnName} rowData={userInfo} viewDetail={handleUserViewDetail}/>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}