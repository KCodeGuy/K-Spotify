import axios from "axios";

// Function to fetch Vietnamese songs with preview URLs from Spotify
const getVietnameseSongs = async (access_token, limit = 6) => {
  let allTracksWithPreview = [];

  // Fetch in batches of 50 tracks until we get 6 tracks with preview_url
  const batchSize = 50;
  let offset = 0;

  try {
    while (allTracksWithPreview.length < limit) {
      // Spotify endpoint to search for tracks in Vietnamese
      const searchUrl = "https://api.spotify.com/v1/search";

      // Search for Vietnamese tracks with pagination using offset
      const response = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          q: "language:vi", // Query parameter to filter by Vietnamese language
          type: "track",
          market: "VN", // Filter by Vietnam market
          limit: batchSize, // Fetch in batches of 50
          offset: offset, // Pagination offset
        },
      });

      // Extract track information
      const tracks = response.data.tracks.items;

      // Filter tracks to only include those with a preview_url
      const tracksWithPreview = tracks.filter((track) => track.preview_url);

      // Add filtered tracks to the final list
      allTracksWithPreview = [...allTracksWithPreview, ...tracksWithPreview];

      // Update offset for next batch of tracks
      offset += batchSize;

      // Stop if there are no more tracks to fetch
      if (tracks.length < batchSize) break;
    }

    // Return exactly 6 tracks (or fewer if less than 6 available with preview_url)
    return allTracksWithPreview.slice(0, limit);
  } catch (error) {
    console.error("Error fetching new releases: ", error);
    return error;
  }
};

const getTrackDetails = async (songId, accessToken) => {
  const url = `https://api.spotify.com/v1/tracks/${songId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching track details:", error);
    throw error;
  }
};
export { getVietnameseSongs, getTrackDetails };
