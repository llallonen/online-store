import { IBasketProduct } from '../layers/Model/Model.types';

export const countQuantityProducts = (products: IBasketProduct[]): number => {
    let totalProducts = 0;

    products.forEach((product) => {
        if (!product.count) {
            return;
        }
        totalProducts += product.count;
    });

    return totalProducts;
};
