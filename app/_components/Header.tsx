import type { Product } from "../_services/product-service";
import Cart, { type CartProduct } from "./Cart";

interface Props {
    cartProducts: CartProduct[]
    onProductDelete?: (product: CartProduct) => void;
    onCardProductUpdate?: (product: Product, quantity: number) => void;
}

const Header = (props: Props) => {
    const { cartProducts, onProductDelete, onCardProductUpdate } = props;

    return <div className="grid grid-cols-[5fr_1fr] grid-flow-row p-[30px_90px_25px_90px] border-b-1 border-[#EDEDED] sticky top-0 z-10 bg-white">
        <div><p className="font-extrabold text-4xl italic text-[#0D3356]">Miguel's Store</p></div>
        <Cart products={cartProducts} onProductDelete={onProductDelete} onCartProductUpdate={onCardProductUpdate}/>
    </div>
}

export default Header;