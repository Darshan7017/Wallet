import Button from "./Button";
import Input from "./Input";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Data } from "./Context";
import { user as token, url } from "../Data";

const Profile = ({ toast }) => {
    const { data } = Data();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [tgid, setTgid] = useState("");

    useEffect(() => {
        if (data) {
            setName(data.user.name);
            setTgid(data.user.tgid);
        }
    }, [data]);

    const updateProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${url}/profile.php?token=${token}&name=${name}&tgid=${tgid}`,
                {
                    method: "GET"
                }
            );

            const result = await response.json();
            if (result.status === "success") {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again." + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="font-bold text-center text-lg m-2">Profile</h1>
            <Input
                placeholder="Enter Your Name"
                icon={<Icon icon="icon-park-outline:edit-name" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Enter Your Telegram Id"
                icon={<Icon icon="hugeicons:telegram" />}
                value={tgid}
                onChange={(e) => setTgid(e.target.value)}
            />
            <Button loading={loading} text="Update" onClick={updateProfile} />
        </div>
    );
};

export default Profile;
