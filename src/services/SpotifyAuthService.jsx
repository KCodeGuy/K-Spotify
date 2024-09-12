import axios from "axios";

// Replace with your actual client_id and client_secret
// https://developer.spotify.com/dashboard/da27b695652749f3b9b6f1ed208f021a/settings
const client_id = "aa064d04dabe43b4bcb2ae5ca1c7fd45";
const client_secret = "a4e0e8a3bf664c05bec2b7b5db3c0454";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const getSpotifyToken = async () => {
  try {
    const result = await axios.post(
      TOKEN_URL,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return result.data.access_token;
  } catch (error) {
    return error;
  }
};
export const searchSpotify = async (txtSearch, accessToken) => {
  const query = encodeURIComponent(`${txtSearch} viet OR vietnamese`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=album,artist,track&market=VN&limit=6`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { albums, artists, tracks } = response.data;

    const filteredAlbums = albums.items.filter((item) =>
      item.name.toLowerCase().includes(txtSearch.toLowerCase())
    );
    const filteredArtists = artists.items.filter((item) =>
      item.name.toLowerCase().includes(txtSearch.toLowerCase())
    );
    const filteredTracks = tracks.items.filter((item) =>
      item.name.toLowerCase().includes(txtSearch.toLowerCase())
    );

    return {
      albums: filteredAlbums.length > 0 ? filteredAlbums : [],
      artists: filteredArtists.length > 0 ? filteredArtists : [],
      tracks: filteredTracks.length > 0 ? filteredTracks : [],
    };
  } catch (error) {
    console.error("Error searching Spotify:", error);
    return error;
  }
};
