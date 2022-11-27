import React from "react";
import { IForm } from "../types/form.types";

interface IInputTest {
  type: string;
  placeholder: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<IForm>>;
}

const InputTest: React.FC<IInputTest> = ({
  type,
  placeholder,
  name,
  setState,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none w-full py-3 px-5 rounded-3xl shadow-xl bg-mBlack-300 text-white"
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setState((prev: IForm) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
        required
      />
    </div>
  );
};

export default InputTest
