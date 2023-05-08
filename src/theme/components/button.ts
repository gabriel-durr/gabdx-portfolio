import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const gdxSolidButton = defineStyle({
  w: 'full',
  h: '2.3rem',
  rounded: 'sm',
  fontSize: '.98rem',
  fontFamily: 'heading',
  letterSpacing: '1.2px',
  color: 'whiteAlpha.900',
  bg: 'gbdx.satinYellow',
  textTransform: 'uppercase',
  _disabled: { bg: '#505b5f' },
  _hover: {
    bg: 'gbdx.satinYellow',
    filter: 'contrast(90%)',
    transition: '.5s ease'
  }
})

export const buttonTheme = defineStyleConfig({
  variants: { gdxSolidButton }
})
