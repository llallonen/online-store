import { IBasketProduct, IGoods } from '../layers/Model/Model.types';

export const addGoodToBasket = (products: IBasketProduct[], id: number, data: IGoods): IBasketProduct[] => {
    const productInBasket = products.find((product) => product.id === id);

    if (productInBasket) {
        if (productInBasket.count && productInBasket.stock >= productInBasket.count + 1) {
            productInBasket.count += 1;
        }

        return [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id);
    } else {
        const product = data.products.find((product) => product.id === id);
        if (product) {
            product.count = 1;

            return [...products, product].sort((a, b) => a.id - b.id);
        } else {
            return [...products];
        }
    }
};

export const removeGoodToBasket = (products: IBasketProduct[], id: number): IBasketProduct[] => {
    const productInBasket = products.find((product) => product.id === id);
    if (productInBasket) {
        if (productInBasket.count && productInBasket.count - 1 > 0) {
            productInBasket.count -= 1;

            return [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id);
        } else {
            return [...products.filter((product) => product.id !== id)];
        }
    } else {
        return [...products];
    }
};
