import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const gdxTextarea = defineStyle({
  pl: '8px',
  rounded: 'sm',
  maxH: '12rem',
  resize: 'vertical',
  bg: 'transparent',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#D1D1D1',
  h: { base: '10rem', xl: '8.4rem', '2xl': '12rem' },

  _light: {
    borderColor: '#9699B0'
  }
})

const gdxComment = defineStyle({
  pl: '8px',
  rounded: 'sm',
  maxH: '12rem',
  bg: 'transparent',
  minH: '24px',
  h: '54px',
  pr: '60px',
  pt: '18px',
  resize: 'none',
  border: 'none',
  borderBottom: '1px solid #D1D1D1',
  _light: { borderBottomColor: '#9699B0' }
})

export const textareaTheme = defineStyleConfig({
  variants: { gdxTextarea, gdxComment }
})
