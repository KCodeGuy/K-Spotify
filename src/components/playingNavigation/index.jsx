import AudioPlayer from "react-h5-audio-player";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import "react-h5-audio-player/lib/styles.css";
import AddIcon from "@mui/icons-material/Add";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ButtonComponent from "../ButtonComponent";

export default function PlayingNavigation() {
  return (
    <div className="bg-dark-secondary p-4 text-sm rounded-lg grid grid-cols-12 gap-4">
      <div className="col-span-3 flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
        <div>
          <img
            className="rounded-full size-16 rotate-img"
            src="https://i.scdn.co/image/ab67616d0000b273321440e7b75c6f210a72c76c"
            alt="song"
          />
        </div>
        <div className="ml-3">
          <h5 className="font-bold">Ngủ một mình</h5>
          <p className="text-sm text-color">Hiếu thứ hai</p>
        </div>
      </div>

      <div className="col-span-6">
        <AudioPlayer src="https://www.youtube.com/watch?v=gNz-TZIuNwo" />
      </div>
      <div className="col-span-3 flex items-center">
        <ButtonComponent>
          <AddIcon className="mr-1 mb-1" />
          Thêm vào yêu thích
        </ButtonComponent>
        <button title="Lời bài hát" className="ml-2">
          <PlaylistPlayIcon />
        </button>
        <button title="Danh sách chờ" className="ml-2">
          <QueueMusicIcon />
        </button>
      </div>
    </div>
  );
}
