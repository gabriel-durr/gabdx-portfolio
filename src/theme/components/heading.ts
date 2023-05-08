import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const postPrimary = defineStyle({
  fontFamily: 'heading',
  fontSize: ['1.16rem', '1.18rem', '1.54rem', '2.14rem'],
  lineHeight: '2rem',
  letterSpacing: '-0.04em',
  textTransform: 'lowercase',
  fontWeight: 'normal',
  textShadow: '0px 8px 17px #ffffff11',
  _firstLetter: {
    textTransform: 'uppercase'
  },
  _light: { textShadow: '0px 8px 17px #06020127' }
})

const secondary = defineStyle({
  color: 'gray.100',
  fontFamily: 'heading',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '2rem',
  letterSpacing: '-0.04em',
  _light: {
    color: 'gray.900'
  }
})

const topicPrimary = defineStyle({
  color: 'gray.100',
  fontFamily: 'heading',
  textTransform: 'uppercase',
  fontSize: ['1.12rem', '1.12rem', '1.15rem'],
  letterSpacing: 'wide',
  _after: {
    content: "''",
    border: '1px solid #e61101',
    display: 'block',
    width: '4rem'
  },
  _light: {
    color: 'gray.900'
  }
})

export const headingTheme = defineStyleConfig({
  variants: { postPrimary, secondary, topicPrimary }
})
