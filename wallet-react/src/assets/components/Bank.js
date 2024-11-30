import Button from './Button';
import Input from "./Input";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { user as token, url } from "../Data";

const Bank = ({ toast }) => {
    const [loading, setLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const withdrawBank = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${url}/withdraw.php?type=Bank&token=${token}&name=${name}&accountNumber=${accountNumber}&name=${name}&ifsc=${ifsc}&amount=${amount}`,
                {
                    method: "GET"
                }
            );

            const data = await response.json();

            if (data.status === "success") {
                toast.success(data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again. " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="font-bold text-center text-lg m-2">Bank Withdraw</h1>
            <Input
                placeholder="Enter Your Name"
                icon={<Icon icon="icon-park-outline:edit-name" />}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Enter Your Account Number"
                icon={<Icon icon="mdi:bank-check" />}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Input
                placeholder="Enter Your IFSC Code"
                icon={<Icon icon="mdi:bank-transfer-in" />}
                onChange={(e) => setIfsc(e.target.value)}
            />
            <Input
                placeholder="Enter Amount To Withdraw"
                icon={<Icon icon="lets-icons:money-light" />}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button loading={loading} text="Withdraw" onClick={withdrawBank} />
        </div>
    );
};

export default Bank;