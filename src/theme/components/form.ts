const activeLabelStyles = {
  transform: 'scale(0.72) translateY(-18px)',
  p: 1,
  fontSize: 12
}

const formTheme = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles
          }
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
          {
            ...activeLabelStyles
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          bgColor: 'gray.50',
          rounded: 'sm',
          pointerEvents: 'none',
          fontFamily: 'heading',
          textTransform: 'uppercase',
          p: 1,
          px: 2,
          fontSize: 14,
          mx: 2,
          mb: 2,
          transformOrigin: 'left top',
          _dark: {
            bgColor: 'blackAlpha.900',
            color: 'light.400'
          }
        }
      }
    }
  }
}

export { formTheme }
