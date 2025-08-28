import { useEffect, useState } from 'react'
import { Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { debounce } from 'es-toolkit';

interface Props {
    onValueChange?: (range: [number, number]) => void;
}

export default function PriceFilter(props: Props) {
    const { onValueChange } = props;
    const [selected, setSelected] = useState<string[]>([]);
    const [value, setValue] = useState<[number, number]>([0, 2000]);

    useEffect(() => {
        const debouncedFunction = debounce(() => onValueChange?.(value), 1000);

        debouncedFunction();

        return() => {
            debouncedFunction.cancel();
        }
    }, [value])


    return (
        <Listbox value={selected} onChange={setSelected} multiple >
            <ListboxButton className='grid w-full cursor-pointer grid-cols-[2fr_1fr] rounded-[28px] bg-[#EBEDEC] max-w-[120px]'>
                <span className="flex items-center gap-3 p-[10px_14px]">
                    <span className="block truncate">Price</span>
                </span>
                <ChevronDownIcon aria-hidden="true" className='flex justify-self-center self-center size-4' />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className='p-3 bg-white w-max rounded shadow'>
                <ListboxOption value={0} className="flex gap-y-4 flex-col justify-start items-center select-none w-[320px] h-[117px]">
                    <RangeSlider className='mt-6' onInput={setValue} value={value} max={2000} />
                    <div className='flex items-center justify-center'>
                        <div className='flex w-[121px] h-12 rounded-[20px] border border-[#8B8B8B] pl-3'>
                            <span className="self-center shrink-0 text-base text-[#8B8B8B] select-none sm:text-sm/6">{`$ `}</span>
                            <Input readOnly className='text-start focus:outline-none text-[#8B8B8B]' value={value[0]} />
                        </div>
                        <span className='ml-5 mr-5 font-bold text-xl text-[##8B8B8B]'>-</span>
                        <div className='flex w-[121px] h-12 rounded-[20px] border border-[#8B8B8B] pl-3'>
                            <span className="self-center shrink-0 text-base text-[#8B8B8B] select-none sm:text-sm/6">$</span>
                            <Input readOnly className='block min-w-0 grow text-start focus:outline-none text-[#8B8B8B]' value={value[1]} />
                        </div>
                    </div>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    )
}
