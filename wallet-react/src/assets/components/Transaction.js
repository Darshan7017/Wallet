import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { name } from "../Data";
import { toWords } from 'number-to-words';
import { user as token, url } from "../Data";

const Receipt = ({ transactionId }) => {
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`${url}/strans.php?id=${transactionId}&token=${token}`);
                const data = await response.json();

                if (data.status === "success") {
                    setTransaction(data.transaction);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to fetch transaction details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [transactionId]);

    const capitallet = str => str.charAt(0).toUpperCase() + str.slice(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-lg border border-gray-200">
            <div className="text-center mb-6">
                <h2 className="text-lg font-semibold mt-4">Payment Successful</h2>
                <div className="flex items-center justify-center mt-2">
                    <p className="text-2xl font-bold text-green-600">₹{transaction.amount}               </p>
                     <Icon icon="icon-park-solid:success" style={{ color: "#2dcb74", fontSize: "30px" }} />
                </div>
                <p className="text-gray-500 mt-2">
                    Rupees {capitallet(toWords(transaction.amount))} Only
                </p>
            </div>

            <hr className="border-t border-dashed border-gray-300" />

            <div className="py-4">
                <p className="text-gray-600">
                    <strong>To:</strong> {transaction.toname || "Not available"}
                </p>
                {transaction.toupi && (
                    <p className="text-gray-600">
                        <strong>UPI ID:</strong> {transaction.toupi}
                    </p>
                )}
                {transaction.tobank && (
                    <>
                        <p className="text-gray-600">
                            <strong>Bank:</strong> {transaction.tobank}
                        </p>
                        <p className="text-gray-600">
                            <strong>IFSC:</strong> {transaction.toifsc}
                        </p>
                    </>
                )}
            </div>

            <hr className="border-t border-dashed border-gray-300 " />

            <div className="py-4">
                <p className="text-gray-600">
                    <strong>From:</strong> {transaction.title}
                </p>
                <p className="text-gray-600">
                    <strong>Type:</strong> {capitallet(transaction.type)}
                </p>
            </div>

            <hr className="border-t border-dashed border-gray-300 " />

            <div className="py-4">
                <p className="text-gray-600">
                    <strong>UPI Ref. No:</strong> {transaction.upiReferenceNo || "N/A"}
                </p>
                <p className="text-gray-600">
                    <strong>Date:</strong> {transaction.date}
                </p>
                <p className="text-gray-600">
                    <strong>Time:</strong> {transaction.time}
                </p>
            </div>

            <hr className="border-t border-dashed border-gray-300 " />

            <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Powered by {name}</p>
            </div>
        </div>
    );
};

export default Receipt;
