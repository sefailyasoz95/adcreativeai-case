import { createRef, useEffect, useState } from "react";
import { CharacterType } from "../utils/types";
import SelectedName from "./SelectedName";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { searchCharacter } from "../redux/actions";
import { clearCharacters } from "../redux/reducers";
import Loading from "../assets/icons/loading";
import Chevron from "../assets/icons/chevron";
import SelectableItem from "./SelectableItem";
import { toast } from "react-toastify";

const debounce = 1000;

type Props = {};

const MultiSelect = ({}: Props) => {
	const [searchValue, setSearchValue] = useState("");
	const inputRef = createRef<HTMLInputElement>();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [selectedCharacters, setSelectedCharacters] = useState<Array<CharacterType>>([]);
	const { characters, loading, message } = useAppSelector((state) => state.global);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (searchValue) {
			const timeout = setTimeout(() => {
				dispatch(searchCharacter(searchValue));
			}, debounce);
			return () => {
				clearTimeout(timeout);
			};
		} else {
			dispatch(clearCharacters());
		}
	}, [searchValue]);
	useEffect(() => {
		if (message) {
			toast.error(message);
		}
	}, [message]);

	useEffect(() => {
		if (characters.length) {
			setIsDropdownVisible(true);
		} else {
			setIsDropdownVisible(false);
		}
	}, [characters]);

	const focusInput = () => {
		inputRef.current?.focus();
	};
	const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
	const handleDelete = (char: CharacterType) => {
		let filtered = selectedCharacters.filter((item) => item.id !== char.id);
		setSelectedCharacters(filtered);
	};

	return (
		<div className='relative'>
			<div
				className='flex flex-row border-2 rounded-xl border-slate-400 relative px-1 py-2 min-w-96 gap-2'
				onClick={focusInput}>
				<input
					type='text'
					onChange={(e) => setSearchValue(e.currentTarget.value)}
					className='ring-0 outline-none'
					ref={inputRef}
					size={searchValue.length > 0 ? searchValue.length : 1}
				/>
				{selectedCharacters.length < 3 ? (
					selectedCharacters.map((item, index) => (
						<SelectedName char={item} key={index} searchValue={searchValue} onDelete={handleDelete} />
					))
				) : (
					<div className='flex flex-row items-center'>
						<SelectedName
							char={selectedCharacters[selectedCharacters.length - 1]}
							key={"index"}
							searchValue={searchValue}
							onDelete={handleDelete}
						/>
						<span className='text-slate-700 font-semibold'>&nbsp; {` & ${selectedCharacters.length - 1} more`}</span>
					</div>
				)}
				{loading && (
					<div className='absolute -right-7 top-2.5 animate-spin'>
						<Loading />
					</div>
				)}
				<div
					onClick={toggleDropdown}
					className={`absolute right-3 z-40 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
						isDropdownVisible ? "rotate-180" : ""
					}`}>
					<Chevron />
				</div>
			</div>
			<div
				className={`absolute border-2 border-slate-400 rounded-xl min-h-24 max-h-80 overflow-scroll w-full transition-all duration-300 ease-in-out ${
					isDropdownVisible ? "translate-y-2 opacity-100 z-20" : "-translate-y-8 opacity-0 -z-20"
				} `}>
				{characters.map((char, index) => (
					<SelectableItem
						character={char}
						searchValue={searchValue}
						onSelect={() => {
							if (selectedCharacters.findIndex((item) => item.id === char.id) > -1) {
								handleDelete(char);
							} else {
								setSelectedCharacters([...selectedCharacters, char]);
							}
						}}
						key={index}
						isSelected={selectedCharacters.findIndex((item) => item.id === char.id) > -1}
					/>
				))}
			</div>
		</div>
	);
};

export default MultiSelect;
