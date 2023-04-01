import { ReadMore } from "./read-more";
import { ProjectCard } from "./project-card";

import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

type ProjectsProps = Pick<Content.HomeDocument, "lang" | "data">;

export const Projects = ({ data, lang }: ProjectsProps) => {
	const projectsData = data.project.map(project => ({
		lang,
		title: project.title || "",
		image: prismicH.asImageSrc(project.image) || "",
		techs: project.techstack.map((tech: any) => tech.text) || [],
		deployLink: prismicH.asLink(project.deployLink),
		githubLink: prismicH.asLink(project.githubLink),
	}));

	return (
		<ReadMore lang={lang}>
			{projectsData.map(project => (
				<ProjectCard key={project.title} {...project} />
			))}
		</ReadMore>
	);
};
