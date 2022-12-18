import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
	return (
		<ThreeDots
			height="15"
			width="50"
			radius="6"
			color="#fff"
			ariaLabel="Loading"
			visible={true}
		/>
	);
}
