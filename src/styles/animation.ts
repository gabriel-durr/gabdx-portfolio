import {Box, BoxProps} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {Variants} from "framer-motion";

export const MotionBox = motion<BoxProps>(Box);

export const MotionBoxVariants: Variants = {
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

export const itemsBoxVariants: Variants = {
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
