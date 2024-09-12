import axios from "axios";

const getVietnamesePodcasts = async (access_token, limit = 6) => {
  try {
    const searchUrl = "https://api.spotify.com/v1/search";
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: "language:vi",
        type: "show",
        market: "VN",
        limit: limit,
      },
    });
    const podcasts = response.data.shows.items;
    return podcasts;
  } catch (error) {
    console.error("Error fetching Vietnamese podcasts: ", error);
    return error;
  }
};

const getPodcastById = async (access_token, podcastId) => {
  try {
    const podcastUrl = `https://api.spotify.com/v1/shows/${podcastId}`;
    const response = await axios.get(podcastUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching podcast with ID ${podcastId}: `, error);
    return error;
  }
};

export { getVietnamesePodcasts, getPodcastById };
