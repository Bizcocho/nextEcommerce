import shoes from '../_assets/shoes.webp'
import shirt from '../_assets/shirt.webp'
import { Button, Label } from "@headlessui/react";
import ProductCounter from "./ProductCounter";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { CartProduct } from "./Cart";
import Image from 'next/image'

interface Props {
    cartProduct: CartProduct;
    onDelete?: (product: CartProduct) => void;
    onQuantityChange?: (quantity: number) => void;
}


const CartItem = (props: Props) => {
    const { cartProduct, onDelete, onQuantityChange } = props;
    const { product, option } = cartProduct;


    return (
        <div data-testid="cart-product" className="grid grid-cols-[1fr_3fr_1fr] h-[106px] gap-x-3 p-2">
            <div className="self-center"><Image src={product.category === "Shirts" ? shirt : shoes} alt={product.category} /></div>
            <div className="flex flex-col justify-between">
                <Label data-testid="cart-product-brand">{product.brand}</Label>
                <Label data-testid="cart-product-name">{product.product_name}</Label>
                {product.selectible_option && <Label>{`${product.selectible_option.option_name}: ${option}`}</Label>}
                <ProductCounter cartProduct={cartProduct} onCountChange={onQuantityChange}/>
            </div>
            <div className="flex flex-col justify-between items-end">
                <Label data-testid="cart-product-price">{`$ ${product.price}`}</Label>
                <Button onClick={() => onDelete?.(cartProduct)}><TrashIcon className="h-6 w-6 hover:text-red-500 cursor-pointer"/></Button>
            </div>
        </div>
    )
}

export default CartItem