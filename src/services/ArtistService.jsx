import axios from "axios";
import { getSpotifyToken } from "./SpotifyAuthService"; // Import the token function

// Function to fetch top 6 Vietnamese artists
export const fetchTopVietnameseArtists = async () => {
  try {
    // Get Spotify token
    const token = await getSpotifyToken();

    // Spotify endpoint to search for artists
    const searchUrl = "https://api.spotify.com/v1/search";

    // Search for Vietnamese artists
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "artist:Vietnam", // Query parameter to filter by Vietnamese artists
        type: "artist",
        market: "VN", // Filter by Vietnam market
        limit: 6, // Limit the number of results to 6
      },
    });

    // Extract artist information
    const artists = response.data.artists.items;

    // Return the top 6 artists
    return artists;
  } catch (error) {
    console.error("Error fetching Vietnamese artists: ", error);
  }
};
