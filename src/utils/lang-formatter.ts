const toastContactForm = (lang: string) => {
  const isBrLang = lang === 'pt-br'

  return {
    sucess: {
      title: isBrLang ? 'Mensagem enviada com Sucesso' : 'Message sent sucessfully',
      description: isBrLang
        ? 'Fique tranquilo, logo entrarei em contato'
        : "Don't worry, I'll be in touch soon"
    },
    error: {
      title: isBrLang ? 'Algo de errado, não esta certo' : "Something's wrong, it's not right"
    }
  }
}

const feedbacksInPostLang = (lang: string) => {
  const isBrLang = lang === 'pt-br'

  return {
    banMsg: isBrLang
      ? 'Você está banido, não poderá visualizar ou escrever mais comentários'
      : 'You are banned, you will not be able to view or write any more comments',
    altImage: isBrLang ? 'Está banido' : 'Is banned',
    feedbackTitle: isBrLang ? 'Comentários' : 'Feedbacks'
  }
}

const inputsFeedbackLang = (lang: string) => {
  const isBrLang = lang === 'pt-br'

  return {
    emojiLang: {
      requireMsg: isBrLang ? 'Nível de feedback obrigatório' : 'Feedback level required',
      altSelected: isBrLang ? 'Emoji selecionado' : 'Selected emoji',
      restartEmojis: isBrLang ? 'Reiniciar emojis' : 'Reset emojis',
      allEmojis: isBrLang ? 'Todos emojis' : 'All emojis'
    },

    feedbackTitle: isBrLang ? 'Digite seu comentário' : 'Type your comment',
    feedbackForm: {
      inputName: {
        requiredMsg: isBrLang ? 'Nome Obrigatório' : 'Name Required',
        minMsg: isBrLang ? 'Tamanho Minímo de 4 Caracteres' : 'Minimum Size of 4 Characters',

        placeholder: isBrLang ? 'Digite seu nome' : 'Type your name'
      },

      inputComment: {
        requiredMsg: isBrLang ? 'Comentário obrigatório' : 'Required comment',
        minMsg: isBrLang ? 'Tamanho Minímo de 8 Caracteres' : 'Minimum Size of 8 Characters',

        placeholder: isBrLang ? 'Digite seu comentário' : 'Type your comment',
        submitLabel: isBrLang ? 'Botão: Enviar comentário' : 'Button: Send comment'
      }
    }
  }
}

const likeOrDislikeLang = (lang: string) => {
  const isBrLang = lang === 'pt-br'

  return {
    likeLang: {
      requireFeedbackMsg: isBrLang
        ? 'É necessário criar um comentário para curtir'
        : 'It is necessary to create a feedback to like',

      errorServer: isBrLang ? 'Erro ao avalidar comentário' : 'Error giving rate feedback'
    },

    dislikeLang: {
      requireFeedbackMsg: isBrLang
        ? 'É necessário criar um comentário para dar não gostei'
        : 'It is necessary to create a feedback to dislike',

      errorServer: isBrLang ? 'Erro ao avalidar comentário' : 'Error giving rate feedback'
    }
  }
}

const reportLang = (lang: string) => {
  const isBrLang = lang === 'pt-br'

  return {
    optsLang: {
      offensive: isBrLang ? 'Conteúdo ofensivo' : 'Offensive content',
      discrimination: isBrLang ? 'Discriminação' : 'Discrimination',
      harassment: isBrLang ? 'Assédio' : 'Harassment',
      spam: isBrLang ? 'Spam' : 'Spam',
      anotherMotive: isBrLang ? 'Outro motivo' : 'Another motive'
    },
    toastLang: {
      titleMsg: isBrLang ? 'Denuncia' : 'Report',
      sucessMsg: isBrLang
        ? 'A denuncia será analisada cuidadosamente'
        : 'The complaint will be carefully analyzed',
      requireFeedbackMsg: isBrLang
        ? 'É necessário criar um comentário para reportar'
        : 'You must create a comment to report',
      errorMsg: isBrLang ? 'Error ao reportar Feedback' : 'Error reporting Feedback',
      limitMsg: isBrLang
        ? 'Você atingiu o limite de denuncias para esse feedback'
        : 'You have reached the report limit for this feedback'
    },

    btnReportLang: {
      title: isBrLang ? 'Reportar' : 'Report',
      ariaLabel: isBrLang ? 'Botão: Reportar Feedback' : 'Button: Report Feedback'
    },

    modalLang: {
      title: isBrLang ? 'Denunciar comentário' : 'Report comment',
      rules: isBrLang ? 'É necessário selecionar uma opção' : 'You must select an option',
      confirm: isBrLang ? 'Denunciar' : 'Report',
      cancel: isBrLang ? 'Cancelar' : 'Cancel'
    }
  }
}

export { reportLang, toastContactForm, likeOrDislikeLang, inputsFeedbackLang, feedbacksInPostLang }
