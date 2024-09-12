import axios from "axios";

const getAlbums = async (access_token, limit = 6) => {
  try {
    const newReleasesUrl = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&market=VN`;
    const response = await axios.get(newReleasesUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const albums = response.data.albums.items;
    return albums;
  } catch (error) {
    console.error("Error fetching new albums: ", error);
    return error;
  }
};

const getAlbumById = async (access_token, albumId) => {
  try {
    const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;
    const response = await axios.get(albumUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const album = response.data;
    return album;
  } catch (error) {
    console.error(`Error fetching album with ID ${albumId}: `, error);
    return error;
  }
};

export { getAlbums, getAlbumById };
