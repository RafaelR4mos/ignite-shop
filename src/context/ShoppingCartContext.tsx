import { createContext, useState, useContext } from 'react'

export interface IChildren {
  children: React.ReactNode
}

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

interface ShoppingCartContextType {
  cartProducts: ProductType[]
  addCartProduct: (product: ProductType) => void
  removeCartProduct: (productToDelete: ProductType) => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function ShoppingCartProvider({ children }: IChildren) {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([])

  function addCartProduct(productToAdd: ProductType) {
    const isProductAlreadyAdded = cartProducts.some(
      (product) => product.id === productToAdd.id
    )

    if (isProductAlreadyAdded) {
      alert('Você já adicionou este item no carrinho')
      return
    }

    setCartProducts((state) => [...state, { ...productToAdd }])
  }

  function removeCartProduct(productToDelete: ProductType) {
    setCartProducts((state) =>
      state.filter((product) => product.id !== productToDelete.id)
    )
  }

  return (
    <ShoppingCartContext.Provider
      value={{ cartProducts, addCartProduct, removeCartProduct }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCartContext() {
  const context = useContext(ShoppingCartContext)

  if (!context)
    throw new Error(
      'useShoppingCartContext mus be used within a ShoppingCartProvider'
    )

  return context
}
