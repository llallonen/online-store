import { IProduct } from '../layers/Model/Model.types';

export const countTotalPrice = (products: IProduct[]) => {
    let totalPrice = 0;

    products.forEach((product) => {
        const price = product.price * product.count;
        totalPrice += price;
    });

    return totalPrice;
};
