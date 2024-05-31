import Image from "next/image";
export default function waitingPartnersOnboarding() {
    return (
        <>
            <center>
                <div className="space-y-4 mt-16">
                    <h1 className="text-3xl text-green-600">Waiting Area</h1>
                    <img src="/waitingPartner.gif" className=" object-cover w-[25rem]" />
                    <h1 className="mt-[20vh] text-xl w-[30rem]">Your request is being processed. You will be notified through email after the approval of admin.</h1>
                </div>
            </center>
        </>
    );
}