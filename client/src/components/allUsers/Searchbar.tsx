import React from "react";
import { HiSearch } from "react-icons/hi";
import { IWhoAmIResponse } from "../../api";

interface IProps {
  value: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  allUsersStateCopy: IWhoAmIResponse[] | undefined;
  setAllUsersState: React.Dispatch<
    React.SetStateAction<IWhoAmIResponse[] | undefined>
  >;
}

const Searchbar: React.FC<IProps> = ({
  value,
  setSearch,
  setAllUsersState,
  allUsersStateCopy,
}) => {
  return (
    <div className="flex items-center bg-mBlack-300 rounded-3xl">
      <input
        type="search"
        placeholder="Search..."
        className="w-full px-5 py-2 bg-mBlack-300 outline-none rounded-3xl text-white"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
          if (event.target.value === "") setAllUsersState(allUsersStateCopy);
          const filteredData = allUsersStateCopy?.filter(
            (user) =>
              user.username
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              user.providers[0].name
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
          );
          setAllUsersState(filteredData);
        }}
      />
      <div className="px-5">
        <HiSearch className="" />
      </div>
    </div>
  );
};

export default Searchbar;
