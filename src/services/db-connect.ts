import db from "mongoose";

/**
 * @description Cria conexão com banco de dados MongoDB. A variável "db" de conexão com banco é exportada.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */

const dbConnect = async (): Promise<void> => {
	const uriConnect = process.env.DATABASE_URL;

	if (db.connection.readyState >= 1) return;

	try {
		if (!uriConnect)
			return console.log("É necessário fornecer uma URI para conexão");

		await db.connect(uriConnect);

		return console.log("Mongodb Connected");
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};

export { db, dbConnect };
