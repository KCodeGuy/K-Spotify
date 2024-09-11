import axios from "axios";

// Function to fetch Vietnamese podcasts from Spotify
const getVietnamesePodcasts = async (access_token, limit = 6) => {
  try {
    // Spotify endpoint to search for podcasts in Vietnamese
    const searchUrl = "https://api.spotify.com/v1/search";

    // Search for Vietnamese podcasts
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: "language:vi", // Query parameter to filter by Vietnamese language
        type: "show", // Search for podcasts (shows)
        market: "VN", // Filter by Vietnam market
        limit: limit, // Limit the number of results
      },
    });

    // Extract podcast information
    const podcasts = response.data.shows.items;

    // Return the top podcasts
    return podcasts;
  } catch (error) {
    console.error("Error fetching Vietnamese podcasts: ", error);
    return error;
  }
};

// Function to fetch podcast (show) by its ID
const getPodcastById = async (access_token, podcastId) => {
  try {
    // Spotify endpoint to get a specific podcast by ID
    const podcastUrl = `https://api.spotify.com/v1/shows/${podcastId}`;

    // Fetch podcast details
    const response = await axios.get(podcastUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Return the podcast's details
    return response.data;
  } catch (error) {
    console.error(`Error fetching podcast with ID ${podcastId}: `, error);
    return error;
  }
};

export { getVietnamesePodcasts, getPodcastById };
