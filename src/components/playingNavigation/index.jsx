/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

import { formatTimeForPlayingBar } from "../../utils/timeUltils";
import PopupComponent from "../popupComponent";
import Footer from "../footer";
import ButtonComponent from "../buttonComponent";

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
  const navigate = useNavigate();
  const selectElement = useRef();

  useEffect(() => {
    if (song && song.duration_ms) {
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
    <div className="bg-dark-secondary p-4 text-sm rounded-lg grid grid-cols-12 gap-4 ">
      <div className="col-span-3 flex items-center mt-2 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
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

      <div className="col-span-6 relative mt-2">
        {type === "songs" && song?.preview_url ? (
          <AudioPlayer src={song?.preview_url} />
        ) : type === "podcasts" && song?.audio_preview_url ? (
          <AudioPlayer src={song?.audio_preview_url} />
        ) : (
          <AudioPlayer />
        )}
        <div className="text-sm text-color mt-2 ">
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
      <div className="col-span-3 mt-4">
        <div className="flex justify-center items-center">
          <ButtonComponent onClick={() => setIsOpenAddPlaylist(true)}>
            <AddIcon
              className="mr-1 mb-1"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            />
            Playlist
          </ButtonComponent>
          <ButtonComponent
            type="dark"
            onClick={() => handleAddFavoriteSong(song)}
          >
            <FavoriteIcon className="mr-1 mb-1" sx={{ fontSize: "14px" }} />
            Yêu thích
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
              {storedPlaylists?.length > 0 ? (
                <select
                  className="px-6 py-3 rounded-md bg-neutral-700 w-full outline-none"
                  ref={selectElement}
                >
                  {storedPlaylists.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {`${item.title}`}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <p className="mt-1 rounded-full w-full text-sm">
                  Chưa có danh sách. Hãy tạo danh sách!
                </p>
              )}
            </div>
            <p className="text-xs font-bold text-justify">
              Hãy chọn một trong những danh sách để thêm nhạc.
            </p>
            <div className="mt-4 flex justify-end">
              <ButtonComponent
                type="dark"
                action="button"
                onClick={() => {
                  setIsOpenAddPlaylist(false);
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
                          songs: [...playlist.songs, song],
                        };
                      }
                    }
                    return playlist;
                  });
                  navigate(`/playlist/new/${selectedPlaylistId}`);
                  localStorage.setItem(
                    "playlists",
                    JSON.stringify(updatedPlaylists)
                  );
                  setIsOpenAddPlaylist(false);
                }}
              >
                Thêm
              </ButtonComponent>
            </div>
          </PopupComponent>
        </div>
        <Footer />
      </div>
    </div>
  );
}
