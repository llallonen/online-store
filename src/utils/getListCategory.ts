import { IAllProducts } from '../layers/components/FilterItem/FilterItem.types';
import { IBasketProduct } from '../layers/Model/Model.types';

export const getListCategory = (products: IBasketProduct[]): IAllProducts[] => {
    const list: IAllProducts[] = [];
    products.forEach((product, i, arr) => {
        if (list.filter((el) => el.name === product.category).length === 0) {
            const count = arr.filter((el) => el.category === product.category).length;
            const item = { name: product.category, count: count };
            list.push(item);
        }
    });
    return list;
};
