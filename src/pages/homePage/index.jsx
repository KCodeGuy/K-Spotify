import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ButtonComponent from "../../components/buttonComponent";
import { getVietnameseSongs } from "../../services/SongsService";
import { getTopVietnameseArtists } from "../../services/ArtistService";
import { getAlbums } from "../../services/AlbumService";
import { getSpotifyToken } from "../../services/SpotifyAuthService";

const songsOptions = [
  {
    id: 1,
    name: "allItems",
    showName: "Tất cả",
  },
  {
    id: 2,
    name: "songs",
    showName: "Bài hát",
  },
  {
    id: 3,
    name: "albums",
    showName: "Albums",
  },
  {
    id: 4,
    name: "artists",
    showName: "Nghệ sĩ",
  },
  {
    id: 5,
    name: "podcasts",
    showName: "Podcast",
  },
];

// eslint-disable-next-line react/prop-types
function HomePage({ setCurrentSong, setTypePlaying }) {
  const [albums, setAlbums] = useState([]);
  const [listSongs, setListSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const handlePlaySong = (song, type) => {
    setCurrentSong(song); // Set the currently playing song
    setTypePlaying(type); // Set the currently playing song
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const accessToken = await getSpotifyToken();
        if (accessToken) {
          // Execute API calls in parallel
          const [listSongs, listAlbums, fetchedArtists] = await Promise.all([
            getVietnameseSongs(accessToken),
            getAlbums(accessToken),
            getTopVietnameseArtists(accessToken),
          ]);

          // Update state with fetched data
          setListSongs(listSongs);
          setAlbums(listAlbums);
          setArtists(fetchedArtists);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // Set loading to false after data is fetched or if an error occurs
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-dark-secondary p-4 rounded-lg h-full-screen overflow-y-scroll">
      {loading ? (
        <div className="w-full flex justify-center items-center h-full-screen">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <div className="flex items-center">
            {songsOptions.map((item, index) => {
              return (
                <ButtonComponent
                  onClick={() => {
                    if (item.name !== "allItems") {
                      navigate(`/viewAll/${item.name}`);
                    } else {
                      navigate(`/`);
                    }
                  }}
                  key={index}
                  size="sm"
                  type={item.name === "allItems" ? "primary" : "dark"}
                >
                  {item.showName}
                </ButtonComponent>
              );
            })}
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold uppercase mb-2">
                Bảng xếp hạng nổi bật
              </p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/viewAll/songs`)}
              >
                Xem tất cả
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {listSongs?.map((song, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                >
                  <img
                    className="size-36 rounded-md object-cover object-center"
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
            <div className="flex justify-between items-center mt-5">
              <p className="text-xl font-bold uppercase mb-2">
                Nghệ sĩ nổi bật
              </p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/viewAll/artists`)}
              >
                Xem tất cả
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {artists?.map((artist) => (
                <div
                  key={artist.id}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                  onClick={() => {
                    navigate(`/playlist/artists/${artist.id}`);
                  }}
                >
                  <img
                    className="size-36 rounded-full object-cover object-center"
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
            <div className="flex justify-between items-center mt-5">
              <p className="text-xl font-bold uppercase mb-2">
                Album mới ra mắt
              </p>
              <button
                className="text-sm font-medium text-color hover:underline"
                onClick={() => navigate(`/viewAll/albums`)}
              >
                Xem tất cả
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {albums?.map((album) => (
                <div
                  key={album.id}
                  className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
                  onClick={() => {
                    navigate(`/playlist/albums/${album.id}`);
                  }}
                >
                  <img
                    className="size-36 rounded-md object-cover object-center"
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
      )}
    </div>
  );
}

export default HomePage;
