import { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import 'react-range-slider-input/dist/style.css';

interface Props {
    onValueChange?: (option: Option) => void;
}

export interface Option {
    label: string,
    value: number
}

export const OptionValue = Object.freeze({
    RELEASE_DATE_DESC: 1,
    RELEASE_DATE_ASC: 2,
    PRICE_DESC: 3,
    PRICE_ASC: 4
});

const OPTIONS: Option[] = [
    {
        label: "Release Date: Desc",
        value: OptionValue.RELEASE_DATE_DESC,
    },
    {
        label: "Release Date: Asc",
        value: OptionValue.RELEASE_DATE_ASC,
    },
    {
        label: "Price Desc",
        value: OptionValue.PRICE_DESC
    },
    {
        label: "Price ASC",
        value: OptionValue.PRICE_ASC
    }
]

export default function SortBySelect(props: Props) {
    const { onValueChange } = props;
    const [selected, setSelected] = useState<Option>();

    const handleOnChange = (value: Option) => {
        if (value.value === selected?.value) {
            const newSelection = { label: "Sort By", value: 0 };
            setSelected(newSelection);
            onValueChange?.(newSelection);
            return;
        }

        setSelected(value);
        onValueChange?.(value);
    }

    return (
        <Listbox value={selected} onChange={handleOnChange}>
            <ListboxButton className='grid w-full cursor-pointer grid-cols-[70%_1fr] rounded-[28px] bg-[#EBEDEC] max-w-[120px]'>
                <span className="flex items-center gap-3 p-[10px_14px]">
                    <span className="block truncate">{selected ? selected.label : "Sort By"}</span>
                </span>
                <ChevronDownIcon aria-hidden="true" className='flex justify-self-center self-center size-4' />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className='p-3 bg-white w-[181px] rounded shadow'>
                {OPTIONS.map(option => {
                    return <ListboxOption value={option} className="flex gap-y-4 flex-col justify-start items-center select-none w-max data-selected:text-[#0091EA] data-selected:font-bold hover:font-bold">
                        {option.label}
                    </ListboxOption>
                })}
            </ListboxOptions>
        </Listbox>
    )
}
