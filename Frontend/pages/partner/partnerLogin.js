import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

const partnerLogin = () => {
  let [title, setTitle] = useState("Partner Login");
  let [buttonText, setButtonText] = useState("Send OTP");
  let [inputTextController, setInputTextController] = useState(false);
  let [descriptionText, setDescriptionText] = useState();
  let [numberDisplay, setNumberDisplay] = useState();
  let [otp, setOtp] = useState();
  let [partnerDetailsInput, setPartnerDetailsInput] = useState(false);

  let [partnerDetails, setPartnerDetails] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const getInputData = (event) => {
    if (event.target.name === "mobileNumber") {
      setNumberDisplay(event.target.value);
    } else if (event.target.name === "OTP") {
      setOtp(event.target.value);
    } else if (event.target.name === "name") {
      partnerDetails.fullName = event.target.value;
      setPartnerDetails({ ...partnerDetails });
    } else if (event.target.name === "email") {
      partnerDetails.email = event.target.value;
      setPartnerDetails({ ...partnerDetails });
    }
  };

  const sendOTP = async (event) => {
    if (buttonText === "Send OTP") {
      event.preventDefault();
      setButtonText("Submit OTP");
      setDescriptionText(numberDisplay);
      console.log(numberDisplay);
      setNumberDisplay(" ");
      setTitle("Enter OTP");
      setInputTextController(true);
      setOtp("");
    } else if (buttonText === "Submit OTP") {
      if (otp === "123456") {
        try {
          const option = {
            method: "GET",
          };

          const partnerExists = await fetch(
            `http://localhost/partnerExists?mobileNumber=${descriptionText}`,
            option
          );

          const partnerExistResponse = await partnerExists.json();

          if (partnerExistResponse.response) {
            localStorage.setItem("partnerToken", partnerExistResponse.token);
            toast.success("Signed In Successfully");

            if (partnerExistResponse.status === "Approved") {

                setTimeout(() => {
                  router.push("/partner/partnerDashboard/partnerInfo");
                }, 3000)

            } else {

                setTimeout(() => {
                  router.push("/partner/waitingPartnersOnboarding");
                }, 3000)

            }


          } else {
            toast.success("OTP Verified");
            setInputTextController(false);
            setNumberDisplay(descriptionText);
            setDescriptionText("Enter your details");
            setButtonText("Submit");
            setTitle("Partner Details");
            setPartnerDetailsInput(true);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("Invalid OTP");
      }
    } else {
      partnerDetails.mobileNumber = numberDisplay;
      setPartnerDetails({ ...partnerDetails });
      console.log(partnerDetails);

      try {
        const option = {
          method: "GET",
        };

        const emailExists = await fetch(
          `http://localhost/partnerEmailVerification?email=${partnerDetails.email}`,
          option
        );
        const emailExistsResponse = await emailExists.json();

        if (emailExistsResponse.response) {
          localStorage.setItem(
            "partnerDetails",
            JSON.stringify(partnerDetails)
          );
          router.push({
            pathname: "/partner/partnerEmailVerification",
            query: {
              response: true,
            },
          });
        } else {
          toast.error(emailExistsResponse.message);
        }
      } catch(err) {
        console.log(err);
       }
    }
  };

  let router = useRouter();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Card className="w-[350px] mx-auto mb-16 mt-16">
          <CardHeader>
            <CardTitle className="text-green-700">{title}</CardTitle>
            <CardDescription>
              {descriptionText == null
                ? "You will receive a text message to validate."
                : inputTextController
                  ? "OTP sent to "
                  : "Please Enter your Details"}
              <span className=" font-bold">
                {inputTextController && descriptionText}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {partnerDetailsInput ? (
                    <>
                      <div className=" space-y-4">
                        <Input
                          className=""
                          id="name"
                          name="name"
                          onChange={getInputData}
                          placeholder="Enter your Name"
                        />
                        <Input
                          className=""
                          id="mobileNumber"
                          name="mobileNumber"
                          value={numberDisplay}
                          placeholder="Enter Your Mobile Number"
                        />
                        <Input
                          className=""
                          id="email"
                          name="email"
                          onChange={getInputData}
                          placeholder="Enter your Email"
                        />
                      </div>
                    </>
                  ) : inputTextController ? (
                    <>
                      <Input
                        className=""
                        id="OTP"
                        name="OTP"
                        onChange={getInputData}
                        value={otp}
                        placeholder="Enter the OTP"
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        className=""
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={getInputData}
                        placeholder="Enter Your Mobile Number"
                      />
                    </>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={sendOTP}
            >
              {buttonText}
            </Button>
          </CardFooter>
        </Card>
        <Footer />
      </div>
    </>
  );
};

export default partnerLogin;
