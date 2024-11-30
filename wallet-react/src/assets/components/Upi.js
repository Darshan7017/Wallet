import Button from './Button';
import Input from "./Input";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {  user as token, url } from "../Data";

const Upi = ({ toast }) => {
    const [loading, setLoading] = useState(false);
    const [upiId, setUpiid] = useState("");
    const [amount, setAmount] = useState("");

    const withdrawUPI = async () => {
       setLoading(true);
        try {
            const response = await fetch(
                `${url}/withdraw.php?type=Upi&token=${token}&upiId=${upiId}&amount=${amount}`,
                {
                    method: "GET"
                }
            );

            const data = await response.json();

            if (data.status === "success") {
                toast.success(data.message);
                setTimeout(function() {
                  window.location.reload();
                }, 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again."+error);
        } finally {
          setLoading(false)
        }
    };

    return (
        <div className="p-10">
            <h1 className="font-bold text-center text-lg m-2">Upi Withdraw</h1>
            <Input
                placeholder="Enter Your Upi ID"
                icon={
                    <Icon icon="material-symbols-light:upi-pay-outline-rounded" />
                }
                onChange={(e) => setUpiid(e.target.value)}
            />
            <Input
                placeholder="Enter Amount To Withdraw"
                icon={<Icon icon="lets-icons:money-light" />}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button loading={loading} text="Withdraw" onClick={withdrawUPI} />
        </div>
    );
};

export default Upi;
