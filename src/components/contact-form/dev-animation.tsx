import Lottie from "lottie-react";
import aDev from "@animations/dev.json";

import { Box, useBreakpointValue } from "@chakra-ui/react";

export const DevAnimation = () => {
	const widthBreakpoint = useBreakpointValue({
		base: "147px",
		md: "217px",
	});

	return (
		<Box
			pos={{ base: "absolute", md: "static" }}
			opacity={{ base: 0.6, md: 1 }}>
			<Lottie animationData={aDev} style={{ width: widthBreakpoint }} />
		</Box>
	);
};
