import { IAllProducts } from '../layers/components/FilterItem/FilterItem.types';
import { IBasketProduct } from '../layers/Model/Model.types';

export const getListBrand = (products: IBasketProduct[]): IAllProducts[] => {
    const list: IAllProducts[] = [];
    products.forEach((product, i, arr) => {
        if (list.filter((el) => el.name === product.brand).length === 0) {
            const count = arr.filter((el) => el.brand === product.brand).length;
            const item = { name: product.brand, count: count };
            list.push(item);
        }
    });
    return list;
};
