import axios from "axios";

const getVietnameseSongs = async (access_token, limit = 6) => {
  let allTracksWithPreview = [];
  const batchSize = 50;
  let offset = 0;

  try {
    while (allTracksWithPreview.length < limit) {
      const searchUrl = "https://api.spotify.com/v1/search";

      const response = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          q: "language:vi",
          type: "track",
          market: "VN",
          limit: batchSize,
          offset: offset,
        },
      });

      const tracks = response.data.tracks.items;
      const tracksWithPreview = tracks.filter((track) => track.preview_url);
      allTracksWithPreview = [...allTracksWithPreview, ...tracksWithPreview];
      offset += batchSize;
      if (tracks.length < batchSize) break;
    }

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
