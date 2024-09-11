/* eslint-disable react/prop-types */
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { getAlbumById } from "../../services/AlbumService";
import { getSpotifyToken } from "../../services/SpotifyAuthService";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { formatDuration } from "../../utils/timeUltils";
import { getPodcastById } from "../../services/PodcastService";
import {
  getArtistById,
  getTracksByArtistID,
} from "../../services/ArtistService";
import { randomGradient } from "../../utils/randomUtils";

function ListSongs({ setCurrentSong, setTypePlaying }) {
  const [listResult, setListResult] = useState([]);
  const [artistsInfo, setArtistsInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();

  // Handle song playback
  const handlePlaySong = async (song, type) => {
    setCurrentSong(song);
    if (type) {
      setTypePlaying(type);
    }
  };

  const bgGradientOptions = [
    "bg-primary-gradient",
    "bg-darkBlue-gradient",
    "bg-darkRed-gradient",
    "bg-darkGreen-gradient",
    "bg-darkOrange-gradient",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const accessToken = await getSpotifyToken();
        let listAllResult = [];
        if (accessToken) {
          // Execute API calls in parallel
          if (type === "albums") {
            listAllResult = await getAlbumById(accessToken, id);
          } else if (type === "artists") {
            let result = {};
            result = await getArtistById(accessToken, id);
            if (result) {
              setArtistsInfo(result);
            }
            listAllResult = await getTracksByArtistID(accessToken, id);
          } else if (type === "podcasts") {
            listAllResult = await getPodcastById(accessToken, id);
          } else if (type === "new") {
            const storedPlaylists = JSON.parse(
              localStorage.getItem("playlists")
            );
            if (storedPlaylists?.length > 0) {
              const currentPlaylist = storedPlaylists.find(
                (item) => item.id === +id
              );
              setArtistsInfo(currentPlaylist);
              listAllResult = currentPlaylist.songs;
            }
          }
          // Update state with fetched data
          setListResult(listAllResult);
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          console.log(`Rate limited. Retrying after ${retryAfter} seconds`);
          setTimeout(loadData, retryAfter * 1000); // Retry after the specified time
        } else {
          console.error("Error fetching data: ", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [type, id]);
  return (
    <div
      className={`rounded-lg h-full-screen transition-smooth overflow-y-scroll ${randomGradient(
        bgGradientOptions
      )}`}
    >
      {loading ? (
        <div className="w-full flex justify-center items-center h-full-screen">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <div className="p-4 flex items-end max-h-max mb-4 my-4">
            <img
              className="size-36 rounded-lg object-cover object-center"
              src={
                type !== "artists" && listResult?.images?.length > 0
                  ? listResult?.images[0]?.url
                  : type === "artists" && artistsInfo?.images?.length > 0
                  ? artistsInfo?.images[0]?.url
                  : "https://i.scdn.co/image/ab67616d0000b27303828121665d8419f71f6499"
              }
              alt={
                type !== "artists" && listResult?.images
                  ? listResult?.images[0]?.url
                  : type === "artists" && artistsInfo?.images
                  ? artistsInfo?.images[0]?.url
                  : "Background image"
              }
            />
            <div className="ml-6">
              <h1 className="text-6xl font-bold pr-6">
                {type !== "artists" && listResult?.images
                  ? listResult?.name
                  : type === "artists" && artistsInfo?.name
                  ? artistsInfo?.name
                  : type === "new" && artistsInfo?.title
                  ? artistsInfo?.title
                  : "Artist's name"}
              </h1>

              {type === "albums" ? (
                <p className="text-sm mt-2 text-color text-justify">
                  {listResult?.artists?.map((artist) => artist.name).join(", ")}
                </p>
              ) : type === "podcasts" ? (
                <p className="text-sm mt-2 text-color text-justify line-clamp-3">
                  <span className="font-bold">{listResult?.publisher}</span>
                  <span className="mx-2">-</span>
                  {listResult?.description}
                </p>
              ) : type === "artists" ? (
                <div className="w-full flex items-center mt-2">
                  <div className="size-5 bg-blue-500 rounded-full mr-2 text-center">
                    <CheckIcon
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "6px",
                        marginLeft: "2px",
                      }}
                    />
                  </div>
                  <span className="text-white text-sm">
                    Nghệ sĩ được xác minh
                  </span>
                </div>
              ) : type === "new" ? (
                <div className="w-full flex items-center mt-2">
                  <span className="text-color text-sm">
                    {artistsInfo?.description}
                  </span>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center mt-2">
                <button className="size-8 bg-primary rounded-full mr-2">
                  <GraphicEqIcon />
                </button>
                <p className="text-sm ">
                  <span className="font-bold">K-Spotify</span>
                  <span className="mx-2">|</span>
                  {type === "albums" ? (
                    <span>{listResult?.total_tracks} bài hát</span>
                  ) : type == "podcasts" ? (
                    <span>{listResult?.total_episodes} tập</span>
                  ) : type === "artists" ? (
                    <span className="text-color">
                      {artistsInfo?.followers?.total} người theo dỗi
                    </span>
                  ) : type === "new" ? (
                    <span className="text-color">
                      {artistsInfo?.songs?.length} bài hát
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="w-full relative p-4">
            {/* Overlay */}
            <div className="bg-dark-secondary opacity-20 absolute inset-0 z-0 bottom-0 right-0 left-0 min-h-80"></div>

            {/* Buttons container */}
            <div className="relative z-20 flex justify-between items-center">
              <div className="flex">
                <button className="size-14 flex justify-center items-center rounded-full bg-primary cursor-pointer">
                  <PlayArrowIcon className="text-3xl" />
                </button>
                <button className="text-3xl ml-6 cursor-pointer">
                  <AddIcon />
                </button>
              </div>
              <div className="flex items-end text-color">
                <span className="text-sm mr-2">Sắp xếp:</span>
              </div>
            </div>

            <table className="text-sm text-color w-full mt-6 text-left">
              <thead className="border-b-2 mb-2">
                <tr>
                  <th className="py-3">STT.</th>
                  <th className="py-3 text-left">Bài hát</th>
                  <th className="py-3">Nghệ sĩ</th>
                  <th className="py-3">Album</th>
                  <th className="py-3 text-center">Thời lượng</th>
                </tr>
              </thead>
              <tbody>
                {type === "albums" && listResult?.tracks?.items?.length > 0
                  ? listResult?.tracks?.items?.map((song, index) => {
                      return (
                        <tr
                          key={song.id}
                          className="w-full cursor-pointer hover:bg-neutral-500 hover:bg-opacity-70 transition-smooth rounded-md"
                          onClick={() => handlePlaySong(song, "songs")}
                        >
                          <td className="py-3 px-3 w-14">{index + 1}</td>
                          <td className="py-3 pr-5 text-left">{song.name}</td>
                          <td className="py-3 pr-5 text-left">
                            {song.artists[0].name}
                          </td>
                          <td className="py-3 text-left">{listResult?.name}</td>
                          <td className="text-center">
                            {formatDuration(song.duration_ms)}
                          </td>
                        </tr>
                      );
                    })
                  : type === "artists" && listResult?.length > 0
                  ? listResult?.map((song, index) => {
                      return (
                        <tr
                          key={song.id}
                          className="cursor-pointer hover:bg-neutral-500 hover:bg-opacity-70 transition-smooth transition-smooth"
                          onClick={() => handlePlaySong(song, "songs")}
                        >
                          <td className="py-3 px-3 w-14">{index + 1}</td>
                          <td className="py-3 pr-5 text-left">{song.name}</td>
                          <td className="py-3 pr-5 text-left">
                            {song.artists?.map((item) => item.name).join(", ")}
                          </td>
                          <td className="py-3 text-left">{song.album.name}</td>
                          <td className="text-center">
                            {formatDuration(song.duration_ms)}
                          </td>
                        </tr>
                      );
                    })
                  : type === "podcasts" &&
                    listResult?.episodes?.items?.length > 0
                  ? listResult?.episodes?.items?.map((song, index) => {
                      return (
                        <tr
                          key={song.id}
                          className="cursor-pointer hover:bg-neutral-500 hover:bg-opacity-70 transition-smooth"
                          onClick={() => handlePlaySong(song, "podcasts")}
                        >
                          <td className="py-3 px-3 w-14">{index + 1}</td>
                          <td className="py-3 pr-5 text-left">{song?.name}</td>
                          <td className="py-3 pr-5 text-left">
                            {listResult?.publisher}
                          </td>
                          <td className="py-3 text-left">{listResult?.name}</td>
                          <td className="text-center">
                            {formatDuration(song.duration_ms)}
                          </td>
                        </tr>
                      );
                    })
                  : type === "new" && listResult?.length > 0
                  ? listResult?.map((song, index) => {
                      return (
                        <tr
                          key={song.id}
                          className="w-full cursor-pointer hover:bg-neutral-500 hover:bg-opacity-70 transition-smooth rounded-md"
                          onClick={() => handlePlaySong(song, "songs")}
                        >
                          <td className="py-3 px-3 w-14">{index + 1}</td>
                          <td className="py-3 pr-5 text-left">{song.name}</td>
                          <td className="py-3 pr-5 text-left">
                            {song.artists[0].name}
                          </td>
                          <td className="py-3 text-left">
                            {song?.album?.name}
                          </td>
                          <td className="text-center">
                            {formatDuration(song.duration_ms)}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ListSongs;
