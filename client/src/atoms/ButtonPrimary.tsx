import React from "react";

interface IButtomPrimary {
  text: string;
  onClick: () => void;
}

const ButtonPrimary = ({ text }: IButtomPrimary) => {
  return (
    <button className="w-full bg-mOrange text-white py-3 rounded-3xl mt-8 shadow-xl hover:text-white hover:bg-mBlack-300 animation font-semibold">
      {text}
    </button>
  );
};

export default ButtonPrimary;
