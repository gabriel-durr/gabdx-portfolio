import {
	SimpleGrid,
	Container,
	Box,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";
import {RepositoryCard} from "./RepositoryCard ";
import * as prismicH from "@prismicio/helpers";
import {useState} from "react";
import {FaAngleUp, FaAngleDown} from "react-icons/fa";
import {MotionBox} from "../../styles/animation";

const ReadMore = ({readShow, children}) => {
	const items = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<>
			{isReadMore ? items.slice(0, 2) : items}
			<Box
				cursor="pointer"
				fontWeight="bolder"
				fontSize="1.12rem"
				pos="relative"
				_hover={{
					color: useColorModeValue("#ffffff7a", "#000000be"),
					transition: "0.1s ease",
				}}
				left={isReadMore ? "83%" : "-22.9%"}
				bottom={isReadMore ? "-90%" : "-127%"}
				onClick={toggleReadMore}
				className="read-or-hide">
				{isReadMore ? readShow.read : readShow.show}
				<MotionBox
					color={useColorModeValue("#fff", "#000")}
					position="absolute"
					as="span"
					ml="17px"
					whileHover={{
						translateY: [-5, -2, 0],
						transition: {
							duration: 1,
							damping: 300,
						},
					}}
					initial={{
						translateY: [-20, -10, -5],
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}>
					{isReadMore ? (
						<Icon boxSize="7" as={FaAngleDown} />
					) : (
						<Icon boxSize="7" size="md" as={FaAngleUp} />
					)}
				</MotionBox>
			</Box>
		</>
	);
};

export const Projects = ({page}) => {
	const readShow = {
		read: page.read_show[0].text,
		show: page.read_show[1].text,
	};

	const repositoriesList = page.project.map(repo => ({
		title: repo.title,
		cover: prismicH.asImageSrc(repo.image),
		techStack: repo.techstack.map(tech => tech.text),
		url: prismicH.asLink(repo.url),
	}));
	return (
		<Container maxW="7xl" p="5" mx="auto">
			<SimpleGrid columns={[1, 2]} spacing={4} mt={8}>
				<ReadMore readShow={readShow}>
					{repositoriesList.map((repo, index) => (
						<RepositoryCard
							key={index}
							title={repo.title}
							description={repo.description}
							cover={repo.cover}
							techStack={repo.techStack}
							url={repo.url}
						/>
					))}
				</ReadMore>
			</SimpleGrid>
		</Container>
	);
};
