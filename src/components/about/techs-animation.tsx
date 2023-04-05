import { techIcons } from "@utils/tech-icons";

import NextLink from "next/link";
import { motion } from "framer-motion";

import { useRef, useState, useEffect } from "react";
import {
	Box,
	Link,
	Flex,
	Image,
	HStack,
	useColorModeValue,
} from "@chakra-ui/react";

export const TechsAnimation = () => {
	const [width, setWidth] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	const bgGradMode = useColorModeValue("#b7a9ff", "#ffeeb4ac");

	useEffect(() => {
		if (ref.current) {
			const halfTheSizeScroll = ref.current?.scrollWidth / 2;
			setWidth(halfTheSizeScroll);
		}
	}, [width]);

	return (
		<HStack
			pos="relative"
			w={{ base: "100%", md: "96%", lg: "100%" }}
			h="5rem"
			overflow="hidden"
			clipPath="polygon(100% 0%, 99.6% 48.3%, 100% 100%, 49% 93%, 0% 100%, 0% 46.3%, 0% 0%)"
			mt="1rem"
			_before={{
				bgGradient: `linear(to right, ${bgGradMode} 0%, rgba(255, 255, 255, 0) 100%)`,
				content: "''",
				h: "100%",
				position: "absolute",
				w: "32px",
				zIndex: 2,
				left: 0,
				top: 0,
			}}
			_after={{
				bgGradient: `linear(to right, ${bgGradMode} 0%, rgba(255, 255, 255, 0) 100%)`,
				content: "''",
				h: "92%",
				position: "absolute",
				w: "32px",
				zIndex: 2,
				right: 0,
				top: 0,
				transform: "rotateZ(180deg)",
			}}>
			<Flex
				as={motion.div}
				ref={ref}
				pos="absolute"
				left="0%"
				animate={{
					x: ["0px", `-${width}px`],
					transition: {
						repeat: Infinity,
						duration: 30,
						ease: "linear",
					},
				}}>
				{techIcons.map(({ key, src, alt, docUrl }) => (
					<Link key={key} as={NextLink} href={docUrl} target="_blank">
						<Box
							as={motion.div}
							borderRadius="full"
							bg="myColors.white"
							mr="2rem"
							boxSize="max-content"
							filter={{ lg: "grayscale(1)" }}
							whileHover={{
								scale: 1.05,
								filter: "grayscale(0)",
							}}>
							<Image
								w={{ base: "32px", md: "47px" }}
								h={{ base: "32px", md: "47px" }}
								pointerEvents="none"
								src={src}
								alt={alt}
							/>
						</Box>
					</Link>
				))}
			</Flex>
		</HStack>
	);
};
