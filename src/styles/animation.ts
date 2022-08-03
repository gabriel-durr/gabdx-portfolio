import {Box, BoxProps, IconButton, IconButtonProps} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {Variants} from "framer-motion";

export const MotionBox = motion<Omit<BoxProps, "transition">>(Box);
export const MotionIcon =
	motion<Omit<IconButtonProps, "transition">>(IconButton);

export const MotionBoxVariants: Variants = {
	hidden: {
		opacity: 1,
		x: 0,
		y: 0,
	},

	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.2,
		},
	},
};

export const itemsBoxVariants: Variants = {
	hidden: {
		opacity: 1,
		x: 0,
		y: 0,
		scale: 1,
	},

	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		rotate: 2000,
		scale: 1,
	},
};
