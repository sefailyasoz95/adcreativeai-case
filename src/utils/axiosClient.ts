import axios from "axios";

export const axiosClient = axios.create({
	baseURL: "https://rickandmortyapi.com/api",
});
