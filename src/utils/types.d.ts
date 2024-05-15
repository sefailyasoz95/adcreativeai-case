export type InitialState = {
	error: boolean;
	success: boolean;
	message: string;
	characters: Array<CharacterType>;
	loading: boolean;
};
export type CharacterType = {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: Array<string>;
	url: string;
	created: Date;
};