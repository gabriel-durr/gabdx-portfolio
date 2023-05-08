type LangKeyType = 'pt-br' | 'en-us' | string

export const getTimeGreeting = (currentTime: number, lang: LangKeyType) => {
  const langGreeting: Record<
    LangKeyType,
    {
      goodMorning: string
      goodAfternoon: string
      goodNight: string
    }
  > = {
    'pt-br': {
      goodMorning: 'Olá, Tenha um ótimo Dia! 🌥️',
      goodAfternoon: 'Olá, tenha uma ótima Tarde! 🌤️',
      goodNight: 'Olá, Tenha uma ótima Noite! 🌒'
    },
    'en-us': {
      goodMorning: 'Hello, have a great day! 🌥️',
      goodAfternoon: 'Hello, have a great afternoon! 🌤️',
      goodNight: 'Hello, have a great night!  🌒'
    }
  }

  if (currentTime >= 6 && currentTime < 12) {
    return langGreeting[lang].goodMorning
  }

  if (currentTime >= 12 && currentTime < 18) {
    return langGreeting[lang].goodAfternoon
  }

  return langGreeting[lang].goodNight
}
