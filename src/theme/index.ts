import { colors } from './colors'
import { formTheme, inputTheme, buttonTheme, headingTheme, textareaTheme } from './components'

import { DM_Sans, Raleway, Dosis } from 'next/font/google'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const dosis = Dosis({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] })

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      fontFamily: 'body',
      overflowX: 'hidden',
      color: mode('gray.900', 'gray.100')(props),
      bg: mode('light.500', 'darkblue.500')(props)
    },
    a: {
      color: mode('gray.900', 'gray.100')(props),
      fontFamily: 'heading',
      _hover: {
        transition: 'all 0.4s',
        filter: 'opacity(0.8)',
        textDecoration: 'none !important'
      }
    },
    '*:focus': {
      outline: 'none !important'
    },
    '*:focus-visible': {
      boxShadow: `0 0.5px 12px -2px ${mode('#f7a716', '#4b30c4')(props)} !important`,
      border: `1px solid ${mode('#f7a716', '#4b30c4')(props)} !important`
    },
    scrollBehavior: 'smooth',
    '*::-webkit-scrollbar': {
      w: '6px',
      bg: mode('gray.100', 'gray.900')(props)
    },
    '*::-webkit-scrollbar-thumb': {
      bg: mode('gray.900', 'gray.700')(props),
      borderRadius: '2px'
    },
    '*::placeholder': {
      color: mode('gray.400', 'light.500')(props)
    }
  })
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const breakpoints = {
  sm: '24.563em', // 393px mobile
  md: '48em', //768px tablet
  lg: '60em', //960px laptopt / hd-screen
  xl: '93.75em' //1500px desktop
}

const fonts = {
  heading: dmSans.style.fontFamily,
  body: raleway.style.fontFamily,
  number: dosis.style.fontFamily
}

const fontSizes = {
  subText: '15.4px'
}

const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
  breakpoints,
  fontSizes,
  components: {
    Text: {
      baseStyle: {
        fontSize: '15.6px',
        fontFamily: 'body',
        letterSpacing: '-0.01em'
      }
    },
    Form: formTheme,
    Input: inputTheme,
    Button: buttonTheme,
    Heading: headingTheme,
    Textarea: textareaTheme
  }
})

export default theme
