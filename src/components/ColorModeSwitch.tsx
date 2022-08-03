import {useColorMode, useColorModeValue} from "@chakra-ui/react";
import {FaMoon, FaSun} from "react-icons/fa";
import {
	MotionBox,
	MotionIcon,
	MotionBoxVariants,
	itemsBoxVariants,
} from "../styles/animation";

export const ColorModeSwitch = (props: any) => {
	const {toggleColorMode, colorMode} = useColorMode();
	const SwitchIcon = useColorModeValue(FaSun, FaMoon);

	console.log(colorMode);

	let blurEffect =
		colorMode === "dark"
			? {
					color: "#4b30c4",
					textShadow: "0 0 0 0 50px #4b30c4",
					transition: {type: "spring", stiffness: 260, damping: 20},
					scale: [1.7, 1],
			  }
			: {
					color: "#ffee10",
					textShadow: "0 0 50px #ffee10",
					transition: {type: "spring", stiffness: 260, damping: 20},
					scale: [1.7, 1],
			  };

	let boxBlurEffect =
		colorMode === "dark"
			? "boxShadow: 0 0 0 0 20px #4b30c4"
			: "boxShadow: 0 0 0 0 20px #ffee10";

	return (
		<>
			<MotionBox
				// initial={{opacity: 1}}
				// animate={{opacity: 1}}
				bgColor={colorMode === "dark" ? "#034d72" : "#e61101"}
				// whileHover={boxBlurEffect}
				w="10"
				h="10">
				<MotionIcon
					// initial={{opacity: 1}}
					// animate={{opacity: 1}}
					colorScheme={colorMode === "dark" ? "pink" : "red"}
					// whileHover={blurEffect}
					pl={colorMode !== "dark" ? "3" : "2"}
					fontSize="xl"
					variant="unstyled"
					onClick={toggleColorMode}
					icon={<SwitchIcon />}
					aria-label={`Switch to ${colorMode} mode`}
				/>
			</MotionBox>
		</>
	);
};
