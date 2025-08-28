import { Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface ProductOption {
    option_name: string;
    option: string[]
}

interface Props {
    productOptions: ProductOption
    onProductOptionSelect?: (option: string) => void;
}

const ProductOptionSelect = (props: Props) => {
    const { productOptions, onProductOptionSelect } = props;

    return (
        <div className="w-full max-w-xs">
            <Field>
                <Label className="text-sm/6 font-medium text-black capitalize">{productOptions.option_name}</Label>
                <div className="relative">
                    <Select
                        defaultValue={0}
                        className="mt-3 block w-full appearance-none border-b border-b-black px-3 py-1.5 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                    >
                        <option key={0} value={0} className="capitalize">{`Select ${productOptions.option_name}`}</option>
                        {productOptions.option.sort().map(option => {
                            return <option key={option} value={option} className="capitalize" onClick={() => onProductOptionSelect?.(option)}>{option}</option>
                        })}
                    </Select>
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
                        aria-hidden="true"
                    />
                </div>
            </Field>
        </div>
    )
}

export default ProductOptionSelect;