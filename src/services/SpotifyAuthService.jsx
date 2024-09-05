import axios from "axios";

// Replace with your actual client_id and client_secret
// https://developer.spotify.com/dashboard/da27b695652749f3b9b6f1ed208f021a/settings
const client_id = "da27b695652749f3b9b6f1ed208f021a";
const client_secret = "7b71a19b88e745f8b71f0ec9fc57b14a";

// Spotify API URL for token generation
const TOKEN_URL = "https://accounts.spotify.com/api/token";

// Get Spotify Access Token
export const getSpotifyToken = async () => {
  const result = await axios.post(TOKEN_URL, "grant_type=client_credentials", {
    headers: {
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return result.data.access_token;
};
