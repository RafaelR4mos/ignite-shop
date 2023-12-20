import {
  BuyBtn,
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  ProductType,
  useShoppingCartContext,
} from '../../context/ShoppingCartContext'

import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

export interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addCartProduct } = useShoppingCartContext()

  if (isFallback) {
    return (
      <ProductContainer>
        <p>Loading...</p>
      </ProductContainer>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>

          <span>{product.price}</span>
          <p>{product.description}</p>

          <BuyBtn onClick={() => addCartProduct(product)}>
            Colocar na sacola
          </BuyBtn>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PC4DXfxa0KiLBh' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
