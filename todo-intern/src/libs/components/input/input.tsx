import React from "react";

interface InputProps {
    placeholder?: string;
    label?: string;
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Updated here
    type?: string;
    name?: string;
    className?: string;
    readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    label,
    icon,
    value,
    onChange,
    type = "text",
    name,
    className,
    readOnly,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-gray-500 transition-all">
                {icon && <span className="px-3 text-gray-500">{icon}</span>}
                <input
                    type={type}
                    className="w-full p-2 bg-white text-gray-900 placeholder-gray-400 rounded-lg outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default Input;
