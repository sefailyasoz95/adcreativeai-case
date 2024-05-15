import { useMemo } from "react";
import { CharacterType } from "../utils/types";

type Props = {
	onSelect: (char: CharacterType) => void;
	character: CharacterType;
	isSelected: boolean;
	searchValue: string;
};

const SelectableItem = ({ character, onSelect, isSelected, searchValue }: Props) => {
	const name = useMemo(() => {
		const index = character.name.toLowerCase().search(searchValue);
		const firstPart = `${character.name.toLowerCase().slice(0, index)}`;
		const secondPart = `${character.name.toLowerCase().slice(index, index + searchValue.length)}`;
		const thirdPart = `${character.name.toLowerCase().slice(index + searchValue.length)}`;
		return (
			<>
				{firstPart}
				<b>{secondPart}</b>
				{thirdPart}
			</>
		);
	}, [searchValue]);
	return (
		<button
			className='w-full px-2 border-b py-1 hover:bg-slate-200 transition-colors duration-300 ease-in-out'
			onClick={() => onSelect(character)}>
			<div className='flex flex-row items-center gap-3'>
				<input type='checkbox' checked={isSelected} onChange={() => onSelect(character)} />
				<img src={character.image} className='w-10 h-10 rounded-lg' />
				<div className='flex flex-col items-start'>
					<span className='text-slate-700 font-medium capitalize'>{name}</span>
					<span className='text-slate-500'>{character.episode.length} Episodes</span>
				</div>
			</div>
		</button>
	);
};

export default SelectableItem;
