"use client"

import { use, useState } from 'react';
import Header from './_components/Header';
import productService, { type Product } from './_services/product-service';
import brandsService, { type Brand } from './_services/brands-service';
import ProductList from './list/page';
import { Dialog, DialogPanel } from '@headlessui/react';
import ProductDetails from './details/page';
import { XMarkIcon } from '@heroicons/react/20/solid';
import type { CartProduct } from './_components/Cart';
import toast, { Toaster } from 'react-hot-toast';
import { findProductInCart } from './_utility/product';


const productPromise = productService.getAll<Product[]>();
const brandsPromise = brandsService.getAll<Brand[]>();


function App() {

  const products = use(productPromise);
  const brands = use(brandsPromise);

  const [clickedProduct, setClickedProduct] = useState<Product>();
  const [isOpen, setIsOpen] = useState(false);
  const [cartObjects, setCartObjects] = useState<CartProduct[]>([]);


  const handleOnCartAdd = (product: Product, option?: string) => {

    const totalInCart = cartObjects.filter(c => c.product.id === product.id).reduce((accumulator, c) => accumulator + c.quantity, 0);
    const productStockQuantity = product.stock_quantity;
    const availableToAdd = productStockQuantity - totalInCart;

    if (availableToAdd <= 0) {
      toast.error('Product Out of Stock!');
      return;
    }

    const productInCart = findProductInCart(product, cartObjects, option);

    if (productInCart) {
      // update product in cart quantity
      setCartObjects(cartObjects.map(c => c.product.id === productInCart.product.id ? { ...c, quantity: c.quantity + 1 } : c));
      toast.success('Product In Cart Updated!');
      return;
    }

    // Add new product to the cart.
    setCartObjects([...cartObjects, { product, option: option ?? "", quantity: 1 }])
    toast.success('Product Added To Cart!');
  }

  const handleOnCartItemDelete = (cartProduct: CartProduct, option?: string) => {
    const { product } = cartProduct;

    const productOption = option || cartProduct.option

    if (productOption) {
      setCartObjects(cartObjects.filter(c => !(c.product.id === product.id && c.option === productOption)));
    } else {
      setCartObjects(cartObjects.filter(p => p.product.id !== product.id));
    }

    closeProductDetailsDialog();
  }

  const handleOnProductClick = (product: Product) => {
    setClickedProduct(product);
    setIsOpen(true);
  }

  function closeProductDetailsDialog() {
    setIsOpen(false)
  }

  const handleOnCardProductUpdate = (product: Product, quantity: number) => {
    setCartObjects(cartObjects.map(c => c.product.id === product.id ? { ...c, product, quantity } : c))
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Header cartProducts={cartObjects} onProductDelete={handleOnCartItemDelete} onCardProductUpdate={handleOnCardProductUpdate} />
      <ProductList brands={brands} products={products} cartProducts={cartObjects} onAddToCart={handleOnCartAdd} onProductClick={handleOnProductClick} />
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeProductDetailsDialog}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[95%] max-w rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <ProductDetails product={clickedProduct} onAddToCart={handleOnCartAdd} cartProducts={cartObjects} />
              <XMarkIcon data-testid="close-product-details" className='w-10 h-10 absolute text-black top-[15px] right-[17px] hover:text-gray-700 cursor-pointer' onClick={closeProductDetailsDialog} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default App
