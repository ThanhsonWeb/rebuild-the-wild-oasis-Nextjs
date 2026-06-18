function Button({ children, handleFilter, filter }) {
	return (
		<button
			className="px-5 py-2 hover:bg-gray-800"
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}

export default Button;
