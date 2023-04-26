/**
 * @swagger
 * tags:
 *   - name: All Feedbacks
 *     description: API para gerenciar todos feedbacks.
 *   - name: Feedbacks
 *     description: API para gerenciar feedbacks.
 *   - name: Likes
 *     description: API para gerenciar likes em feedbacks.
 *   - name: Dislikes
 *     description: API para gerenciar dislikes em feedbacks.
 *   - name: Reports
 *     description: API para gerenciar reports em feedbacks.
 */

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Retorna todos os comentários de um post.
 *     tags: [All Feedbacks]
 *     description: Objeto que contém todos `comentários` de um post, se a localização está `banida` ou não para criar ou visualizar comentários, o `total` de comentários que a     página possui, o total de `avaliações` e o comentário atual (likes e dislikes, etc).
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post.
 *       - in: header
 *         name: Authorization
 *         required: false
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *     responses:
 *       200:
 *         description: Lista de feedbacks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isBanned:
 *                   type: boolean
 *                   description: Indica se o IP do usuário está banido.
 *                 feedbackList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feedbackLevel:
 *                         type: string
 *                         description: Nível de feedback ("excellent", "good", "regular", "bad", "terrible").
 *                       likes:
 *                         type: object
 *                         properties:
 *                           isLike:
 *                             type: boolean
 *                             description: Indica se o usuário deu like.
 *                           likeQdt:
 *                             type: integer
 *                             description: Quantidade de likes.
 *                       dislikes:
 *                         type: object
 *                         properties:
 *                           isDislike:
 *                             type: boolean
 *                             description: Indica se o usuário deu dislike.
 *                           dislikeQdt:
 *                             type: integer
 *                             description: Quantidade de dislikes.
 *                       feedbackText:
 *                         type: string
 *                         description: Texto do feedback.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação do feedback.
 *                 totalFeedbacks:
 *                   type: integer
 *                   description: Quantidade total de feedbacks do post.
 *                 feedbackLevelQdt:
 *                   type: object
 *                   properties:
 *                     excellent:
 *                       type: integer
 *                       description: Quantidade de feedbacks excelentes.
 *                     good:
 *                       type: integer
 *                       description: Quantidade de feedbacks bons.
 *                     regular:
 *                       type: integer
 *                       description: Quantidade de feedbacks regulares.
 *                     bad:
 *                       type: integer
 *                       description: Quantidade de feedbacks ruins.
 *                     terrible:
 *                       type: integer
 *                       description: Quantidade de feedbacks terríveis.
 *       404:
 *         description: PostId não encontrado.
 *       422:
 *         description: Requisição inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}:
 *   get:
 *     summary: Retorna o comentário atual do usuário para um determinado post
 *     tags: [Feedbacks]
 *     description: Conseguimos visualizar algumas propriedades do current feedback de um post específico pelo `postId` e `feedbackId` salvo nos cookies.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *     responses:
 *       '200':
 *         description: Retorna alguns dados através do `feedbackId`, caso exista algum comentário em um dos `postId`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentFeedback:
 *                   type: object
 *                   properties:
 *                     feedbackId:
 *                       type: string
 *                     name:
 *                       type: string
 *       '404':
 *         description: O feedback não existe na lista em nenhum post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/feedbacks/{postId}:
 *   post:
 *     summary: Cria um novo comentário para um post específico
 *     tags: [Feedbacks]
 *     description: Cria um feedback em um post específico pelo `postId`.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackLevel:
 *                 type: string
 *               name:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Feedback criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Algum campo obrigatório está faltando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 *
 * /api/feedbacks/{postId}:
 *   put:
 *     summary: Atualiza um comentário de um post específico
 *     tags: [Feedbacks]
 *     description: Através do `postId`  do `feedbackId` salvo nos cookies, é possível atualizar o comentário existente em algum dos posts.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post.
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *       - in: body
 *         name: body
 *         required: true
 *         description: Fields to update the feedback with.
 *         schema:
 *           type: object
 *           properties:
 *             feedbackLevel:
 *               type: number
 *             name:
 *               type: string
 *             comment:
 *               type: string
 *           example:
 *             feedbackLevel: 5
 *             name: John Doe
 *             comment: This is a test comment.
 *     responses:
 *       200:
 *         description: Feedback updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Feedback updated successfully.
 *       400:
 *         description: Invalid request body or missing required data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request body or missing required data.
 *       401:
 *         description: Unauthorized. Invalid or missing Bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized. Invalid or missing Bearer token.
 *       404:
 *         description: Post collection or feedback not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post collection or feedback not found.
 *
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/delete:
 *   delete:
 *     summary: Deleta o comentário de um post específico
 *     tags: [Feedbacks]
 *     description: Deleta o comentário de um post específico pelo `postId` e deleta o `feedbackId` salvo nos cookies.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: O id do post ao qual o feedback pertence.
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *     responses:
 *       200:
 *         description: Feedback excluído com sucesso.
 *       404:
 *         description: O post ou feedback não foram encontrados.
 *       422:
 *         description: Dados obrigatórios faltando.
 *       500:
 *         description: Erro ao excluir o feedback.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/likes:
 *   post:
 *     summary: Adiciona um gostei a um comemtário.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: O ID do post.
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *       - in: body
 *         name: feedbackTo
 *         description: O ID do feedback que receberá o like.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             feedbackTo:
 *               type: string
 *               description: O ID do feedback.
 *     responses:
 *       201:
 *         description: Like adicionado com sucesso.
 *       404:
 *         description: Post ou feedback não encontrado.
 *       422:
 *         description: Dados requeridos ausentes ou like já existe.
 *       500:
 *         description: Erro ao salvar o like.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/likes:
 *   delete:
 *     summary: Remove um gostei de um comentário
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         description: O ID do post.
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *       - in: body
 *         name: feedbackTo
 *         description: O ID do feedback que terá o like removido.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             feedbackTo:
 *               type: string
 *               description: O ID do feedback.
 *     responses:
 *       204:
 *         description: Like removido com sucesso.
 *       404:
 *         description: Post ou feedback não encontrado.
 *       422:
 *         description: Dados requeridos ausentes ou like não existe.
 *       500:
 *         description: Erro ao remover o like.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/dislike:
 *   post:
 *     summary: Adiciona um não gostei a um comentário.
 *     tags: [Dislikes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: O ID do post.
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *       - in: body
 *         name: feedbackTo
 *         description: O ID do feedback que receberá o dislike.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             feedbackTo:
 *               type: string
 *               description: O ID do feedback.
 *     responses:
 *       201:
 *         description: Dislike adicionado com sucesso.
 *       404:
 *         description: Post ou feedback não encontrado.
 *       422:
 *         description: Dados requeridos ausentes ou dislike já existe.
 *       500:
 *         description: Erro ao salvar o dislike.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/dislike:
 *   delete:
 *     summary: Remove um não gostei de um comentário.
 *     tags: [Dislikes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: O ID do post.
 *         schema:
 *           type: string
 *       - in: query
 *         name: feedbackTo
 *         description: O ID do feedback que terá o dislike removido.
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *     responses:
 *       204:
 *         description: Dislike removido com sucesso.
 *       404:
 *         description: Post, feedback ou dislike não encontrado.
 *       500:
 *         description: Erro ao remover o dislike.
 */

/**
 * @swagger
 * /api/feedbacks/{postId}/reports:
 *   post:
 *     summary: Cria uma denunúncia para um comentário específico
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID do post a ser avaliado
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: feedbackId token, caso já exista algum comentário criado.
 *         schema:
 *           type: string
 *           default: feedbackId <feedbackId>
 *       - in: body
 *         description: Dados para criar denúncia para o comentário..
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             reportedByName:
 *               type: string
 *               description: Nome do usuário que reportou o feedback
 *             reporterTo:
 *               type: string
 *               description: ID do feedback que será reportado
 *             typeOfReport:
 *               type: string
 *               description: Tipo de report (spam, ofensivo, etc)
 *           required:
 *             - reportedByName
 *             - reporterTo
 *             - typeOfReport
 *     responses:
 *       201:
 *         description: Report criado com sucesso
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Post ou feedback não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Dados requeridos não informados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       429:
 *         description: Limite de reports atingido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro ao criar report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
