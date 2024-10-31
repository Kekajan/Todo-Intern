import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, placeholder, value, onChange, className }) => (
  <div className="border border-gray-300 rounded-lg focus-within:border-gray-500 transition-all">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`mt-1 shadow-sm sm:text-sm ${className}`}
    />
  </div>
);

export default TextArea;
