import React, { createContext, useContext, useEffect, useState } from "react";
import { url, user } from "../Data";

const Context = createContext();

export const MyProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/?token=${user}`);
            const result = await response.json();
            if (result.status === "success") {
                setData(result);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Context.Provider value={{ data, error }}>{children}</Context.Provider>
    );
};

export const Data = () => {
    return useContext(Context);
};
