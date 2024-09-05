import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchIcon from "@mui/icons-material/Search";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ButtonComponent from "../buttonComponent";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <button className="size-8 bg-primary rounded-full mr-2">
          <GraphicEqIcon />
        </button>
        <h1 className="text-xl">K-Spotify</h1>
      </div>
      <div className="pd-box-lg bg-dark-secondary rounded-3xl flex justify-between">
        <button>
          <SearchIcon />
        </button>
        <input
          placeholder="Bài hát, nghệ sĩ, album..."
          className="bg-transparent mx-4 outline-none border-none text-color font-medium min-w-60"
        />
        <div>
          <span className="bg-dark-secondary mx-2">|</span>
          <Inventory2Icon className="text-sm" />
        </div>
      </div>
      <div className="flex">
        <ButtonComponent size="lg" type="dark">
          Đăng ký
        </ButtonComponent>
        <ButtonComponent size="lg" type="light">
          Đăng nhập
        </ButtonComponent>
        <div className="ml-2 size-14 bg-dark-secondary flex items-center justify-center rounded-full cursor-pointer">
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
