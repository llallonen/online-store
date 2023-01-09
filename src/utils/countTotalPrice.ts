import { IBasketProduct } from '../layers/Model/Model.types';

export const countTotalPrice = (products: IBasketProduct[]): number => {
    let totalPrice = 0;

    products.forEach((product) => {
        if (!product.count) {
            return;
        }
        const price = product.price * product.count;
        totalPrice += price;
    });

    return totalPrice;
};
