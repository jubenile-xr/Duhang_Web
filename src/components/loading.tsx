export const Loading = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white opacity-75 z-50">
			<div className="flex items-center justify-center text-2xl">
				<span
					className="mr-2 animate-bounce "
					style={{ animationDelay: "0ms" }}
				>
					🐼
				</span>
				<span
					className="mr-2 animate-bounce "
					style={{ animationDelay: "200ms" }}
				>
					🐰
				</span>
				<span
					className="mr-2 animate-bounce "
					style={{ animationDelay: "400ms" }}
				>
					🐦️
				</span>
				<span className="animate-bounce " style={{ animationDelay: "600ms" }}>
					🐭
				</span>
			</div>
		</div>
	);
};
