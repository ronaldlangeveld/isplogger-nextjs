import axios from "axios";

const apiURL = () => {
    if (process.env.NODE_ENV === "development") {
        return `http://127.0.0.1:8000/api/`
      } else {
          //Future, replace with server details
        return `http://127.0.0.1:8000/api/`
      }
} 

  const api = axios.create({
    baseURL: apiURL(),
    withCredentials: true,
    crossDomain: true,
  });



export default api;