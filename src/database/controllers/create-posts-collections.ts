import FeedbackModel, { FeedbackUser } from "@database/model/feedback-schema";

import { Mongoose } from "mongoose";
import { Client } from "@prismicio/client";

type CreatePostsProps = {
	db: Mongoose;
	prismicClient: Client;
};

/**
 * Cria ou Remove collections no Mongodb com base nos documentos do tipo "post" do Prismic. As collections são criadas para serem utilizadas na API feedbacks referente ao Post em questão.
 *
 * @typedef {Object} CreatePostsProps
 * @property {Mongoose} db  variável de conexão, para encerramento da conexão com Mongodb.
 * @property {Client} prismicClient  Client prismic para requests dos documentos.
 *
 * @function
 * @param {CreatePostsProps} props Objeto contendo as propriedades db e PrismicClient, necessárias para criar os posts.
 * @returns {Promise<void>}
 *
 */

export const createPostsCollections = async ({
	db,
	prismicClient,
}: CreatePostsProps): Promise<void> => {
	try {
		const posts = await prismicClient.getAllByType("post");

		const uidList = posts.map(post => post.uid);

		const deleteDifferentPost = await FeedbackModel.deleteMany({
			postId: { $nin: uidList },
		});

		console.warn(
			`Deleted ${deleteDifferentPost.deletedCount} documents from the feedback collection.`
		);

		await Promise.all(
			uidList.map(async collectionName => {
				const collectionExists = await FeedbackModel.findOne({
					postId: collectionName,
				});

				if (collectionExists) {
					console.warn(`Collection for post ${collectionName} already exists`);
					return;
				}

				const feedbackList: FeedbackUser[] = [];
				await FeedbackModel.create({ postId: collectionName, feedbackList });
			})
		);
	} catch (err) {
		throw err;
	} finally {
		await db.disconnect();
	}
};
