import axios from "axios";

const apiURL = () => {
    if (process.env.NODE_ENV === "development") {
      console.log(process.env.NODE_ENV)
        return `https://isplogger.herokuapp.com/api/`
      } else {
          //Future, replace with server details
        return `https://isplogger.herokuapp.com/api/`
      }
} 

  const api = axios.create({
    baseURL: apiURL(),
    withCredentials: true,
    crossDomain: true,
  });



export default api;