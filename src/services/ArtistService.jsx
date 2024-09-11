import axios from "axios";

// Function to fetch top 6 Vietnamese artists
export const getTopVietnameseArtists = async (access_token, limit = 6) => {
  try {
    // Spotify endpoint to search for artists
    const searchUrl = "https://api.spotify.com/v1/search";

    // Search for Vietnamese artists
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: "artist:Vietnam", // Query parameter to filter by Vietnamese artists
        type: "artist",
        market: "VN", // Filter by Vietnam market
        limit: limit, // Limit the number of results to 6
      },
    });

    // Extract artist information
    const artists = response.data.artists.items;

    // Return the top 6 artists
    return artists;
  } catch (error) {
    console.error("Error fetching Vietnamese artists: ", error);
    return error;
  }
};

// Function to fetch artist by their ID along with their top tracks
export const getArtistById = async (access_token, artistId) => {
  try {
    // Fetch artist details
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const artistResponse = await axios.get(artistUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return artistResponse.data;
  } catch (error) {
    console.error(`Error fetching artist with ID ${artistId}: `, error);
    return error;
  }
};

export const getTracksByArtistID = async (
  access_token,
  artistId,
  market = "VN"
) => {
  try {
    // Fetch artist's top tracks (songs) in the specified market
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const topTracksResponse = await axios.get(topTracksUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        market: market, // Market to filter top tracks (e.g., 'VN' for Vietnam)
      },
    });
    return topTracksResponse.data.tracks;
  } catch (error) {
    console.error(`Error fetching artist with ID ${artistId}: `, error);
    return error;
  }
};
