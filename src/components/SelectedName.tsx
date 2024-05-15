import React from "react";
import Delete from "../assets/icons/delete";
import { CharacterType } from "../utils/types";

type Props = {
	char: CharacterType;
	searchValue: string;
	onDelete: (char: CharacterType) => void;
};

const SelectedName = ({ char, searchValue, onDelete }: Props) => {
	return (
		<div className='bg-slate-200 text-slate-700 font-medium rounded-xl gap-2 px-2 py-1 flex flex-row items-center justify-between'>
			{char.name}
			<span className='rounded-md p-0.5 bg-slate-400 cursor-pointer' onClick={() => onDelete(char)}>
				<Delete />
			</span>
		</div>
	);
};

export default SelectedName;
