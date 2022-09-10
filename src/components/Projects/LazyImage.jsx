import {Image} from "@chakra-ui/react";

export const LazyImage = props => {
	const {src, width, height, size, layout, rounded} = props;

	return (
		<Image
			src={src}
			objectFit="cover"
			alt="cover image"
			width={width}
			height={height}
			size={size}
			layout={layout}
			rounded={rounded}
		/>
	);
};
