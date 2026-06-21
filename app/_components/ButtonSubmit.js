"use client"
import { useFormStatus } from "react-dom";

function ButtonSubmit({ children }) {
	const { pending } = useFormStatus();
	return (
		<button
			className="bg-yellow-700 px-8 py-4 text-gray-300 font-semibold hover:bg-yellow-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
			disabled={pending}
		>
			{pending ? "Updating..." : children}
		</button>
	);
}

export default ButtonSubmit;
