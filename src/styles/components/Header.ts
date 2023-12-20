import { styled } from '..'
import { BuyBtn } from '../pages/product'
import { ImageContainer } from '../pages/success'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ShoppingCartBtn = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'relative',

  padding: '0.75rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '6px',
  backgroundColor: '$gray800',

  svg: {
    color: '$gray200',
  },

  variants: {
    variant: {
      empty: {
        '& > span': {
          display: 'none',
        },
      },

      full: {
        '& > span': {
          display: 'flex',
        },
      },
    },
  },
})

export const ShoppingCartBadge = styled('span', {
  position: 'absolute',
  right: '-8px',
  top: '-8px',

  padding: '8px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 24,
  height: 24,

  backgroundColor: '$green500',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$sm',

  border: '2px solid $gray900',
  borderRadius: '9999px',
})

export const DrawerBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100vw',
  maxWidth: '480px',
  height: '100%',
  padding: '4.5rem 3rem 3rem',

  position: 'relative',
})

export const DrawerCloseBtnContainer = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
})

export const DrawerItemsCartContainer = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const DrawerCartItem = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  gap: '1.5rem',

  '& > div:last-child': {
    display: 'flex',
    flexDirection: 'column',

    span: {
      fontSize: '$md',
      lineHeight: 1.6,
    },

    strong: {
      fontSize: '$md',
      lineHeight: 1.6,
    },

    button: {
      all: 'unset',
      cursor: 'pointer',
      marginTop: 'auto',
      fontWeight: 'bold',
      color: '$green500',

      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const DrawerItemImg = styled(ImageContainer, {
  marginTop: 0,
  height: 94,
  width: 94,
})

export const DrawerCartInfo = styled('div', {
  marginTop: 'auto',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    span: {
      fontSize: '$md',
      lineHeight: 1.6,
    },

    '&:first-child': {
      marginBottom: '0.5rem',
    },

    '&:nth-child(2)': {
      span: {
        fontWeight: 'bold',

        '&:last-child': {
          fontSize: '$xl',
        },
      },
    },
  },
})

export const DrawerCartBuyBtn = styled(BuyBtn, {
  marginTop: '3.625rem',
  width: '100%',
})
