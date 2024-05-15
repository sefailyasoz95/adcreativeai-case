import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultiSelect from "./components/MultiSelect";
function App() {
	return (
		<div className='flex min-w-7xl mt-20 h-screen items-center flex-col gap-10'>
			<span className='font-semibold text-3xl'>Search for Rick and Morty Characters</span>
			<MultiSelect />
			<ToastContainer closeOnClick />
		</div>
	);
}

export default App;
