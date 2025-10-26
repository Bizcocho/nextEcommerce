import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import type { Product } from '../_services/product-service';
import type { CartProduct } from './Cart';
import { findProductInCart } from '../_utility/product';

interface Props {
    product: Product;
    cartProducts: CartProduct[];
    className?: string;
    onNormalButtonClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMenuItemClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: string) => void;
}

const QuickAddIcon = (props: Props) => {
    const { cartProducts, product, onNormalButtonClick, onMenuItemClick, className } = props;

    const isProductInCart = findProductInCart(product, cartProducts)

    if (product.selectible_option === null) return (
        <div 
            onClick={onNormalButtonClick} 
            className={className}>
            <ShoppingBagIcon className={`${isProductInCart ? 'text-[#08BB4F]' : 'text-black'} h-5 w-5`} />
        </div>
    )

    return (
        <Menu>
            <MenuButton className={className} onClick={(event) => event.stopPropagation()}>
                <ShoppingBagIcon className={`${isProductInCart ? 'text-[#08BB4F]' : 'text-black'} h-5 w-5`} />
            </MenuButton>
            <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                {product.selectible_option?.option.map(option => {
                    return (
                        <MenuItem key={option}>
                            <button onClick={(event) => onMenuItemClick?.(event, option)} className={`${findProductInCart(product, cartProducts, option) ? "text-[#08BB4F]" : "text-black"} capitalize group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-200`}>
                                {option}
                            </button>
                        </MenuItem>
                    )
                })}
            </MenuItems>
        </Menu>
    )
}

export default QuickAddIcon;