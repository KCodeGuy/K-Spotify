/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ViewListIcon from "@mui/icons-material/ViewList";
import ErrorIcon from "@mui/icons-material/Error";
import AddIcon from "@mui/icons-material/Add";

import ButtonComponent from "../buttonComponent";
import PopupComponent from "../popupComponent";

export default function SideBar({
  setTypePlaying,
  favoriteSongs,
  setFavoriteSongs,
  setCurrentSong,
}) {
  const [isOpenAddPlaylist, setIsOpenAddPlaylist] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      try {
        setPlaylists(JSON.parse(storedPlaylists));
      } catch (error) {
        console.error("Error parsing playlists from localStorage", error);
      }
    }
  }, []);

  const handlePlaySong = (song, type) => {
    setCurrentSong(song);
    if (type) {
      setTypePlaying(type);
    }
  };

  const isDuplicatePlaylist = (playlistTitle) => {
    return playlists.filter((item) => item.title === playlistTitle).length > 0;
  };

  const handleAddPlaylist = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!playlistTitle) {
      newErrors.playlistTitle = "Tiêu đề không được để trống!";
    }
    if (isDuplicatePlaylist(playlistTitle)) {
      newErrors.playlistTitle = "Tiêu đề đã tồn tại!";
    }
    if (!playlistDescription) {
      newErrors.playlistDescription = "Mô tả không được để trống!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPlaylist = {
      id: playlists.length,
      title: playlistTitle,
      description: playlistDescription,
      songs: [],
    };

    const updatedPlaylists = [...playlists, newPlaylist];

    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));

    setPlaylists(updatedPlaylists);

    setPlaylistTitle("");
    setPlaylistDescription("");
    setErrors({});
    setIsOpenAddPlaylist(false);
  };

  const handleDeletePlaylist = (id) => {
    const updatedPlaylists = playlists.filter((item) => item.id !== id);
    setPlaylists(updatedPlaylists);

    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const handleDeleteSong = (id) => {
    const updatedSongs = favoriteSongs?.filter((item) => item.id !== id);
    setFavoriteSongs(updatedSongs);
    localStorage.setItem("favoriteSongs", JSON.stringify(updatedSongs));
  };

  return (
    <div className="w-full bg-dark-secondary rounded-lg max-[639px]:py-2 sm:py-4 px-4">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <ViewListIcon />
            <p className="font-bold text-color ml-2 max-[639px]:text-sm">
              Thư viện
            </p>
          </div>
          <button
            className="size-8 bg-primary rounded-full"
            onClick={() => setIsOpenAddPlaylist(true)}
          >
            <AddIcon />
          </button>
          <PopupComponent
            title="Tạo danh sách phát"
            description="Hãy thêm danh sách phát"
            isOpen={isOpenAddPlaylist}
            onClose={() => {
              setPlaylistTitle("");
              setPlaylistDescription("");
              setErrors({});
              setIsOpenAddPlaylist(false);
            }}
          >
            <form onSubmit={handleAddPlaylist}>
              <div className="mb-3 text-sm text-white">
                <input
                  id="playlistTitle"
                  type="text"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  className="px-6 py-3 rounded-full bg-neutral-700 w-full outline-none focus:border-b-2 focus:border-green-600"
                  placeholder="Tiêu đề danh sách..."
                />
                {errors.playlistTitle && (
                  <p className="mt-1 rounded-full w-full text-xs text-red-600">
                    <ErrorIcon className="mb-0.5" /> {errors.playlistTitle}
                  </p>
                )}
              </div>
              <div className="mb-3 text-sm text-white ">
                <input
                  id="playlistDescription"
                  type="text"
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  className="px-6 py-3 rounded-full bg-neutral-700 w-full outline-none focus:border-b-2 focus:border-green-600"
                  placeholder="Mô tả danh sách..."
                />
                {errors.playlistDescription && (
                  <p className="mt-1 rounded-full w-full text-xs text-red-600">
                    <ErrorIcon className="mb-0.5" />{" "}
                    {errors.playlistDescription}
                  </p>
                )}
              </div>
              <p className="text-xs font-bold text-justify">
                Bằng cách tiếp tục, bạn đồng ý cho phép K-Spotify truy cập vào
                hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo có quyền tải
                lên hình ảnh.
              </p>
              <div className="mt-4 flex justify-end">
                <ButtonComponent
                  type="dark"
                  action="button"
                  onClick={() => {
                    setIsOpenAddPlaylist(false); // Reset fields and close the popup
                    setPlaylistTitle("");
                    setPlaylistDescription("");
                    setErrors({});
                  }}
                >
                  Hủy bỏ
                </ButtonComponent>
                <ButtonComponent action="submit">Thêm</ButtonComponent>
              </div>
            </form>
          </PopupComponent>
        </div>

        <ul className="max-[1023px]:flex lg:block max-[1023px]:overflow-x-scroll">
          {playlists?.length > 0 ? (
            playlists?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center max-[1023px]:mt-1 lg:mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer group max-[1023px]:min-w-52 max-[1023px]:mr-2"
                  onClick={() => navigate(`/playlist/new/${item.id}`)}
                >
                  <div className="bg-dark-third p-3 rounded-md">
                    <LibraryMusicIcon />
                  </div>
                  <div className="ml-3 w-full">
                    <p className="font-bold max-w-52 line-clamp-1 max-[639px]:text-sm">
                      # {item.title}
                    </p>
                    <div className="flex justify-between items-center text-xs text-color ">
                      <p className="max-w-40 line-clamp-1">
                        {item.description}
                      </p>
                      <button
                        className="max-[639px]:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the link from being triggered
                          handleDeletePlaylist(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-color text-sm mt-2">Chưa có danh sách!</p>
          )}
        </ul>
      </div>
      <div className="max-[768px]:mt-2 md:mt-5">
        <div className="flex justify-between">
          <div className="flex items-center">
            <QueueMusicIcon />
            <p className="font-bold text-color ml-2 max-[639px]:text-sm">
              Nhạc yêu thích
              {favoriteSongs.length > 0
                ? ` (${favoriteSongs?.length} bài hát)`
                : ""}
            </p>
          </div>
          <PopupComponent
            title="Tạo danh sách phát"
            description="Hãy thêm danh sách phát"
            isOpen={isOpenAddPlaylist}
            onClose={() => {
              setPlaylistTitle("");
              setPlaylistDescription("");
              setErrors({});
              setIsOpenAddPlaylist(false);
            }}
          >
            <form onSubmit={handleAddPlaylist}>
              <div className="mb-3 text-sm text-white">
                <input
                  id="playlistTitle"
                  type="text"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  className="px-6 py-3 rounded-full bg-neutral-700 w-full outline-none focus:border-b-2 focus:border-green-600"
                  placeholder="Tiêu đề danh sách..."
                />
                {errors.playlistTitle && (
                  <p className="mt-1 rounded-full w-full text-xs text-red-600">
                    <ErrorIcon className="mb-0.5" /> {errors.playlistTitle}
                  </p>
                )}
              </div>
              <div className="mb-3 text-sm text-white ">
                <input
                  id="playlistDescription"
                  type="text"
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  className="px-6 py-3 rounded-full bg-neutral-700 w-full outline-none focus:border-b-2 focus:border-green-600"
                  placeholder="Mô tả danh sách..."
                />
                {errors.playlistDescription && (
                  <p className="mt-1 rounded-full w-full text-xs text-red-600">
                    <ErrorIcon className="mb-0.5" />{" "}
                    {errors.playlistDescription}
                  </p>
                )}
              </div>
              <p className="text-xs font-bold text-justify">
                Bằng cách tiếp tục, bạn đồng ý cho phép K-Spotify truy cập vào
                hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo có quyền tải
                lên hình ảnh.
              </p>
              <div className="mt-4 flex justify-end">
                <ButtonComponent
                  type="dark"
                  action="button"
                  onClick={() => {
                    setIsOpenAddPlaylist(false); // Reset fields and close the popup
                    setPlaylistTitle("");
                    setPlaylistDescription("");
                    setErrors({});
                  }}
                >
                  Hủy bỏ
                </ButtonComponent>
                <ButtonComponent action="submit">Thêm</ButtonComponent>
              </div>
            </form>
          </PopupComponent>
        </div>

        <ul className="max-[1023px]:flex lg:block max-[1023px]:overflow-x-scroll ">
          {favoriteSongs && favoriteSongs?.length > 0 ? (
            favoriteSongs?.map((song, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center max-[1023px]:mt-1 lg:mt-3 hover:bg-neutral-700 p-1 rounded-md relative group max-[1023px]:w-max max-[1023px]:mr-2">
                    <div>
                      <img
                        className="rounded-md size-10 object-cover object-center group-hover:opacity-50 transition-opacity duration-300"
                        src={
                          song?.album?.images[0]?.url ||
                          "https://i.scdn.co/image/ab67616d0000b27303828121665d8419f71f6499"
                        }
                        alt={song?.name || "Song"}
                      />
                    </div>
                    <div className="ml-3 max-w-56 text-sm">
                      <p className="font-bold max-[768px]:max-w-36 md:max-w-52 line-clamp-1">
                        {song?.name || "Song Name"}
                      </p>
                      <p className="text-color max-[768px]:max-w-20 md:max-w-40 line-clamp-1">
                        {song?.artists
                          ?.map((artist) => artist.name)
                          .join(", ") || "Artist"}
                      </p>
                      <button
                        onClick={() => handlePlaySong(song, "songs")} // Pass song object directly
                        className="size-6 flex justify-center items-center rounded-full bg-primary absolute left-3 top-1/2 transform -translate-y-1/2  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <PlayArrowIcon className="text-3xl" />
                      </button>
                      <button
                        className="flex justify-center items-center rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 max-[768px]:-translate-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the link from being triggered
                          handleDeleteSong(song?.id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-color text-sm mt-2">
              Chưa có bài hát yêu thích!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
