function Button({ children, handleFilter, filter, activeFilter }) {
	return (
		<button
			className={`px-5 py-2 hover:bg-gray-800 ${activeFilter === filter ? "bg-blue-900" : ""} `}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}

export default Button;
