import React from "react";

const InputWithIcon = ({ value, onChange, placeholder, icon, id, type = "text", className = "" }) => {
    return (
        <div className="relative mb-4">
            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            />
        </div>
    );
};

export default InputWithIcon;