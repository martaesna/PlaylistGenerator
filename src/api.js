
import axios from 'axios';

const API_URL = 'https://ancient-reaches-96103-ae8ed803e107.herokuapp.com';

export const getClientId = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/client_id`);
      return response.data.clientId;
    } catch (error) {
      console.error('Error fetching client ID:', error);
      throw error;
    }
  };
  
const SPOTIFY_API_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = '36a1301d6d5e427695b9f73ee58d560c';
const CLIENT_SECRET = 'ac208a136d6e43c7bb0ebbca61b703ff';

export const exchangeCodeForToken = async (code) => {
  const redirectUri = 'https://martaesna.github.io/PlaylistGenerator/callback';
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
  };

  try {
    const response = await axios.post(SPOTIFY_API_URL, params, { headers });
    console.log('Response from Spotify:', response.data);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    throw error;
  }
};
  
  export const createPlaylist = async (answers, spotifyToken) => {
    try {
        const response = await axios.post(
          `${API_URL}/api/playlist`,
          { answers, spotifyToken },
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
    
        return response.data.playlist.external_urls.spotify;
      } catch (error) {
        console.error('Error creating playlist:', error.response?.data || error.message);
        throw error;
      }
  };
  
  export const getRecommendations = async (spotifyToken) => {
    try {
      const recommendationsResponse = await axios.get(
        'https://api.spotify.com/v1/recommendations',
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          },
          params: {
            seed_artists: '3jU5LKRsimuyZjA0lSkdPp,3bvfu2KAve4lPHrhEFDZna',
            seed_tracks: '2cO7VT0O6Q8IYeLNrh6oa9',
            limit: 24
          }
        }
      );
      return recommendationsResponse.data.tracks;
    } catch (error) {
      console.error('Error fetching recommendations:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const addTrackToPlaylist = async (playlistId, trackUris, spotifyToken) => {
    try {
      const randomPosition = Math.floor(Math.random() * trackUris.length);
      trackUris.splice(randomPosition, 0, 'spotify:track:2EP6MHyuILtKBJYxsjewms'); // Add obvious recommendation
  
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { message: 'Tracks added to playlist successfully!' };
    } catch (error) {
      console.error('Error adding tracks to playlist:', error.response?.data || error.message);
      throw error;
    }
  };

