import { IBasketProduct } from '../layers/Model/Model.types';
import { IMaxMin } from './getMaxMinPrice';

export const getMaxMinStock = (products: IBasketProduct[]): IMaxMin => {
    const maxMinStock = { max: 0, min: 0 };
    products.forEach((product, i) => {
        if (i === 0) {
            maxMinStock.max = product.stock;
            maxMinStock.min = product.stock;
        }
        if (product.stock > maxMinStock.max) {
            maxMinStock.max = product.stock;
        }
        if (product.stock < maxMinStock.min) {
            maxMinStock.min = product.stock;
        }
    });
    return maxMinStock;
};
export { IMaxMin };
