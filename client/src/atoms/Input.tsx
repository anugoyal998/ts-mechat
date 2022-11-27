// import React from "react";
// import { ILoginState, IRegisterState } from "../types";

// interface IInput<T> {
//   type: string;
//   placeholder: string;
//   name: string;
//   setState: React.Dispatch<React.SetStateAction<T>>;
//   state: T;
// }

// const Input = <T extends ILoginState>({
//   type,
//   placeholder,
//   name,
//   setState,
//   state,
// }: IInput<T>) => {
//   return (
//     <div className="w-full">
//       <input
//         type={type}
//         placeholder={placeholder}
//         className="outline-none w-full py-3 px-5 rounded-3xl shadow-xl bg-mBlack-300 text-white"
//         name={name}
//         onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//           setState(
//             (prev: T) =>
//               ({
//                 ...prev,
//                 [event.target.name]: event.target.value,
//               } as T)
//           )
//         }
//         required
//       />
//     </div>
//   );
// };

// export default Input;


import React from "react";
import { ILoginState, IRegisterState } from "../types";

interface IInput {
  type: string;
  placeholder: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<ILoginState>> | React.Dispatch<React.SetStateAction<IRegisterState>>;
  state: ILoginState | IRegisterState;
}

const Input = ({
  type,
  placeholder,
  name,
  setState,
  state,
}: IInput) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none w-full py-3 px-5 rounded-3xl shadow-xl bg-mBlack-300 text-white"
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setState(
            (prev: ILoginState | IRegisterState) =>
              ({
                ...prev,
                [event.target.name]: event.target.value,
              } as ILoginState | IRegisterState)
          )
        }
        required
      />
    </div>
  );
};

export default Input;
