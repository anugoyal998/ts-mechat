import React, { useState } from "react";
import { IRegisterState } from "../types";

interface IProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<IRegisterState>>;
}

const Input: React.FC<IProps> = ({
  type,
  placeholder,
  value,
  name,
  setState,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="outline-none w-full py-3 px-5 rounded-3xl shadow-xl bg-mBlack-300 text-white"
      value={value}
      name={name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setState((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }))
      }
      required
    />
  );
};

export default Input;
