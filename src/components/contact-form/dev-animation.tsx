import Lottie from "lottie-react";
import aDev from "@animations/dev.json";

import { Box } from "@chakra-ui/react";

export const DevAnimation = () => {
	return (
		<Box boxSize="40%">
			<Lottie animationData={aDev} style={{ width: "217px" }} />
		</Box>
	);
};
