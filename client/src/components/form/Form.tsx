import React from "react";
import InputTest from "../../atoms/InputTest";
import { IForm, IFormData } from "../../types/form.types";

interface IProps {
  setState: React.Dispatch<React.SetStateAction<IForm>>;
  data: IFormData[];
  submitText: string;
  submitHandler: (
    state: IForm,
    setState: React.Dispatch<React.SetStateAction<IForm>>
  ) => void;
  state: IForm;
}

const Form: React.FC<IProps> = ({
  setState,
  data,
  submitText,
  submitHandler,
  state
}) => {
  return (
    <div className="mt-4 w-full">
      <form className="w-full">
        <div className="flex flex-col space-y-4">
          {data.map((element: IFormData, index: number) => (
            <InputTest
              type={element.type}
              placeholder={element.placeholder}
              name={element.name}
              setState={setState}
              key={index.toString()}
            />
          ))}
        </div>
        <button className="w-full bg-mOrange text-white py-3 rounded-3xl mt-8 shadow-xl hover:text-white hover:bg-mBlack-300 animation font-semibold" onClick={(event)=> {
          event.preventDefault();
          submitHandler(state,setState)
        }} >
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default Form;
