import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function pageNotFound() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div >
                    <p className="text-6xl text-center mt-10 absolute inset-0 inset-y-12">404</p>
                    <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="img not found" className="mx-auto  h-[25rem]" />
                    <p className="text-3xl text-center mt-[-3rem]">Looks like you're lost</p>
                    <p className="text-xl text-center mt-4 mb-20">the page you are looking for is not available!</p>
                </div>
                <Footer />
            </div>
        </>
    )
}