import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchCharacterService } from "./services";

export const searchCharacter = createAsyncThunk(
	"services/SearchCharacterService",
	async (searchValue: string, thunkAPI) => {
		return await SearchCharacterService(searchValue);
	}
);
