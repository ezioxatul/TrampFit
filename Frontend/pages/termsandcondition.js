import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const termsandcondition = () =>{
    return (
        <>
            <div className="flex flex-col min-h-screen"> 
                <Navbar/>
                <h1 className=" text-center text-5xl mt-7">TERMS & CONDITIONS</h1>
                <Footer/>
            </div>
        </>
    )
}

export default termsandcondition;