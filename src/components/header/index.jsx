import { useEffect, useState } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchIcon from "@mui/icons-material/Search";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import CloseIcon from "@mui/icons-material/Close"; // Import Clear Icon
import ButtonComponent from "../buttonComponent";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(""); // The input value with debounce applied

  // Debounce logic: Delay updating the searchText after user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        // Here you can make API calls or handle search logic based on searchText
        navigate(`/search/${searchText.trim()}`);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]); // Runs when searchText changes

  const handleClearSearch = () => {
    setSearchText(""); // Clear the search input
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <button className="size-8 bg-primary rounded-full mr-2">
          <GraphicEqIcon />
        </button>
        <h1 className="text-xl">K-Spotify</h1>
      </div>
      <div
        className={`pd-box-lg bg-dark-secondary rounded-3xl flex justify-between items-center box-border border-2 ${
          searchText ? "border-white" : "border-transparent"
        }`}
      >
        <button type="submit">
          <SearchIcon />
        </button>
        <input
          placeholder="Bài hát, nghệ sĩ, album..."
          value={searchText}
          className="bg-transparent mx-4 outline-none border-none text-color font-medium min-w-60"
          onChange={(e) => setSearchText(e.target.value)} // Update search input
        />
        <div className="flex items-center">
          <span className="bg-dark-secondary mx-2">|</span>
          {searchText ? (
            <CloseIcon
              className="cursor-pointer text-sm"
              onClick={handleClearSearch} // Clear search when clicked
            />
          ) : (
            <Inventory2Icon className="text-sm" />
          )}
        </div>
      </div>

      <div className="flex">
        <ButtonComponent size="md" type="dark">
          Đăng ký
        </ButtonComponent>
        <ButtonComponent type="light">Đăng nhập</ButtonComponent>
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
