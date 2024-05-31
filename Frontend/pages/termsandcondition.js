import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const termsandcondition = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">

                <Navbar />
                <h1 className=" text-center text-5xl mt-7">Terms and Conditions</h1>
                <div className="mt-10 mb-20">
                    <p className=" mx-auto w-[60rem] h-32  text-lg text-gray-500 "><span className="font-semibold text-black">TRAMPFIT</span> is not just a website; it's a dynamic online platform designed to revolutionize fitness training.
                        At TrampFit, we understand that staying fit isn't just about sweating it out in the gym;
                        it's about finding joy in movement and making exercise a part of your lifestyle.
                        That's why we've curated a unique blend of fitness sessions that combine the exhilaration of trampoline workouts with expert-led guidance,
                        all conveniently accessible through our membership program.</p>
                    <p className=" mx-auto w-[60rem] h-32 mt-4 text-lg text-gray-500 ">
                        When you visit TrampFit's website, you're welcomed into a world of boundless energy and enthusiasm for fitness.
                        Our sleek and user-friendly interface makes it easy for visitors to explore the various membership options and dive into the exciting array of workout sessions we offer.
                        Whether you're a beginner looking to dip your toes into the world of trampoline fitness or a seasoned enthusiast seeking a new challenge, TrampFit has something for everyone.</p>

                    <p className=" mx-auto w-[60rem] h-32 mt-4 text-lg text-gray-500 ">
                    Our membership model is designed to provide flexibility and value to our customers. 
                    Upon signing up, members gain access to a treasure trove of workout sessions led by certified instructors 
                    who are passionate about helping you reach your fitness goals. From high-intensity interval training (HIIT)
                     to dance-inspired routines, each session is carefully crafted to deliver
                      a full-body workout that's not only effective but also incredibly fun.
                    </p>    
                    <p className=" mx-auto w-[60rem] h-32 mt-4 text-lg text-gray-500 ">One of the key features of TrampFit is our emphasis on community and support. 
                    Through our online platform, members have the opportunity to connect with like-minded individuals, 
                    share their progress, and cheer each other on every step of the way. Whether you're logging in for a 
                    live session or catching up on a prerecorded workout, 
                    you'll always feel the camaraderie and encouragement of the TrampFit community.</p>


                    <div className="mt-5">
                        <p className="mx-auto w-[60rem]  text-xl font-semibold">Our Mission</p>
                        <p className="mx-auto w-[60rem] text-gray-500  text-lg mt-2 ">Inspire people to include fitness in their daily routines
                        by creating a seamless network of gyms and basic of life that shouldn't be 
                        expensive or inaccessible.</p>
                    </div>

                    <div className="mt-5">
                        <p className="mx-auto w-[60rem]  text-xl font-semibold">Our Vision</p>
                        <p className="mx-auto w-[60rem] text-gray-500  text-lg mt-2 ">Economical, convenient and non-restrictive fitness solutions to create a nexus of happy
                        and healthy people .</p>
                    </div>

                    <div className="mt-5">
                        <p className="mx-auto w-[60rem]  text-xl font-semibold">User Service</p>
                        <p className="mx-auto w-[60rem] text-gray-500  text-lg mt-2 ">TRAMPFIT dynamic programs make fitness fun and motivating.
                        For years, we have been breaking barriers - prices, fixed schedules, and boring routines </p>
                    </div>

                    <div className="mt-5">
                        <p className="mx-auto w-[60rem]  text-xl font-semibold">Gyms & Fitness Studios</p>
                        <p className="mx-auto w-[60rem] text-gray-500  text-lg mt-2 ">TRAMPFIT helps fitness centers to achieve improved utility and
                        increase revenue through our tech-enabled services. We streamline channels that serve business 
                        requirements, translating into cost savings with zero investment. </p>
                    </div>
                    <p className="mx-auto w-[60rem] text-gray-500  text-lg mt-10">TRAMPFIT is where you start achieving your fitness goals. </p>
                </div>
                <Footer />
            </div>
        </>

    )
}


export default termsandcondition;
