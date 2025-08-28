"use client"

import { Button } from "@headlessui/react";
import type { Product } from "../_services/product-service";
import shoes from '../_assets/shoes.webp'
import shirt from '../_assets/shirt.webp'
import ProductOptionSelect from "../_components/ProductOptionSelect";
import { useState } from "react";
import type { CartProduct } from "../_components/Cart";
import { getProductStock } from "../_utility/product";
import Image from "next/image";

interface Props {
    product?: Product;
    cartProducts?: CartProduct[];
    onAddToCart: (product: Product, option?: string) => void;
}

const ProductDetails = (props: Props) => {
    const { product, onAddToCart, cartProducts } = props;
    const [selectedOption, setSelectedOption] = useState<string>()

    const availableStock = getProductStock(product, cartProducts);

    if (!product) return <></>;
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-y-[100px] justify-self-center">
            <div className="w-[425px] h-[425px] xl:w-[625px] xl:h-[625px] rounded-xl justify-self-center"><Image className="rounded-xl" src={product.category === "Shirts" ? shirt : shoes} alt={product.category} /></div>
            <div className="flex flex-col justify-self-center xl:justify-start gap-6 w-full xl:w-[515px]">
                <label className='text-[40px] font-semibold'>{product.product_name}</label>
                <label className='text-2xl font-normal'>{product.brand}</label>
                <label className='text-2xl font-normal'>{`$${product.price}`}</label>
                <label className='font-medium text-lg'>{product.description}</label>
                {product.selectible_option && <ProductOptionSelect productOptions={product.selectible_option} onProductOptionSelect={setSelectedOption} />}
                <Button
                    onClick={() => onAddToCart(product, selectedOption)}
                    className='hover:bg-gray-700 disabled:hover:bg-black disabled:cursor-not-allowed cursor-pointer p-[14px_24px] rounded-lg text-white bg-black w-full'
                    disabled={!selectedOption && product.selectible_option !== null}
                    data-testid='add-to-cart'
                >
                    Add to cart
                </Button>
                <label className='text-[##828282] text-base font-medium'>{`Available Quantity ${availableStock}`}</label>
                {availableStock <= 0 && <label className="text-[#EE5F81] text-base font-medium">Out of stock</label>}
            </div>
        </div>
    )

}

export default ProductDetails