import axios from "axios"
const request = axios.create({
  baseURL: "https://www.youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyBVqEpn7vLsFPAGo4gL6-Jbe3EnbmEprIE",
  },
});
export default request