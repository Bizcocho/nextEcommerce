import { SetStateAction, useEffect, useState } from 'react'
import { Checkbox, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import type { Brand } from '../_services/brands-service';

interface Props {
    brands: Brand[];
    onSelected?: (selectedBrands: string[]) => void;
}

export default function BrandListBox(props: Props) {
    const { brands, onSelected } = props;
    const [selected, setSelected] = useState<string[]>([]);
    
    const handleOnChange = (value: string[]) => {
        setSelected(value);
        onSelected?.(value);
    }

    return (
        <Listbox value={selected} onChange={handleOnChange} multiple >
            <ListboxButton className='grid w-full cursor-pointer grid-cols-[70%_1fr] rounded-[28px] bg-[#EBEDEC] max-w-[120px]'>
                <span className="flex items-center gap-3 p-[10px_14px]">
                    <span className="block truncate">{selected.length <= 0 ? "Brands" : selected.join(", ")}</span>
                </span>
                <ChevronDownIcon aria-hidden="true" className='flex justify-self-center self-center size-4' />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className='p-3 bg-white w-[180px] rounded shadow'>
                {brands.map((brand) => (
                    <ListboxOption key={brand.id} value={brand.name} className="relative flex justify-start items-center select-none p-1 hover:font-semibold">
                        <Checkbox
                            checked={selected.includes(brand.name)}
                            className="group block size-4 rounded border bg-white data-checked:bg-[#0091EA] mr-2"
                        >
                            <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Checkbox>
                        {brand.name}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}
