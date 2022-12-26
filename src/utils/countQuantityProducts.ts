import { IProduct } from '../layers/Model/Model.types';

export const countQuantityProducts = (products: IProduct[]) => {
    let totalProducts = 0;

    products.forEach((product) => {
        totalProducts += product.count;
    });

    return totalProducts;
};
