import {
  DrawerBody,
  DrawerCartBuyBtn,
  DrawerCartInfo,
  DrawerCartItem,
  DrawerCloseBtnContainer,
  DrawerItemImg,
  DrawerItemsCartContainer,
  HeaderContainer,
  ShoppingCartBadge,
  ShoppingCartBtn,
} from '../styles/components/Header'
import { Handbag, X } from 'phosphor-react'
import Image from 'next/image'

import igniteShopLogo from '../assets/logo.svg'
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import Link from 'next/link'
import { numberFormatter } from '../utils/formatters'
import axios from 'axios'

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { cartProducts, removeCartProduct } = useShoppingCartContext()

  const cartProductsLength = cartProducts.length
  const totalPrice = cartProducts
    .map((product) => parseFloat(product.price.replace(/R\$/g, '')))
    .reduce((acc, current) => acc + current, 0)
    .toFixed(2)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const productsPriceId = cartProducts.map((product) => {
        return { priceId: product.defaultPriceId }
      })

      const response = await axios.post('/api/createCheckout', {
        productsPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com ferramenta de observabilidade (Datadog, Sentry)

      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout!')
    }
  }

  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <a>
          <Image src={igniteShopLogo} alt="logo ignite shop" />
        </a>
      </Link>

      <ShoppingCartBtn
        variant={cartProductsLength > 0 ? 'full' : 'empty'}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Handbag weight="bold" width={24} height={24} />
        <ShoppingCartBadge>{cartProductsLength}</ShoppingCartBadge>
      </ShoppingCartBtn>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          '& .MuiPaper-root': {
            background: '#202024',
            color: '#E1E1E6',
          },
        }}
      >
        <DrawerBody>
          <h2>Sacola de compras</h2>

          <DrawerCloseBtnContainer
            title="fechar carrinho"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X weight="bold" width={24} height={24} />
          </DrawerCloseBtnContainer>

          <DrawerItemsCartContainer>
            {cartProducts.map((product) => {
              return (
                <DrawerCartItem key={product.id}>
                  <DrawerItemImg>
                    <Image
                      src={product.imageUrl}
                      width={64}
                      height={64}
                      alt=""
                    />
                  </DrawerItemImg>
                  <div>
                    <span>{product.name}</span>

                    <strong>{product.price}</strong>

                    <button onClick={() => removeCartProduct(product)}>
                      Remover
                    </button>
                  </div>
                </DrawerCartItem>
              )
            })}
          </DrawerItemsCartContainer>

          <DrawerCartInfo>
            <div>
              <span>Quantidade</span>
              <span>{cartProductsLength} itens</span>
            </div>

            <div>
              <span>Valor total</span>
              <span>
                {cartProducts.length > 0
                  ? numberFormatter(totalPrice)
                  : 'R$ 0,00'}
              </span>
            </div>
            <DrawerCartBuyBtn
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              {isCreatingCheckoutSession
                ? 'Redirecionando...'
                : 'Finalizar compra'}
            </DrawerCartBuyBtn>
          </DrawerCartInfo>
        </DrawerBody>
      </Drawer>
    </HeaderContainer>
  )
}
