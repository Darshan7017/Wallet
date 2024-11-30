import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import InputWithIcon from "./components/Input";
import Button from "./components/Button";
import { Icon } from "@iconify/react";
import { name, url, user } from "./Data";
import Cookies from 'js-cookie';

const App = () => {
    const [mobile, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isGlowing, setIsGlowing] = useState(false);
    const [detailsRequired, setDetailsRequired] = useState(false); // New state for additional details
    const [userName, setUserName] = useState(""); // New state for name
    const [telegramId, setTelegramId] = useState(""); // New state for Telegram ID

    const triggerHapticFeedback = () => {
        if ("vibrate" in navigator) {
            navigator.vibrate(200);
        }
    };
    
    if(user){
      window.location.href = "/"
      return;
    }

    const sendOtp = async () => {
        if (mobile.length !== 10) {
            triggerHapticFeedback();
            toast.error("Please enter a valid mobile number.");
            return;
        }
        setLoadingOtp(true);
        try {
            const response = await fetch(
                `${url}/login.php?action=send_otp&mobile=${mobile}`
            );
            const data = await response.json();
            if (data.status === "success") {
                toast.success(`OTP sent successfully to ${mobile}`);
                toast(data.otp)
                setIsGlowing(true);
                setTimeout(() => {
                    setOtpSent(true);
                }, 400);
                setTimeout(() => {
                    setIsGlowing(false);
                }, 800);
            } else {
                toast.error("Error: " + data.message);
            }
        } catch (error) {
            toast.error("Internal server error: " + error);
        } finally {
            setLoadingOtp(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 4) {
            triggerHapticFeedback();
            toast.error("Please enter the correct OTP.");
            return;
        }
        setLoadingVerify(true);
        try {
            const response = await fetch(
                `${url}/login.php?action=verify_otp&mobile=${mobile}&otp=${otp}`
            );
            const data = await response.json();
            if (data.status === "success") {
                if (data.action === "required") {
                    toast.success("Otp Verifyed successfully")
                    setIsGlowing(true);
                    setTimeout(() => {
                        setDetailsRequired(true);
                    }, 400);
                    setTimeout(() => {
                        setIsGlowing(false);
                    }, 800);
                } else {
                    toast.success("Login Successful");
                    Cookies.set('user', data.token, { expires: 7 });
                    setTimeout(function() {
                      window.location.href = "/"
                    }, 2000);
                }
            } else {
                triggerHapticFeedback();
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error: " + error);
        } finally {
            setLoadingVerify(false);
        }
    };

    const submitDetails = async () => {
        if (!userName || !telegramId) {
            toast.error("Please fill in all the details.");
            return;
        }
        toast(mobile)
        try {
            const response = await fetch(
                `${url}/login.php?action=user_data&mobile=${mobile}&name=${userName}&tgid=${telegramId}`
            );
            const data = await response.json();
            if (data.status === "success") {
                toast.success("Account Successfully Created");
                Cookies.set('user', data.token, { expires: 7 });
                setTimeout(function() {
                  window.location.href = "/"
                }, 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error: " + error);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <Toaster />
                <div className="relative w-11/12 max-w-sm px-6 py-8 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="m-auto mb-5">
                        <p className="font-bold text-lg">Login or Register </p>
                        <p className="text font-extrabold mt-1">
                            Log in or register with just a phone number.
                        </p>
                    </div>
                    {isGlowing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-75 animate-glow-sweep pointer-events-none"></div>
                    )}
                    <div className="relative z-10">
                        {detailsRequired ? (
                            <>
                                <InputWithIcon
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    placeholder="Enter Name"
                                    id="userName"
                                    icon={<Icon icon="mingcute:user-edit-fill" />}
                                />
                                <InputWithIcon
                                    value={telegramId}
                                    onChange={e =>
                                        setTelegramId(e.target.value)
                                    }
                                    placeholder="Enter Telegram ID"
                                    id="telegramId"
                                    icon={<Icon icon="cbi:telegram" />}
                                />
                                <Button
                                    onClick={submitDetails}
                                    loading={loadingVerify}
                                    disabled={false}
                                    text="Submit"
                                />
                            </>
                        ) : otpSent ? (
                            <>
                                <InputWithIcon
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    type="number"
                                    id="otp"
                                    icon={
                                        <Icon icon="arcticons:otp-authenticator" />
                                    }
                                />
                                <Button
                                    onClick={verifyOtp}
                                    loading={loadingVerify}
                                    disabled={false}
                                    text="Verify OTP"
                                />
                            </>
                        ) : (
                            <>
                                <InputWithIcon
                                    value={mobile}
                                    onChange={e =>
                                        setMobileNumber(e.target.value)
                                    }
                                    placeholder="Enter Mobile Number"
                                    id="mobileNumber"
                                    icon="+91"
                                />
                                <div className="text font-extrabold mb-4">
                                    By logging in or registering, you agree to
                                    the{" "}
                                    <a href="/" style={{ color: "#0962e4" }}>
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="/" style={{ color: "#0962e4" }}>
                                        Privacy Policy
                                    </a>{" "}
                                    {name}
                                </div>

                                <Button
                                    onClick={sendOtp}
                                    loading={loadingOtp}
                                    disabled={false}
                                    text="Send OTP"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
