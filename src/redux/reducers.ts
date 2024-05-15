import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../utils/types";
import { searchCharacter } from "./actions";
import { HttpStatusCode } from "axios";

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	characters: [],
	loading: false,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {
		clearCharacters: (state) => {
			state.characters = [];
		},
	},
	extraReducers: (builder) => {
		builder
			// *********** Search Character START *********** \\
			.addCase(searchCharacter.pending, (state) => {
				state.loading = true;
				state.message = "";
				state.error = false;
				state.success = false;
				state.characters = [];
			})
			.addCase(searchCharacter.fulfilled, (state, action) => {
				if (action.payload.statusCode === HttpStatusCode.Ok) {
					state.characters = action.payload.data.results;
				} else {
					state.characters = [];
					state.message = "No results for your search!";
					state.error = true;
				}
				state.loading = false;
				// *********** Search Character END *********** \\
			});
	},
});

export const { clearCharacters } = reducer.actions;

export default reducer.reducer;
