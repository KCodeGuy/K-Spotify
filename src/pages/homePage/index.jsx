import ButtonComponent from "../../components/buttonComponent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { getVietnameseSongs } from "../../services/SongsService";
import { fetchTopVietnameseArtists } from "../../services/ArtistService";
import { getAlbums } from "../../services/AlbumService";

function HomePage() {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);

  // Fetch token and new releases on component mount
  useEffect(() => {
    const loadNewReleases = async () => {
      try {
        const listSongs = await getVietnameseSongs();
        setSongs(listSongs);

        const listAlbums = await getAlbums();
        setAlbums(listAlbums);

        const fetchedArtists = await fetchTopVietnameseArtists(); // Use the service function
        setArtists(fetchedArtists);
      } catch (error) {
        console.error("Error fetching new releases: ", error);
      }
    };

    loadNewReleases();
  }, []);

  return (
    <div className="bg-dark-secondary p-4 rounded-lg h-full-screen overflow-y-scroll">
      <div className="flex items-center">
        <ButtonComponent size="sm" className="bg-transparent">
          Tất cả
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Albums
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Nghệ sĩ
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Podcast
        </ButtonComponent>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold uppercase mb-2">
            Bảng xếp hạng nổi bật
          </p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {songs.map((song, index) => (
            <div
              key={index}
              className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
            >
              <img
                className="size-36 rounded-md"
                src={song.album.images[0].url} // Use the first image from the album's images array
                alt={song.album.name} // Provide a meaningful alt text
              />
              <p className="text-sm font-bold mt-2 line-clamp-2">{song.name}</p>
              <p className="text-sm text-color line-clamp-2">
                {song.artists.map((artist) => artist.name).join(", ")}
              </p>
              <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayArrowIcon className="text-3xl" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl font-bold uppercase mb-2">Nghệ sĩ nổi bật</p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
            >
              <img
                className="size-36 rounded-full"
                src={artist.images[0]?.url || "https://via.placeholder.com/150"}
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
          <p className="text-xl font-bold uppercase mb-2">Album mới ra mắt</p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {albums.map((album) => (
            <div
              key={album.id}
              className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group"
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
      <Footer />
    </div>
  );
}

export default HomePage;
