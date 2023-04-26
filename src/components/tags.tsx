import { motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import { Tag, Text, Flex, HStack, TagProps } from "@chakra-ui/react";

type TagsProps = TagProps & {
	tags: string[];
	containerWidth?: string | Record<string, string>;
};

export const Tags = ({
	tags,
	containerWidth = "200px",
	...props
}: TagsProps) => {
	const [width, setWidth] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		const differenceWidth = ref.current?.scrollWidth - ref.current?.offsetWidth;
		setWidth(differenceWidth);
	}, []);

	return (
		<Flex
			as={motion.div}
			ref={ref}
			overflow="hidden"
			cursor="grab"
			align="center"
			w={containerWidth}>
			<HStack
				as={motion.div}
				spacing={2}
				drag="x"
				whileTap={{ cursor: "grabbing" }}
				dragConstraints={{ right: 0, left: -width }}>
				{tags.map(tag => {
					return (
						<Tag
							key={tag}
							userSelect="none"
							whiteSpace="nowrap"
							minW="min"
							size="sm"
							px={2}
							{...props}>
							<Text fontFamily="number" fontSize={13}>
								{tag}
							</Text>
						</Tag>
					);
				})}
			</HStack>
		</Flex>
	);
};
