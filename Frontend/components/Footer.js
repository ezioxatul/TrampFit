import Link from "next/link";

const Footer = () => {
    let mainLink = ['COMPANY', 'PRODUCT']
    let companyLinks = ['About', 'Terms & Conditions', 'Privacy Policy']
    let productLinks = ['Fitpass', 'Fitfeast', 'Subscription']
    let footerBar = ['Become a Partner', 'Contact Us', 'Blog', 'Careers', 'Corporates']
    
    return (
        <>
            <div className=" h-auto bg-green-700 flex flex-col mt-auto">
                <div className=" flex justify-between">
                    <div className=" flex">
                        {
                            mainLink.map((val, i) => {
                                return (
                                    <div className=" flex flex-col mt-10 m-28 mr-40">
                                        <h1 className=" text-gray-400 text-opacity-70 text-2xl">{val}</h1>
                                        {
                                            i === 0 ?
                                                companyLinks.map((val) => {
                                                    return <Link href={
                                                        val === 'Terms & Conditions' ? '/termsandcondition'
                                                        : val === 'Privacy Policy' ? '/privacypolicy' :
                                                        `/${val.toLowerCase()}` 
                                                    } className="text-white text-lg mt-3">{val}</Link>
                                                }) : productLinks.map((val) => {
                                                    return <Link href={`/${val.toLowerCase()}`} className="text-white text-lg mt-3">{val}</Link>
                                                })
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div>

                    </div>
                </div>
                <div className=" h-12 bg-green-600 ml-20 mr-20">
                    <div className="m-2 ml-10 mr-10 flex justify-between">
                        {
                            footerBar.map((val) => {
                                return <Link href={val === 'Become a Partner' ? '/partner' : "#"} className="text-white text-lg">{val}</Link>
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-between">
                    <h1 className=" text-white text-sm mt-4 ml-20 mb-4">2015-2024 trampfit.co.in | All Rights Reserved </h1>
                </div>
            </div>
        </>
    )
}

export default Footer;