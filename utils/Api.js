import axios from "axios";

const apiURL = () => {
    if (process.env.NODE_ENV === "development") {
      console.log(process.env.NODE_ENV)
        return `http://127.0.0.1:8000/api/`
        // return `https://api.isplogger.com/api/`
      } else {
          //Future, replace with server details
        return `https://api.isplogger.com/api/`
      }
};

  const api = axios.create({
    baseURL: apiURL(),
    withCredentials: true,
    crossDomain: true,
  });



export default api;