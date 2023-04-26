import aCvDownload from "./data/cv-download.json";

import Lottie from "lottie-react";

export const CloudDown = () => {
	return (
		<Lottie
			animationData={aCvDownload}
			style={{ width: "80%", bottom: -22, left: "20%", position: "absolute" }}
		/>
	);
};
