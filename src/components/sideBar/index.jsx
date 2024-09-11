/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import PopupComponent from "../popupComponent";
import ButtonComponent from "../buttonComponent";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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

  // Load playlists from localStorage on component mount
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
    setCurrentSong(song); // Set the currently playing song
    if (type) {
      setTypePlaying(type);
    }
  };

  const isDuplicatePlaylist = (playlistTitle) => {
    return playlists.filter((item) => item.title === playlistTitle).length > 0;
  };

  const handleAddPlaylist = (e) => {
    e.preventDefault();

    // Reset errors before validation
    const newErrors = {};

    // Validate the fields
    if (!playlistTitle) {
      newErrors.playlistTitle = "Tiêu đề không được để trống!";
    }
    // Validate the fields
    if (isDuplicatePlaylist(playlistTitle)) {
      newErrors.playlistTitle = "Tiêu đề đã tồn tại!";
    }
    if (!playlistDescription) {
      newErrors.playlistDescription = "Mô tả không được để trống!";
    }

    // If there are any errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create the new playlist object
    const newPlaylist = {
      id: playlists.length,
      title: playlistTitle,
      description: playlistDescription,
      songs: [],
    };

    // Add the new playlist to the list
    const updatedPlaylists = [...playlists, newPlaylist];

    // Save the updated playlists to localStorage
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));

    // Update the state with the new list of playlists
    setPlaylists(updatedPlaylists);

    // Reset form fields and close the popup
    setPlaylistTitle("");
    setPlaylistDescription("");
    setErrors({});
    setIsOpenAddPlaylist(false);
  };

  const handleDeletePlaylist = (id) => {
    const updatedPlaylists = playlists.filter((item) => item.id !== id);
    // Update state with the new list of playlists
    setPlaylists(updatedPlaylists);

    // Save the updated playlists to localStorage
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const handleDeleteSong = (id) => {
    const updatedSongs = favoriteSongs?.filter((item) => item.id !== id);
    // Update state with the new list of playlists
    setFavoriteSongs(updatedSongs);
    localStorage.setItem("favoriteSongs", JSON.stringify(updatedSongs));
  };

  return (
    <div className="w-full bg-dark-secondary rounded-lg py-4 px-4 h-full-screen overflow-y-scroll">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <ViewListIcon />
            <p className="font-bold text-color ml-2">Thư viện</p>
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

        <ul>
          {playlists?.length > 0 ? (
            playlists?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer group"
                  onClick={() => navigate(`/playlist/new/${item.id}`)}
                >
                  <div className="bg-dark-third p-3 rounded-md">
                    <LibraryMusicIcon />
                  </div>
                  <div className="ml-3 w-full">
                    <p className="font-bold max-w-52 line-clamp-1">
                      {item.title}
                    </p>
                    <div className="flex justify-between items-center text-xs text-color ">
                      <p className="max-w-40 line-clamp-1">
                        {item.description}
                      </p>
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            <p className="font-bold text-color text-sm">Chưa có danh sách!</p>
          )}
        </ul>
      </div>
      <div className=" mt-5">
        <div className="flex justify-between">
          <div className="flex items-center">
            <FavoriteBorderIcon />
            <p className="font-bold text-color ml-2">
              Nhạc yêu thích
              {favoriteSongs.length > 0
                ? `(${favoriteSongs?.length} bài hát)`
                : ""}
            </p>
          </div>
          {/* <button
            className="size-8 bg-primary rounded-full"
            onClick={() => setIsOpenAddPlaylist(true)}
          >
            <AddIcon />
          </button> */}
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

        <ul>
          {favoriteSongs && favoriteSongs?.length > 0 ? (
            favoriteSongs?.map((song, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center mt-3 hover:bg-neutral-700 p-1 rounded-md relative group">
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
                      <p className="font-bold max-w-52 line-clamp-1">
                        {song?.name || "Song Name"}
                      </p>
                      <p className="text-color max-w-40 line-clamp-1">
                        {song?.artists
                          ?.map((artist) => artist.name)
                          .join(", ") || "Artist"}
                      </p>
                      <button
                        onClick={() => handlePlaySong(song, "songs")} // Pass song object directly
                        className="size-6 flex justify-center items-center rounded-full bg-primary absolute left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <PlayArrowIcon className="text-3xl" />
                      </button>
                      <button
                        className="flex justify-center items-center rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            <p className="font-bold text-color text-sm">Chưa có danh sách!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
