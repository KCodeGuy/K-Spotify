import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotifyToken } from "../../services/SpotifyAuthService";
import { getAlbums } from "../../services/AlbumService";
import { getVietnameseSongs } from "../../services/SongsService";
import { getTopVietnameseArtists } from "../../services/ArtistService";
import { CircularProgress } from "@mui/material";
import { getVietnamesePodcasts } from "../../services/PodcastService";

// eslint-disable-next-line react/prop-types
export default function ViewAllItems({ setCurrentSong, setTypePlaying }) {
  const { listName } = useParams(); // 'itemType' will capture 'albums' from the URL
  const [listResult, setListResult] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const handlePlaySong = (song, type) => {
    setCurrentSong(song); // Set the currently playing song
    if (type) {
      setTypePlaying(type); // Set the currently playing song
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const accessToken = await getSpotifyToken();
        let listAllResult = [];
        if (accessToken) {
          // Execute API calls in parallel
          if (listName === "albums") {
            listAllResult = await getAlbums(accessToken, 50);
          } else if (listName === "artists") {
            listAllResult = await getTopVietnameseArtists(accessToken, 50);
          } else if (listName === "songs") {
            listAllResult = await getVietnameseSongs(accessToken, 50);
          } else if (listName === "podcasts") {
            listAllResult = await getVietnamesePodcasts(accessToken, 50);
          }
          // Update state with fetched data
          setListResult(listAllResult);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // Set loading to false after data is fetched or if an error occurs
        setLoading(false);
      }
    };
    loadData();
  }, [listName]);
  return (
    <div className="bg-dark-secondary p-4 rounded-lg h-full-screen overflow-y-scroll">
      {loading ? (
        <div className="w-full flex justify-center items-center h-full-screen">
          <CircularProgress color="success" />
        </div>
      ) : listName === "albums" ? (
        <>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold uppercase mb-2">Tất cả albums</p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/`)}
              >
                Trở về
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {listResult.map((album) => (
                <div
                  key={album.id}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                  onClick={() => {
                    navigate(`/playlist/albums/${album.id}`);
                  }}
                >
                  <img
                    className="size-36 rounded-md"
                    src={album.images[0].url}
                    alt={album.name}
                  />
                  <p className="text-sm font-bold mt-2 line-clamp-2">
                    {album.name}
                  </p>
                  <p className="text-sm text-color line-clamp-2">
                    {album.artists[0].name}
                  </p>
                  <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayArrowIcon className="text-3xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : listName === "songs" ? (
        <>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold uppercase mb-2">Tất cả bài hát</p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/`)}
              >
                Trở về
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {listResult.map((song, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                >
                  <img
                    className="size-36 rounded-md"
                    src={song.album.images[0].url} // Use the first image from the album's images array
                    alt={song.album.name} // Provide a meaningful alt text
                  />
                  <p className="text-sm font-bold mt-2 line-clamp-2">
                    {song.name}
                  </p>
                  <p className="text-sm text-color line-clamp-2">
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <button
                    onClick={() => handlePlaySong(song, "songs")} // Pass song object directly
                    className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <PlayArrowIcon className="text-3xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : listName === "artists" ? (
        <>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold uppercase mb-2">Tất cả nghệ sĩ</p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/`)}
              >
                Trở về
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {listResult.map((artist) => (
                <div
                  key={artist.id}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                  onClick={() => {
                    navigate(`/playlist/artists/${artist.id}`);
                  }}
                >
                  <img
                    className="size-36 rounded-full"
                    src={
                      artist.images[0]?.url || "https://via.placeholder.com/150"
                    }
                    alt={artist.name}
                  />
                  <p className="text-sm mt-2 text-center line-clamp-2">
                    {artist.name}
                  </p>
                  <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
                  <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayArrowIcon className="text-3xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : listName === "podcasts" ? (
        <>
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold uppercase mb-2">Tất cả podcast</p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/`)}
              >
                Trở về
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {listResult.map((podcast) => (
                <div
                  key={podcast.id}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                  onClick={() => {
                    navigate(`/playlist/podcasts/${podcast.id}`);
                  }}
                >
                  <img
                    className="size-36 rounded-md"
                    src={podcast.images[0].url}
                    alt={podcast.name}
                  />
                  <p className="text-sm font-bold mt-2 line-clamp-2">
                    {podcast.name}
                  </p>
                  <p className="text-sm text-color line-clamp-2">
                    {podcast.publisher}
                  </p>
                  <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayArrowIcon className="text-3xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
