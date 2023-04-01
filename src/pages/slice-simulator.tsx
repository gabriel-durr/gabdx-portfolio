import stateSlice from "@root/.slicemachine/libraries-state.json";
import { components } from "../../slices";

import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

const SliceSimulatorPage = () => {
	return (
		<SliceSimulator
			sliceZone={({ slices }) => (
				<SliceZone slices={slices} components={components} />
			)}
			state={stateSlice}
		/>
	);
};

export default SliceSimulatorPage;

// Only include this page in development
export const getStaticProps = async () => {
	if (process.env.NODE_ENV === "production") {
		return { notFound: true };
	} else {
		return { props: {} };
	}
};
