import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

import ButtonComponent from "../buttonComponent";

export default function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // Debounce logic: Delay updating the searchText after user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        navigate(`/search/${searchText.trim()}`);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleClearSearch = () => {
    setSearchText("");
  };
  return (
    <div className="max-[639px]:fixed max-[639px]:top-0 max-[639px]:right-0 max-[639px]:left-0 flex justify-between items-center z-50 max-[639px]:bg-zinc-800 max-[639px]:px-4 max-[639px]:py-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <button className="max-[767px]:size-7 md:size-8 bg-primary rounded-full mr-2">
          <GraphicEqIcon />
        </button>
        <h1 className="max-[767px]:text-md md:text-xl">K-Spotify</h1>
      </div>
      <div
        className={`max-[767px]:py-1 max-[767px]:px-2 md:pd-box-lg py-2 px-4 bg-dark-secondary rounded-3xl flex justify-between items-center box-border border-2 ${
          searchText ? "border-white" : "border-transparent"
        }`}
      >
        <button type="submit">
          <SearchIcon />
        </button>
        <input
          placeholder="Bài hát, nghệ sĩ, album..."
          value={searchText}
          className="bg-transparent max-[767px]:mx-2 md:mx-4 outline-none border-none text-color font-medium max-[767px]:text-xs max-[460px]:w-28 max-[768px]:w-30 md:w-40 lg:min-w-60"
          onChange={(e) => setSearchText(e.target.value)} // Update search input
        />
        <div className="md:flex items-center max-[767px]:hidden">
          <span className="bg-dark-secondary mx-2">|</span>
          {searchText ? (
            <CloseIcon
              className="cursor-pointer text-sm"
              onClick={handleClearSearch} // Clear search when clicked
            />
          ) : (
            <Inventory2Icon
              className="text-sm cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
          )}
        </div>
      </div>

      <div className="md:flex max-[767px]:hidden">
        <ButtonComponent
          className="max-[1023px]:hidden lg:block"
          size="md"
          type="dark"
        >
          Đăng ký
        </ButtonComponent>
        <ButtonComponent className="max-[1023px]:hidden lg:block" type="light">
          Đăng nhập
        </ButtonComponent>
        <div className="ml-2 size-10 bg-dark-secondary flex items-center justify-center rounded-full cursor-pointer">
          <img
            className="rounded-full size-10"
            src="https://i.scdn.co/image/ab67616d0000b273321440e7b75c6f210a72c76c"
            alt="song"
          />
        </div>
      </div>
    </div>
  );
}
