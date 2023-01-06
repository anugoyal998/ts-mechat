import React, { useRef } from "react";

interface IProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsOpenUsingCallbackFn: (
    fn: (isSettingsModalOpen: boolean) => boolean
  ) => void;
}

const Modal: React.FC<IProps> = ({
  children,
  isOpen,
  setIsOpen,
  setIsOpenUsingCallbackFn,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(ref.current === event.target) {
            ref.current.classList.add("modal-exit")
            setTimeout(() => setIsOpen(false),100)
        }
    }
    if(!isOpen) return null;
  return (
    <div
      className="w-screen h-screen absolute top-0 left-0 fcc modal-enter"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      ref={ref}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Modal;
