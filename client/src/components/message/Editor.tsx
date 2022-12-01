import React from "react";
import { TbSend } from "react-icons/tb";

const Editor: React.FC = () => {
  return (
    <div className="bg-mBlack-300 w-full rounded-xl py-2 px-5 h-[65px] fcc">
      <textarea className="w-full h-[45px] bg-transparent outline-none border border-gray-400 rounded-3xl px-5" />
      <button className="bg-mOrange py-2 px-3 rounded-lg ml-3">
        <TbSend className="text-white text-3xl" />
      </button>
    </div>
  );
};

export default Editor;
