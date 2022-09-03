import styles from "./styles.module.scss";

import {useColorMode} from "@chakra-ui/react";
import {MotionBox} from "../../styles/animation";
import {useState} from "react";

export function ToggleButtonIcon() {
	const {toggleColorMode, colorMode} = useColorMode();
	const [buttonAnimation, setButtonAnimation] = useState(false);

	const animations = buttonAnimation
		? {
				opacity: [1, 0.1, 0.2, 0.3, 1],
				x: 0,
				y: [-77, 0],
		  }
		: {
				opacity: [1, 0, 0.2, 1],
				x: 0,
				y: [-80, 0],
		  };

	return (
		<MotionBox
			position="relative"
			left="24%"
			animate={{...animations}}
			onClick={() => setButtonAnimation(!buttonAnimation)}
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
	);
}
