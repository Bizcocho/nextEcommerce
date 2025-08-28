import { Button, Input } from "@headlessui/react";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { MinusIcon } from "@heroicons/react/20/solid";
import type { CartProduct } from "./Cart";


interface Props {
    cartProduct: CartProduct;
    onCountChange?: (count: number) => void;
}


const ProductCounter = (props: Props) => {
    const { onCountChange, cartProduct } = props;
    const { product, quantity } = cartProduct;

    const [counter, setCounter] = useState<number>(quantity);

    const changeCounter = (operation: "sum" | "rest") => {
        if (operation === "rest" && counter === 1) return;
        if (operation === "sum" && counter >= product.stock_quantity) return;

        const result = operation === "sum" ? counter + 1 : counter - 1;

        setCounter(result);
        onCountChange?.(result);
    }

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] w-[93px] h-[23px] rounded-[46px]">
            <Button className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-tl-[46px] rounded-bl-[46px] bg-[#DEDEDE]" onClick={() => changeCounter("rest")}><MinusIcon  className="h-4 w-4"/></Button>
            <Input readOnly value={counter} className="focus:outline-none select-none h-full w-full text-center"/>
            <Button className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-tr-[46px] rounded-br-[46px] bg-[#DEDEDE]" onClick={() => changeCounter("sum")}><PlusIcon className="h-4 w-4"/></Button>
        </div>
    )
}

export default ProductCounter