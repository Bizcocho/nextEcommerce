import type { Product } from "../_services/product-service";
import CartItem from "./CartItem";
import EmptyCart from "../_assets/emptyCart.png"
import { Button, Label } from "@headlessui/react";
import type { CartProduct } from "./Cart";
import toast from "react-hot-toast";
import Image from 'next/image'

interface Props {
    products: CartProduct[],
    onProductDelete?: (product: CartProduct) => void;
    onQuantityChange?: (product: Product, quantity: number) => void;
}

const CartDropdown = (props: Props) => {
    const { products, onProductDelete, onQuantityChange } = props;

    const productsLength = products.length;


    return <div className='focus:outline-none flex flex-col h-[583px] w-[487px] shadow-2xl rounded-[20px] border border-[#828282] bg-white select-none gap-2.5'>
        <div className={`${productsLength <= 0 ? "block" : "hidden"}  flex flex-col justify-center items-center focus:outline-none p-[36px_18px]`}>
            <Image src={EmptyCart} alt="Cart is Empty" />
            <Label>Cart is empty</Label>
        </div>
        <div data-testid="cart-product-list" className={`${productsLength > 0 ? "block" : "hidden"} overflow-auto p-[36px_18px_12px_18px] max-h-[526px]`}>
            {products.map((product, index) => {
                return <CartItem key={`${product.product.id}_${index}`} cartProduct={product} onDelete={onProductDelete} onQuantityChange={(quantity) => onQuantityChange?.(product.product, quantity)} />
            })}
        </div>
        <Button className={`${productsLength > 0 ? "block" : "hidden"} cursor-pointer mt-auto text-center w-full h-[52px] bg-[#2D9C07] rounded-bl-[20px] rounded-br-[20px] text-white`} onClick={() => toast.error('Not Implemented!')}>Continue To Checkout</Button>
    </div>
}

export default CartDropdown;