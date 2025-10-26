"use client"

import ReactPaginate from 'react-paginate';
import shoes from '../_assets/shoes.webp'
import shirt from '../_assets/shirt.webp'
import BrandListBox from '../_components/BrandListBox';
import PriceFilter from '../_components/PriceFilter';
import { useEffect, useState } from 'react';
import type { Product } from '../_services/product-service';
import SortBySelect, { OptionValue, type Option } from '../_components/SortBySelect';
import type { Brand } from '../_services/brands-service';
import QuickAddIcon from '../_components/QuickAddIcon';
import type { Category } from '../_components/CategoryFilter';
import CategoryFilter from '../_components/CategoryFilter';
import type { CartProduct } from '../_components/Cart';
import { getProductStock } from '../_utility/product';
import zenscroll from 'zenscroll';
import Image from 'next/image'

interface Props {
    brands: Brand[]
    cartProducts: CartProduct[]
    products: Product[]
    onAddToCart?: (product: Product, option?: string) => void;
    onProductClick?: (product: Product) => void;
}

interface ApplyFilter {
    category: Category;
    selectedBrands: string[]
    rangeValues: [number, number]
    sortBy: number
}


const ProductList = (props: Props) => {
    const { products, brands, onAddToCart, cartProducts, onProductClick } = props;
    const itemsPerPage = 16;

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentItems, setCurrentItems] = useState<Product[]>(products.slice(0, itemsPerPage));
    const [productsCopy, setProductsCopy] = useState<Product[]>(products);
    const [pageCount, setPageCount] = useState<number>(Math.ceil(products.length / itemsPerPage))

    const [currentCategory, setCurrentCategory] = useState<Category>("All");
    const [filters, setFilters] = useState<ApplyFilter>({ category: "All", selectedBrands: [], rangeValues: [0, 2000], sortBy: 0 });


    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
        const newOffset = (event.selected * itemsPerPage) % productsCopy.length;
        const endOffset = newOffset + itemsPerPage;
        setCurrentItems(productsCopy.slice(newOffset, endOffset));

        zenscroll.toY(0, 750);
    };

    const handleFiltering = (filters: ApplyFilter) => {
        const categoryItems = filters.category === "All" ? products : products.filter(p => p.category === filters.category);
        const brandItems = filters.selectedBrands.length <= 0 ? categoryItems : categoryItems.filter(p => filters.selectedBrands.includes(p.brand))
        const rangeItems = filters.rangeValues[0] === 0 && filters.rangeValues[1] === 2000 ? brandItems : brandItems.filter(b => b.price >= filters.rangeValues[0] && b.price <= filters.rangeValues[1])
        const sortedItems = applySort(rangeItems.slice(), filters.sortBy);

        setProductsCopy(sortedItems);
        setCurrentItems(sortedItems.slice(0, itemsPerPage));
        setPageCount(Math.ceil(sortedItems.length / itemsPerPage));
        setCurrentPage(0);
    }

    const applySort = (products: Product[], filter: number) => {
        switch (filter) {
            case OptionValue.RELEASE_DATE_DESC:
                return products.sort((a, b) => new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf());
            case OptionValue.RELEASE_DATE_ASC:
                return products.sort((a, b) => new Date(a.release_date).valueOf() - new Date(b.release_date).valueOf());
            case OptionValue.PRICE_DESC:
                return products.sort((a, b) => b.price - a.price);
            case OptionValue.PRICE_ASC:
                return products.sort((a, b) => a.price - b.price);
            default:
                return products;
        }
    }

    const filterByBrand = (selectedBrands: string[]) => {
        setFilters({ ...filters, selectedBrands })
        handleFiltering({ ...filters, selectedBrands });
    }

    const filterByPriceRange = (rangeValues: [number, number]) => {
        setFilters({ ...filters, rangeValues })
        handleFiltering({ ...filters, rangeValues });
    }

    const filterByCategory = (category: "Shoes" | "Shirts" | "All") => {
        setCurrentCategory(category);
        setFilters({ ...filters, category });
        handleFiltering({ ...filters, category });
    }

    const sortBy = (option: Option) => {
        setFilters({ ...filters, sortBy: option.value })
        handleFiltering({ ...filters, sortBy: option.value });
    }

    return <div className='pr-[90px] pl-[90px] pb-[60px]'>
        <div>
            <div className='text-3xl font-extrabold mt-16 mb-16'>Products</div>
            <div className='grid md:grid-cols-[1fr_3fr] sm:grid-cols-1'>
                <CategoryFilter currentCategory={currentCategory} onCategoryClick={filterByCategory} />
                <div className='flex justify-end gap-4 mt-4 md:mt-0 flex-col md:flex-row'>
                    <BrandListBox brands={brands} onSelected={filterByBrand} />
                    <PriceFilter onValueChange={filterByPriceRange} />
                    <SortBySelect onValueChange={sortBy} />
                </div>
            </div>
            <div data-testid="product-list" className='mt-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
                {currentItems.map(product => {
                    return <div data-testid="product" key={product.id} className='flex flex-col justify-self-center rounded-2xl border border-[#EDEDED] w-fit relative cursor-pointer' onClick={() => onProductClick?.(product)}>
                        <div className='w-[305px] h-[305px] bg-blue-300 rounded-2xl rounded-b-none'>
                            <Image alt={`${product.category}`} src={product.category === "Shirts" ? shirt : shoes} className='rounded-2xl rounded-b-none' />
                            <QuickAddIcon
                                className='hover:bg-blue-300 flex justify-center items-center text-xl absolute w-11 h-11 rounded-[77px] bg-[#FCFCFD] top-2 right-2 cursor-pointer'
                                cartProducts={cartProducts}
                                product={product}
                                onNormalButtonClick={(event) => {
                                    event.stopPropagation();
                                    onAddToCart?.(product);
                                }}
                                onMenuItemClick={(event, option) => {
                                    event.stopPropagation();
                                    onAddToCart?.(product, option);
                                }}
                            />
                        </div>
                        <div className='flex flex-col h-24 p-5 border-b border-[#EDEDED]'>
                            <div>{product.product_name}</div>
                            <div>{product.brand}</div>
                        </div>
                        <div className='flex justify-center p-7 font-bold text-xl '>
                            ${product.price}
                        </div>
                        {getProductStock(product, cartProducts) === 0 && <div className="text-white font-bold absolute bg-red-500 rotate-[-45deg] top-[19px] left-[-26px] pr-2.5 pl-2.5 rounded-[4px]">Out of Stock</div>}
                    </div>
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                className='flex justify-end items-center mt-6'
                pageLinkClassName='rounded p-[8px_12px] border border-[#EDEDED] m-1 cursor-pointer'
                nextLinkClassName='rounded p-[8px_12px] border border-[#EDEDED] m-2 cursor-pointer'
                previousLinkClassName='rounded p-[8px_12px] border border-[#EDEDED] m-2 cursor-pointer'
                activeLinkClassName='bg-linear-[75.04deg,#F4E8F3_0%,#F3EFF6_52.07%,#EEE0F9_102.02%]'
                forcePage={currentPage}
            />
        </div>
    </div>
}

export default ProductList;