import axios from "axios";
import { getSpotifyToken } from "./SpotifyAuthService"; // Import the token function

// Function to fetch new releases (albums) from Spotify
const getAlbums = async () => {
  try {
    // Get Spotify token
    const token = await getSpotifyToken();

    // Spotify endpoint to get new releases (albums), limited to 6 and filtered by Vietnam market
    const newReleasesUrl =
      "https://api.spotify.com/v1/browse/new-releases?limit=6&market=VN";

    // Fetch newest albums
    const response = await axios.get(newReleasesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract album information
    const albums = response.data.albums.items;

    // Return the albums
    return albums;
  } catch (error) {
    console.error("Error fetching new albums: ", error);
  }
};

export { getAlbums };
