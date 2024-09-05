import axios from "axios";
import { getSpotifyToken } from "./SpotifyAuthService"; // Import the token function

// Function to fetch new releases from Spotify
const getVietnameseSongs = async () => {
  try {
    // Get Spotify token
    const token = await getSpotifyToken();

    // Spotify endpoint to search for tracks in Vietnamese
    const searchUrl = "https://api.spotify.com/v1/search";

    // Search for Vietnamese tracks
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "language:vi", // Query parameter to filter by Vietnamese language
        type: "track",
        market: "VN", // Filter by Vietnam market
        limit: 6, // Limit the number of results to 6
        sort: "date", // You may need to sort tracks manually as Spotify API doesn't support sorting by date
      },
    });

    // Extract track information
    const tracks = response.data.tracks.items;

    // Return the top 6 songs
    return tracks;
  } catch (error) {
    console.error("Error fetching new releases: ", error);
  }
};

export { getVietnameseSongs };
