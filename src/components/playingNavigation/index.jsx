/* eslint-disable react/prop-types */
import AudioPlayer from "react-h5-audio-player";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import "react-h5-audio-player/lib/styles.css";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ButtonComponent from "../buttonComponent";
import { useEffect, useRef, useState } from "react";
import { formatTimeForPlayingBar } from "../../utils/timeUltils";
import Footer from "../footer";
import PopupComponent from "../popupComponent";

export default function PlayingNavigation({
  song,
  type = "songs",
  favoriteSongs,
  setFavoriteSongs,
}) {
  const [songDuration, setSongDuration] = useState("");
  const [isOpenAddPlaylist, setIsOpenAddPlaylist] = useState(false);
  let storedPlaylists = [];
  let result = JSON.parse(localStorage.getItem("playlists"));
  storedPlaylists = result;

  const selectElement = useRef();

  useEffect(() => {
    if (song && song.duration_ms) {
      // Calculate the formatted duration
      setSongDuration(formatTimeForPlayingBar(song.duration_ms));
    }
  }, [song]);

  const handleAddFavoriteSong = (song) => {
    let isDuplicate = false;
    if (favoriteSongs?.length > 0) {
      isDuplicate = favoriteSongs?.find((item) => item.name === song.name);
    }
    if (!isDuplicate && song) {
      setFavoriteSongs([...favoriteSongs, song]);
      localStorage.setItem(
        "favoriteSongs",
        JSON.stringify([...favoriteSongs, song])
      );
    }
  };

  return (
    <div className="bg-dark-secondary p-4 text-sm rounded-lg grid grid-cols-12 gap-4">
      <div className="col-span-3 flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
        <div>
          <img
            className="rounded-full size-16 object-cover object-center rotate-img"
            src={
              type === "songs" && song?.album?.images[0]?.url
                ? song?.album?.images[0]?.url
                : type === "podcasts" && song?.images[0]?.url
                ? song?.images[0]?.url
                : "https://i.scdn.co/image/ab67616d0000b27303828121665d8419f71f6499"
            }
            alt={song?.name || "Song"}
          />
        </div>
        <div className="ml-3 max-w-56">
          <h5 className="font-bold max-w-52 line-clamp-2">
            {song?.name || "Bài hát"}
          </h5>
          <p className="text-sm text-color line-clamp-1">
            {type === "songs"
              ? song?.artists?.map((artist) => artist.name).join(", ") ||
                "Artist"
              : type === "podcasts"
              ? `Podcast - ${song?.release_date}`
              : "Nghệ sĩ"}
          </p>
        </div>
      </div>

      <div className="col-span-6 relative">
        {type === "songs" && song?.preview_url ? (
          <AudioPlayer src={song?.preview_url} />
        ) : type === "podcasts" && song?.audio_preview_url ? (
          <AudioPlayer src={song?.audio_preview_url} />
        ) : (
          <AudioPlayer />
        )}
        <div className="text-sm text-color mt-2 ">
          {/* Display the song's duration */}
          <p
            className={`absolute top-2.5 ${
              song?.preview_url ? "left-4" : "left-2"
            }`}
          >
            00:00
          </p>
          <p
            className={`absolute top-2.5 ${
              song?.preview_url ? "right-4" : "right-2"
            }`}
          >
            {song?.preview_url || song?.audio_preview_url
              ? songDuration
              : "00:00"}
          </p>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex justify-center items-center">
          <ButtonComponent onClick={() => handleAddFavoriteSong(song)}>
            <FavoriteIcon className="mr-1 mb-1" sx={{ fontSize: "14px" }} />
            Yêu thích
          </ButtonComponent>
          <ButtonComponent onClick={() => setIsOpenAddPlaylist(true)}>
            <AddIcon
              className="mr-1 mb-1"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            />
            Playlist
          </ButtonComponent>
          <PopupComponent
            title="Thêm nhạc sách phát"
            description="Hãy thêm nhạc danh sách phát"
            isOpen={isOpenAddPlaylist}
            onClose={() => {
              setIsOpenAddPlaylist(false);
            }}
          >
            <div className="mb-3 text-sm text-white ">
              <select
                className="px-6 py-3 rounded-md bg-neutral-700 w-full outline-none"
                ref={selectElement}
              >
                {storedPlaylists?.length > 0
                  ? storedPlaylists.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {`${item.title}`}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
            <p className="text-xs font-bold text-justify">
              Hãy chọn một trong những danh sách để thêm nhạc.
            </p>
            <div className="mt-4 flex justify-end">
              <ButtonComponent
                type="dark"
                action="button"
                onClick={() => {
                  setIsOpenAddPlaylist(false); // Reset fields and close the popup
                }}
              >
                Hủy bỏ
              </ButtonComponent>
              <ButtonComponent
                onClick={() => {
                  // Get the selected playlist ID
                  const selectedPlaylistId = parseInt(
                    selectElement.current.value,
                    10
                  );
                  const updatedPlaylists = storedPlaylists.map((playlist) => {
                    if (playlist.id === selectedPlaylistId) {
                      // Check if the song already exists in the playlist
                      const isSongAlreadyAdded = playlist.songs.some(
                        (item) => item.name === song.name
                      );

                      if (!isSongAlreadyAdded) {
                        return {
                          ...playlist,
                          songs: [...playlist.songs, song], // Add the current song to the playlist
                        };
                      }
                    }
                    return playlist;
                  });
                  // Update localStorage with the new playlists
                  localStorage.setItem(
                    "playlists",
                    JSON.stringify(updatedPlaylists)
                  );

                  // Close the popup after adding the song
                  setIsOpenAddPlaylist(false);
                }}
              >
                Thêm
              </ButtonComponent>
            </div>
          </PopupComponent>
          <button title="Lời bài hát" className="ml-2">
            <PlaylistPlayIcon />
          </button>
          <button title="Danh sách chờ" className="ml-2">
            <QueueMusicIcon />
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
