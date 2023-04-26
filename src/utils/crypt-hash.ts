import CryptoJS from "crypto-js";

export const decrypt = (userIp: string) => {
	try {
		const bytes = CryptoJS.AES.decrypt(userIp, "ashdhas");
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		return decryptedData;
	} catch (error) {
		console.error(error);
		return "Hash invalida";
	}
};

export const encrypt = (userIp: string) => {
	const encryptData = CryptoJS.AES.encrypt(
		JSON.stringify(userIp),
		"ashdhas"
	).toString();

	return encryptData as string;
};
