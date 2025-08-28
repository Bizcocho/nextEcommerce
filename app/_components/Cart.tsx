import type { Product } from "../_services/product-service";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CartDropdown from "./CartDropdown";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface Props {
    products: CartProduct[];
    onProductDelete?: (product: CartProduct) => void;
    onCartProductUpdate?: (product: Product, quantity: number) => void;
}

export interface CartProduct {
    product: Product;
    option: string;
    quantity: number;
}

const Cart = (props: Props) => {
    const { onProductDelete, onCartProductUpdate, products } = props;
   
    return (
        <Menu>
            <MenuButton data-testid="cart" className='justify-self-end focus:outline-none select-none relative flex justify-center items-center text-xl w-11 h-11 rounded-[77px] bg-[#F5F1EE] cursor-pointer'>
                <ShoppingBagIcon className='h-5 w-5 text-[#875541]' />
                <span data-testid="total-cart-products" className={`${products.length <= 0 && 'hidden'} absolute left-[-5px] top-0 flex justify-center items-center rounded-[12px] bg-[#1D364D] text-white text-xs p-[2px_7px]`}>{products.length}</span>
            </MenuButton>
            <MenuItems anchor="bottom" className="focus:outline-none z-50">
                <MenuItem>
                    <CartDropdown products={products} onProductDelete={onProductDelete} onQuantityChange={onCartProductUpdate}></CartDropdown>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default Cart;