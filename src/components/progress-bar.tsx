import { motion, useScroll, useSpring } from "framer-motion";

import { Box, useColorModeValue } from "@chakra-ui/react";

export const Progressbar = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<Box
			as={motion.div}
			pos="fixed"
			top={0}
			left={0}
			right={0}
			height="0.1px"
			bg={useColorModeValue("#4943f5", "#DAA520")}
			transformOrigin="0%"
			style={{ scaleX }}
		/>
	);
};
