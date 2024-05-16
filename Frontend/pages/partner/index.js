import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const partnerHome = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grid mx-auto place-content-center mt-8 space-y-3">
          <p className=" font-bold text-black text-4xl text-center">
            GROW YOUR BUSINESS WITH{" "}
            <span className="text-green-600 ">TRAMPFIT</span>
          </p>
          <p className=" text-xl ml-16 mr-16 text-center">
            Join the most rapidly growing fitness partner network in India. You
            take care of the new users. We take care of you.
          </p>
          <Button className=" hover:bg-green-700 bg-green-600 w-32 text-xl h-12 mx-auto">
            <Link href={"/partner/partnerLogin"}>Join Us</Link>
          </Button>
        </div>

        <div className="flex justify-evenly mt-8  space-y-3">
          <Image
            src="/hero-image2.png" // Path to your image
            alt="Description of the image" // Description of the image for accessibility
            width={400} // Reduced width of the image
            height={250} // Reduced height of the image
            className="object-cover"
          />
          <div className="space-y-4">
            <p className="text-black font-semibold mt-8 text-3xl mr-64">
              How TrampFit works?
            </p>
            <p className=" w-[48rem] text-xl">
              TrampFit is a universal pass giving access to variety of fitness
              workout options in our esteemed partner network across India.
              Progressively helping partners to maximize utilization of their
              resources and earn profits.
            </p>
            <p className="text-black font-semibold mt-8 text-3xl mr-64">
              Become a Partner Freely and Easily
            </p>
            <p className=" w-[48rem] text-xl">
              Becoming a partner wit TrampFit is absolutely free. No listing
              charges, No commission and No conditions apply. Instead we pay you
              for each attended workout.
            </p>
          </div>
        </div>
        <p className="font-bold text-black text-4xl text-center mb-4">FAQ</p>
        <Accordion type="single" collapsible className="w-1/2 mx-auto mb-10">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              How do I get started with TrampFit?
            </AccordionTrigger>
            <AccordionContent>
              Starting with TrampFit is a simple and smooth process. You can
              either email us on partners@trampfit.co.in with details of your
              Gym/Fitness Studio or logon to our website here
              https://trampfit.co.in/partners and fill our Partner form. Once we
              receive your details, our Business Development Executives will
              assess if your business is the right fit for TrampFit. If you are,
              our Executives will contact you for the onboarding process. Once
              the process is complete, your profile will be updated on our
              website with your workout schedule, address, and pictures.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              What's the cost to my studio to be a part of the TrampFit network?
            </AccordionTrigger>
            <AccordionContent>
              Associating with TrampFit is absolutely free of cost and easy! As
              a TrampFit Partner, there is no cost that your Gym/Fitness Studio
              has to pay TrampFit. In fact, TrampFit will pay your Gym/Fitness
              Studio for every workout that is Attended at your facility. Along
              with this, TrampFit gives you free access to state-of-the-art
              Partner App and CRM to track Reservations, Payment, Schedules,
              Reports and so much more!! components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              How does TrampFit work?
            </AccordionTrigger>
            <AccordionContent>
              With TrampFit, a customer can workout freely at any of our
              Partnered Gyms/Fitness Studios by purchasing a monthly membership
              from TrampFit of Rs 1599.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="hover:no-underline">
              How often will I be paid?
            </AccordionTrigger>
            <AccordionContent>
              The payment for your Gym/Fitness Studio is released between the
              2nd to 7th of the next month directly to your Bank account. You
              can easily track your payment information on the Partner App to
              see your current or expected revenue. For e.g. If TrampFit
              customers visited your gym in the month of January, the payment
              for the workouts attended in January will be credited to your bank
              account between the 2nd to the 7th of February.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="hover:no-underline">
              What's my commitment period as a partner?
            </AccordionTrigger>
            <AccordionContent>
              Our contracts are 1 year long with 90% retention rate post the
              expiry of the contract. We encourage all our Partners for a
              long-term association to reap the actual benefits of this
              association. However, should you change your mind, TrampFit
              requires a 3 Months advance notice in writing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Footer />
      </div>
    </>
  );
};

export default partnerHome;
