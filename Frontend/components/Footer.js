import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    let mainLink = ['COMPANY', 'PRODUCT']
    let companyLinks = ['About', 'Terms & Conditions', 'Privacy Policy']
    let productLinks = ['Become a Partner', 'Membership']


    return (
        <>
            <div className=" h-80 bg-green-700 flex flex-col mt-auto">
                <div className=" flex justify-between">
                    <div className=" flex justify-between">
                        {
                            mainLink.map((val, i) => {
                                return (
                                    <div className=" flex flex-col mt-10 m-28 mr-40">
                                        <h1 className=" text-white text-opacity-70 text-2xl">{val}</h1>
                                        {
                                            i === 0 ?
                                                companyLinks.map((val) => {
                                                    return <Link href={
                                                        val === 'Terms & Conditions' ? '/termsandcondition'
                                                            : val === 'Privacy Policy' ? '/privacypolicy' :
                                                                `/${val.toLowerCase()}`
                                                    } className=" text-gray-200 text-lg mt-3">{val}</Link>
                                                }) : productLinks.map((val, i) => {
                                                    return <Link href={i == 0 ? `/partner` : `/${val.toLowerCase()}`} className="text-gray-200 text-lg mt-3">{val}</Link>
                                                })
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="ml-[20rem]">
                            <Image
                            width={200}
                            height={100}
                            alt = "logo does not render"
                            src={"/Trampfitlogo.png"}
                            className=" drop-shadow-xl"
                             />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className=" mt-[-3rem]">
                    <h1 className=" text-white text-center text-sm mt-4 ml-20 mb-4">2015-2024 trampfit.co.in | All Rights Reserved </h1>
                </div>
            </div>
        </>
    )
}

export default Footer;