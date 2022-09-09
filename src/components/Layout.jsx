import {Header} from "./Header";
import {Flex} from "@chakra-ui/react";
// import {Footer} from "./Footer";

export const Layout = ({menu, footerData, children}) => {
	return (
		<>
			<Header
				altLangs={menu.alternate_languages}
				menu={menu.data}
				// settings={settings}
			/>

			<Flex
				bg="transparent"
				minH="100vh"
				minW="100vw"
				pt="9.7rem"
				justify="center">
				{children}
			</Flex>

			{/* <Footer footerData={footerData} /> */}
		</>
	);
};
