import { motion } from "framer-motion";

import { Box, Text, useToken, useColorMode } from "@chakra-ui/react";

export function SwitchColorMode() {
	const { toggleColorMode, colorMode } = useColorMode();
	const [sunColor, moonColor, sunShadow, moonShadow] = useToken("colors", [
		"gbdx.sun",
		"gbdx.moon",
		"gbdx.sunShadow",
		"gbdx.moonShadow",
	]);

	let isMoon = colorMode === "dark";

	return (
		<motion.button
			key={isMoon ? "Moon" : "Sun"}
			initial={{ x: 0, y: -100, opacity: 0 }}
			animate={{ x: 0, y: 0, opacity: 1 }}
			transition={{ duration: 1 }}
			style={{
				overflow: "hidden",
			}}
			aria-label={colorMode}
			role="button"
			onClick={toggleColorMode}>
			<Box
				cursor="pointer"
				display="inline-block"
				border="1px solid #ffc71042"
				position="relative"
				w={{ base: "32px", sm: "38px", md: "42px" }}
				h={{ base: "28px", sm: "28px", md: "32px" }}
				bg={isMoon ? "gbdx.moonSky" : "gbdx.sunsetSky"}
				borderRadius="7px"
				transition="background 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)">
				<Text
					as="span"
					display="inline-block"
					position="relative"
					zIndex={1}
					top={isMoon ? "-1px" : "4px"}
					boxSize={{ base: "18px", md: "24px" }}
					borderRadius="50px"
					transition="all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)"
					bg={isMoon ? "transparent" : sunColor}
					transform={
						isMoon ? "translate3d(10px, 0, 0) rotate(28deg)" : "rotate(-45deg)"
					}
					boxShadow={
						isMoon
							? `-8px 10px 0px 0px ${moonColor}`
							: `0px 0px 4px ${sunColor}`
					}
					_hover={{
						transform: isMoon ? "scale3d(-1, -1, -1)" : "scale(0.77)",
						transition: isMoon ? "all 50s ease-out" : "all 1.3s ease-out",
						boxShadow: isMoon
							? `0 0 70px ${moonShadow}`
							: `1px 0px 22px ${sunColor}`,
						textShadow: isMoon
							? `0 0 70px ${moonShadow}`
							: `0 0 80px ${sunShadow}`,
					}}
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 4,
							repeat: Infinity,
							ease: "circOut",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					top="7px"
					left="35px"
					zIndex={0}
					w={isMoon ? "2px" : "30px"}
					h="2px"
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 7,
							repeat: Infinity,
							ease: "linear",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					top="14px"
					left="27px"
					zIndex={1}
					transform={isMoon ? "translate3d(-5px, 0, 0)" : undefined}
					w={isMoon ? "4px" : "30px"}
					h={isMoon ? "4px" : "3px"}
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 6,
							repeat: Infinity,
							ease: "circOut",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					top="26px"
					left="34px"
					zIndex={0}
					transform={isMoon ? "translate3d(-1px, 0, 0)" : undefined}
					w={isMoon ? "3px" : "30px"}
					h={isMoon ? "3px" : "5px"}
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 4,
							repeat: Infinity,
							ease: "backIn",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					opacity={isMoon ? 1 : 0}
					top="20px"
					left="4px"
					zIndex={0}
					boxSize="2px"
					transform={isMoon ? "translate3d(0, 0, 0)" : "translate3d(3px, 0, 0)"}
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 8,
							repeat: Infinity,
							ease: "backInOut",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					opacity={isMoon ? 1 : 0}
					top="1px"
					left="12px"
					zIndex={0}
					boxSize="3px"
					transform={isMoon ? "translate3d(0, 0, 0)" : "translate3d(3px, 0, 0)"}
				/>
				<Text
					as={motion.span}
					animate={{
						opacity: 0,
						transition: {
							duration: 9,
							repeat: Infinity,
							ease: "easeOut",
						},
					}}
					position="absolute"
					bg="gbdx.whiteStar"
					transition=" all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)"
					borderRadius="50%"
					opacity={isMoon ? 1 : 0}
					top="28px"
					left="22px"
					zIndex={0}
					boxSize="2px"
					transform={isMoon ? "translate3d(0, 0, 0)" : "translate3d(3px, 0, 0)"}
				/>
			</Box>
		</motion.button>
	);
}
