import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/"
});

export const authEndpoint = "https://accounts.spotify.com/authorize?";

export const redirectUri = "http://localhost:3000/";

export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export default api;
