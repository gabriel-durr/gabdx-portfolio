import { api } from '@services/api'

import { useState, useEffect } from 'react'

export type CurrentFeedbackProps = {
  name: string
  avatar: string
  createdAt: Date
  feedbackId: string
}

export const useCurrentFeedback = () => {
  const [currentFeedback, setCurrentFeedback] = useState<CurrentFeedbackProps | undefined>(
    undefined
  )

  useEffect(() => {
    ;(async function getCurrentFeedback() {
      try {
        const { data: feedback } = await api.get<CurrentFeedbackProps>(
          '/feedbacks/query current in all posts'
        )

        setCurrentFeedback(feedback)
      } catch (err) {
        setCurrentFeedback(undefined)
      }
    })()
  }, [])

  return { currentFeedback }
}
