import axios from "axios";

export const getTopVietnameseArtists = async (access_token, limit = 6) => {
  try {
    const searchUrl = "https://api.spotify.com/v1/search";
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: "artist:Vietnam",
        type: "artist",
        market: "VN",
        limit: limit,
      },
    });
    const artists = response.data.artists.items;
    return artists;
  } catch (error) {
    console.error("Error fetching Vietnamese artists: ", error);
    return error;
  }
};

export const getArtistById = async (access_token, artistId) => {
  try {
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
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const topTracksResponse = await axios.get(topTracksUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        market: market,
      },
    });
    return topTracksResponse.data.tracks;
  } catch (error) {
    console.error(`Error fetching artist with ID ${artistId}: `, error);
    return error;
  }
};
