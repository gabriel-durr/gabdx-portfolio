import { useFeedback } from "@hooks/use-feedbacks";

import axios from "axios";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillLike, AiFillFlag } from "react-icons/ai";
import {
	Text,
	Icon,
	Flex,
	Input,
	Image,
	HStack,
	VStack,
	Heading,
	Textarea,
	Skeleton,
	FormLabel,
	FormControl,
	SkeletonCircle,
	Avatar,
	Divider,
} from "@chakra-ui/react";

const emojis = ["terrible", "bad", "regular", "good", "excellent"];

export const FeedbackUser = () => {
	const {
		query: { uid },
	} = useRouter();

	const { data, isLoading } = useFeedback(uid as string);

	console.log(data);

	return (
		<Flex direction="column" w="100%" justify="center" align="start" gap={12}>
			<VStack w="100%" bg="blackAlpha.100" spacing={4}>
				<Skeleton w="100%" isLoaded={!isLoading}>
					<VStack spacing={16} align="left">
						<Heading size="lg">Deixe seu comentário</Heading>

						<HStack spacing={8}>
							{emojis.map(emoji => (
								<SkeletonCircle key={emoji} isLoaded={isLoading} boxSize={50}>
									<Image
										as={motion.img}
										whileHover={{ scale: 1.2 }}
										cursor="pointer"
										alt="good"
										boxSize={50}
										src={`/emojis/${emoji}.gif`}
									/>
								</SkeletonCircle>
							))}
						</HStack>
					</VStack>

					<VStack spacing={4} w="400px">
						<FormControl>
							<FormLabel>Nome</FormLabel>
							<Input
								border="1px solid #D9D9D9"
								type="text"
								placeholder="Digite seu nome"
								_hover={{ border: "1px solid #D9D9D9" }}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Comentário</FormLabel>
							<Textarea
								placeholder="Comente aqui"
								border="1px solid #D9D9D9"
								_hover={{ border: "1px solid #D9D9D9" }}
							/>
						</FormControl>
					</VStack>
				</Skeleton>
			</VStack>

			<Heading size="lg">Feedbacks (40)</Heading>
			<Divider bg="gray" />

			<VStack w="100%" spacing={20} bg="blackAlpha.100">
				<HStack align="start" justify="space-between" w="90%" h="120px">
					<Avatar size="lg" name="Gabriel" />
					<VStack align="left">
						<Heading size="xs">Gabriel</Heading>
						<Text>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
							aliquam corrupti nihil perferendis dolor, non explicabo aperiam
							sint, accusamus esse inventore, similique repellendus! Dolores
							distinctio vitae explicabo dolor voluptas quia.
						</Text>
					</VStack>

					<Icon as={AiFillFlag} />
				</HStack>

				<Divider bg="gray" h="4px" />

				<HStack w="90%">
					<Avatar size="lg" name="Larissa" />
				</HStack>
			</VStack>
		</Flex>
	);
};
