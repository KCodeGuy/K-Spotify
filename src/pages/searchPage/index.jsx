import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import {
  getSpotifyToken,
  searchSpotify,
} from "../../services/SpotifyAuthService";
import ButtonComponent from "../../components/buttonComponent";

// eslint-disable-next-line react/prop-types
function SearchPage({ setCurrentSong, setTypePlaying }) {
  const [albums, setAlbums] = useState([]);
  const [listSongs, setListSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { txtSearch } = useParams();

  const handlePlaySong = (song, type) => {
    setCurrentSong(song);
    setTypePlaying(type);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const accessToken = await getSpotifyToken();
        if (accessToken) {
          const { albums, artists, tracks } = await searchSpotify(
            txtSearch,
            accessToken
          );

          setAlbums(albums);
          setListSongs(tracks);
          setArtists(artists);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [txtSearch]);

  return (
    <div className="bg-dark-secondary p-4 rounded-lg h-full-screen-lg overflow-y-scroll scrollable-content max-[1023px]:pb-36">
      {loading ? (
        <div className="w-full flex justify-center items-center h-full-screen">
          <CircularProgress color="success" />
        </div>
      ) : listSongs?.length > 0 || artists.length > 0 || albums.length > 0 ? (
        <>
          <div className="mt-5">
            {listSongs?.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <p className="max-[768px]:text-sm md:text-md lg:text-xl font-bold uppercase">
                    Bài hát liên quan
                  </p>
                  <ButtonComponent size="md" onClick={() => navigate("/")}>
                    <ArrowBackIcon
                      className="mb-0.5"
                      sx={{ fontSize: "16px" }}
                      type="light"
                    />{" "}
                    Trở về
                  </ButtonComponent>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-3">
                  {listSongs.map((song, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-full relative group"
                    >
                      <img
                        className="size-36 w-full rounded-md object-cover object-center"
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
              </>
            ) : (
              ""
            )}
            {artists?.length > 0 ? (
              <>
                <div className="flex justify-between items-center mt-5">
                  <p className="max-[768px]:text-sm md:text-md lg:text-xl font-bold uppercase">
                    Nghệ sĩ liên quan
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-3">
                  {artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-full relative group"
                      onClick={() => {
                        navigate(`/playlist/artists/${artist.id}`);
                      }}
                    >
                      <img
                        className="size-36 rounded-full w-full object-cover object-center"
                        src={
                          artist.images[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        alt={artist.name}
                      />
                      <p className="text-sm mt-2 text-center line-clamp-2">
                        {artist.name}
                      </p>
                      <p className="text-sm mt-2 text-center text-color">
                        Nghệ sĩ
                      </p>
                      <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayArrowIcon className="text-3xl" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
            {albums?.length > 0 ? (
              <>
                <div className="flex justify-between items-center mt-5">
                  <p className="max-[768px]:text-sm md:text-md lg:text-xl font-bold uppercase">
                    Album liên quan
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-3">
                  {albums.map((album) => (
                    <div
                      key={album.id}
                      className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-full relative group"
                      onClick={() => {
                        navigate(`/playlist/albums/${album.id}`);
                      }}
                    >
                      <img
                        className="size-36 rounded-md w-full object-cover object-center"
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
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="text-center">Không tìm thấy kết quả `{txtSearch}`</div>
      )}
    </div>
  );
}

export default SearchPage;
