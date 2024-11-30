import Profile from './components/Profile';
import Bank from "./components/Bank";
import Upi from "./components/Upi";
import Btn from "./components/Btn";
import Wallet from "./components/Wallet";
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Transaction from "./components/Transaction";
import { user, name, user as token, url } from "./Data";
import Button from "./components/Button";
import { Toaster, toast } from "react-hot-toast";
import { SwipeableDrawer } from "@mui/material";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [transactions, setTrans] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerjsx, setDrawerjsx] = useState("");
    const [loading, setLoading] = useState(true);
    const receiptRef = useRef(null);
    const navigate = useNavigate();

    const firebaseConfig = {
        apiKey: "AIzaSyAN4ywh6KSawZj2ROgsugBWd7V2YF5FBqM",
        authDomain: "smart-wallet-dboss.firebaseapp.com",
        projectId: "smart-wallet-dboss",
        storageBucket: "smart-wallet-dboss.appspot.com",
        messagingSenderId: "753281675889",
        appId: "1:753281675889:web:18ba58c19f2747037e61d0",
        measurementId: "G-26CMZ4ZR2H"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${url}/getTrans.php/?token=${token}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTrans(data.transactions);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false in both success and failure cases
            }
        };
        getData();
    }, []);

    useEffect(() => {
        // Register the service worker when the component mounts
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/firebase-messaging-sw.js")
                .then(registration => {
                    console.log(
                        "Service Worker registered with scope:" +
                            registration.scope
                    );
                })
                .catch(error => {
                    console.error("Service Worker registration failed:", error);
                });
        }
    }, []);

    if (!user || user === "" || user === null) {
        navigate("/login");
        return null;
    }

    function BtnFun(type) {
        switch (type) {
            case "upi":
                setDrawerjsx(<Upi toast={toast} />);
                break;
            case "bank":
                setDrawerjsx(<Bank toast={toast} />);
                break;
            case "profile":
                setDrawerjsx(<Profile toast={toast} />);
                break;
            case "notify":
                let loadtoast = toast.loading(
                    "Please Allow Notification Permission"
                );
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        toast.dismiss(loadtoast);
                        let loadnottoast = toast.loading(
                            "Setting Up Your Notification"
                        );
                        getToken(messaging, {
                            vapidKey:
                                "BG49VrOg_egpODBjgOB6LQ9qQXA7LKgE-AsN4Rz9JAcKbyZe2eTekdpyzbkVNjeFylNxzEDFZ9ARdW_CZm_rFns"
                        }).then(fcmtoken => {
                            fetch(
                                `${url}/notify.php?notify=${fcmtoken}&token=${token}`
                            )
                                .then(res => res.json())
                                .then(data => {
                                    toast.dismiss(loadnottoast);
                                    data.status === "success"
                                        ? toast.success(
                                              "Notification Service Activated"
                                          )
                                        : toast.error(
                                              "Server Error: " +
                                                  JSON.stringify(data)
                                          );
                                })
                                .catch(err =>
                                    toast.error("Fetch Error: " + err.message)
                                );
                        });
                    } else if (permission === "denied") {
                        toast.dismiss(loadtoast);
                        toast(
                            "Go to site info  > permissions > Reset permision then allow the site for notification.",
                            {
                                icon: "ℹ️"
                            }
                        );
                        toast.error("Notification permission denied");
                    }
                });
                break;
                default :
                console.log("Unknown Coder");
                break;
        }
        if (type === "upi" || type === "bank" || type === "profile") {
            setDrawerOpen(true);
        }
    }
    const handleTransactionClick = transaction => {
        setDrawerOpen(true);
        setDrawerjsx(
            <div className="p-8">
                    <div ref={receiptRef}>
                        <Transaction transactionId={transaction} />
                    </div>
                 <button className="w-full text-white py-2 mb-1 text-black rounded transition duration-300 flex justify-center items-center mx-auto" style={{ border: '1px solid #0063f7'}} onClick={() => setDrawerOpen(false)}>Close</button>
                <Button
                    text={loading ? "Downloading..." : "Download Receipt"}
                    onClick={handleDownloadReceipt}
                    loading={loading}
                />
            </div>
        );
    };

    const handleDownloadReceipt = async () => {
        if (receiptRef.current) {
            setLoading(true);
            const canvas = await html2canvas(receiptRef.current, { scale: 2 });
            canvas.toBlob(blob => {
                if (blob) {
                    saveAs(blob, `receipt_${name}.png`);
                    toast.success("Receipt downloading started!");
                } else {
                    toast.error("Failed to generate receipt!");
                }
            }, "image/png");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 ">
            <Wallet />
            <Btn BtnFun={BtnFun} />
            <div className="bg-white p-6 rounded-lg border w-full max-w-md mt-2">
                <h3 className="text-lg font-semibold mb-4">Transactions </h3>
                {loading ? (
                    <Skeleton count={5} height={40} className="mb-4" />
                ) : transactions.length > 0 ? (
                    <div className="space-y-6 overflow-auto max-h-72">
                        {Object.entries(
                            transactions
                                .sort(
                                    (a, b) =>
                                        new Date(b.date) - new Date(a.date)
                                )
                                .reduce((acc, transaction) => {
                                    const date = transaction.date;
                                    if (!acc[date]) acc[date] = [];
                                    acc[date].push(transaction);
                                    return acc;
                                }, {})
                        ).map(([date, transactionsByDate]) => (
                            <div key={date} className="mb-6">
                                <p className="text-gray-600 font-semibold mb-2">
                                    {date}
                                </p>
                                <ul className="space-y-4">
                                    {transactionsByDate.map(transaction => (
                                        <li
                                            key={transaction.id}
                                            className="flex items-center justify-between p-4 bg-white border rounded-lg transition-transform transform hover:scale-105"
                                            onClick={() =>
                                                handleTransactionClick(
                                                    transaction.id
                                                )
                                            }
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        transaction.title ===
                                                        "Upi"
                                                            ? "/upii.png"
                                                            : transaction.title ===
                                                              "Bank"
                                                            ? "/bankk.png"
                                                            : "/default.jpg"
                                                    }
                                                    alt="icon"
                                                    className="w-10 h-10 rounded-full mr-4 shadow"
                                                />
                                                <div>
                                                    <p className="font-semibold">
                                                        {transaction.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {transaction.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`text-lg font-bold ${
                                                    transaction.type === "debit"
                                                        ? "text-red-500"
                                                        : "text-green-500"
                                                }`}
                                            >
                                                ₹{transaction.amount}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <img
                            src="https://cdni.iconscout.com/illustration/free/thumb/free-payment-error-illustration-download-in-svg-png-gif-file-formats--no-transaction-made-unsuccessful-failed-digital-business-pack-illustrations-6369553.png"
                            alt="No Transactions"
                            className="w-10/12 h-auto max-w-md"
                        />
                    </div>
                )}
            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
            >
                {drawerjsx}
            </SwipeableDrawer>
            <Toaster />
        </div>
    );
};

export default HomePage;
