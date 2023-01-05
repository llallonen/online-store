import { IBasketProduct } from '../layers/Model/Model.types';

export interface IMaxMin {
    max: number;
    min: number;
}

export const getMaxMinPrice = (products: IBasketProduct[]): IMaxMin => {
    const maxMinPrice = { max: 0, min: 0 };
    products.forEach((product, i) => {
        if (i === 0) {
            maxMinPrice.max = product.price;
            maxMinPrice.min = product.price;
        }
        if (product.price > maxMinPrice.max) {
            maxMinPrice.max = product.price;
        }
        if (product.price < maxMinPrice.min) {
            maxMinPrice.min = product.price;
        }
    });
    return maxMinPrice;
};
