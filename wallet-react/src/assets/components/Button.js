import React from "react";

const Button = ({ onClick, loading, disabled, text }) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: '#0063f7' }}
            className={`w-full text-white py-2 rounded hover:bg-blue-600 transition duration-300 flex justify-center items-center mx-auto
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled || loading}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
            )}
            {text}
        </button>
    );
};

export default Button;