import axios from "axios";

// Function to fetch new releases (albums) from Spotify
const getAlbums = async (access_token, limit = 6) => {
  try {
    // Get Spotify token
    // Spotify endpoint to get new releases (albums), limited to 6 and filtered by Vietnam market
    const newReleasesUrl = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&market=VN`;

    // Fetch newest albums
    const response = await axios.get(newReleasesUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Extract album information
    const albums = response.data.albums.items;

    // Return the albums
    return albums;
  } catch (error) {
    console.error("Error fetching new albums: ", error);
    return error;
  }
};

// Function to fetch an album by its ID from Spotify
const getAlbumById = async (access_token, albumId) => {
  try {
    // Spotify endpoint to get a specific album by ID
    const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;

    // Fetch the album details
    const response = await axios.get(albumUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Extract album information, including tracks
    const album = response.data;

    // Return the album details, including tracks
    return album;
  } catch (error) {
    console.error(`Error fetching album with ID ${albumId}: `, error);
    return error;
  }
};

export { getAlbums, getAlbumById };
