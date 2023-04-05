import CryptoJS from "crypto-js";

export const decrypt = (userIp: string) => {
	let bytes = CryptoJS.AES.decrypt(userIp, "ashdhas");

	let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

	return decryptedData as string;
};

export const encrypt = (userIp: string) => {
	const encryptData = CryptoJS.AES.encrypt(
		JSON.stringify(userIp),
		"ashdhas"
	).toString();

	return encryptData as string;
};
