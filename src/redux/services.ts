import { axiosClient } from "../utils/axiosClient";

export const SearchCharacterService = async (searchValue: string) => {
	try {
		const response = await axiosClient.get(`/character?name=${searchValue}`);
		return {
			data: response.data,
			statusCode: response.status,
			message: "success",
		};
	} catch (error: any) {
		return {
			data: undefined,
			statusCode: error.response.status,
			message: error.response.data.error,
		};
	}
};
