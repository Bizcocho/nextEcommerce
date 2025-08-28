interface Props {
    currentCategory: Category;
    onCategoryClick?: (type: Category) => void;
}

export type Category = "Shoes" | "Shirts" | "All";

const CATEGORIES: Category[] = ["All", "Shoes", "Shirts"];

const CategoryFilter = (props: Props) => {
    const { currentCategory, onCategoryClick } = props;

    return (
        <div className='flex justify-start align-middle bg-[#F7F7F7] w-fit p-1 h-11 rounded-[8px] min-w-[193px]'>
            {CATEGORIES.map(category => {
                return (
                    <span 
                        role="listitem"
                        aria-label={category}
                        key={category}
                        className={`${currentCategory === category && 'bg-white'} rounded-[8px] text-[16px] w-fit h-fit p-[5px_12px] font-bold mr-2 cursor-pointer`} 
                        onClick={() => onCategoryClick?.(category)} 
                    >
                        {category}
                    </span>
                )
            })}
        </div>
    )
}

export default CategoryFilter;