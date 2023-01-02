import { IBasketProduct, IFilter } from '../layers/Model/Model.types';

export const filterProducts = (filters: IFilter, products: IBasketProduct[]): IBasketProduct[] => {
    let filterProducts = [...products];

    if (filters.category.length !== 0) {
        const newFilterProducts: IBasketProduct[] = [];
        filters.category.forEach((categoryName) => {
            const categoryProducts = filterProducts.filter((product) => product.category === categoryName);
            newFilterProducts.push(...categoryProducts);
        });
        filterProducts = newFilterProducts;
    }

    if (filters.brand.length !== 0) {
        const newFilterProducts: IBasketProduct[] = [];
        filters.brand.forEach((brandName) => {
            const brandProducts = filterProducts.filter((product) => product.brand === brandName);
            newFilterProducts.push(...brandProducts);
        });
        filterProducts = newFilterProducts;
    }

    if (filters.price.length !== 0) {
        const newFilterProducts: IBasketProduct[] = [];
        const priceProducts = filterProducts.filter(
            (product) => product.price >= filters.price[0] && product.price <= filters.price[1]
        );
        newFilterProducts.push(...priceProducts);
        filterProducts = newFilterProducts;
    }

    if (filters.stock.length !== 0) {
        const newFilterProducts: IBasketProduct[] = [];
        const stockProducts = filterProducts.filter(
            (product) => product.stock >= filters.stock[0] && product.stock <= filters.stock[1]
        );
        newFilterProducts.push(...stockProducts);
        filterProducts = newFilterProducts;
    }

    return filterProducts;
};
