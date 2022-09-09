import {Box, Flex} from "@chakra-ui/react";
import {motion} from "framer-motion";

export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);

export const MotionBoxVariants = {
	start: {
		opacity: 1,
		x: 0,
		y: 0,
	},

	animation: {
		opacity: 1,
		x: 0,
		y: 0,
	},

	end: {
		opacity: 1,
		x: 0,
		y: 0,
	},
};

export const itemsBoxVariants = {
	start: {
		opacity: 1,
		x: 0,
		y: 0,
	},

	animation: {
		opacity: 1,
		x: 0,
		y: 0,
		rotate: 2000,
		scale: 1,
	},

	end: {
		opacity: 1,
		x: 0,
		y: 0,
	},
};
