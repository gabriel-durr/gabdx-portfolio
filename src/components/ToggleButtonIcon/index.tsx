import styles from "./styles.module.scss";

import {useColorMode} from "@chakra-ui/react";
import {
	MotionBox,
	MotionBoxVariants,
	itemsBoxVariants,
} from "../../styles/animation";

export function ToggleButtonIcon() {
	const {toggleColorMode, colorMode} = useColorMode();

	let boxBlurEffect =
		colorMode === "dark"
			? "boxShadow: 0 0 0 0 20px mon.900"
			: "boxShadow: 0 0 0 0 20px sun.900";

	return (
		<>
			<MotionBox
				initial={{x: 0, y: 20}}
				className={styles.toggleWrapper}
				area-label={colorMode}>
				<input
					type="checkbox"
					className={styles.dn}
					id="dn"
					onClick={toggleColorMode}
				/>

				<label htmlFor="dn" className={styles.toggle}>
					<span className={styles.toggle_handler}>
						<span
							className={`${styles.crater} ${styles.crater_1}`}></span>
						<span
							className={`${styles.crater} ${styles.crater_2}`}></span>
						<span
							className={`${styles.crater} ${styles.crater_3}`}></span>
					</span>
					<span className={`${styles.star} ${styles.star_1}`}></span>
					<span className={`${styles.star} ${styles.star_2}`}></span>
					<span className={`${styles.star} ${styles.star_3}`}></span>
					<span className={`${styles.star} ${styles.star_4}`}></span>
					<span className={`${styles.star} ${styles.star_5}`}></span>
					<span className={`${styles.star} ${styles.star_6}`}></span>
				</label>
			</MotionBox>
		</>
	);
}
