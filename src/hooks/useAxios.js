import axios from "axios";

const useAxios = axios.create({
  baseURL: "http://localhost:8080",
});

export default useAxios;
