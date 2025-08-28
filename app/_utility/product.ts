import type { CartProduct } from "../_components/Cart";
import type { Product } from "../_services/product-service";


export const getProductStock = (product?: Product, cartProducts?: CartProduct[]) => {
    let productsInCart = 0;
    const numberArray = cartProducts?.filter(p => p.product.id === product?.id)?.flatMap(m => m.quantity);
    if (numberArray?.length) productsInCart = numberArray.reduce((previous, current) => previous + current)

    return (product?.stock_quantity ?? 0) - (productsInCart ?? 0);
}

export const findProductInCart = (product: Product, cartObjects: CartProduct[], option?: string) => {
    let productInCart = {} as CartProduct | undefined;
    if (option) {
        productInCart = cartObjects.find(c => c.product.id === product.id && c.option === option);
    } else {
        productInCart = cartObjects.find(c => c.product.id === product.id);
    }

    return productInCart;
}