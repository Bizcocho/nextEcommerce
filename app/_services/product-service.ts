import create from "./http-client";

export interface Product {
    id: string;
    product_name: string;
    category: "Shirts" | "Shoes";
    price: number;
    brand: string;
    stock_quantity: number;
    release_date: string;
    description: string;
    selectible_option: SelectableOption | null;
}

interface SelectableOption {
    option_type: string;
    option_name: string;
    option: string[]
}

export default create("products");