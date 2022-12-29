import { IBasketProduct, IGoods } from '../layers/Model/Model.types';

export const addGoodToBasket = (products: IBasketProduct[], id: number, data: IGoods): IBasketProduct[] => {
    const productInBasket = products.find((product) => product.id === id);

    if (productInBasket) {
        if (productInBasket.count && productInBasket.stock >= productInBasket.count + 1) {
            productInBasket.count += 1;
        }
        console.log(
            'a1',
            [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id)
        );
        return [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id);
    } else {
        const product = data.products.find((product) => product.id === id);
        if (product) {
            product.count = 1;
            console.log(
                'a2',
                [...products, product].sort((a, b) => a.id - b.id)
            );
            return [...products, product].sort((a, b) => a.id - b.id);
        } else {
            console.log('a3', products);
            return [...products];
        }
    }
};

export const removeGoodToBasket = (products: IBasketProduct[], id: number): IBasketProduct[] => {
    const productInBasket = products.find((product) => product.id === id);
    if (productInBasket) {
        if (productInBasket.count && productInBasket.count - 1 > 0) {
            productInBasket.count -= 1;
            console.log(
                's1',
                [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id)
            );
            return [...products.filter((product) => product.id !== id), productInBasket].sort((a, b) => a.id - b.id);
        } else {
            console.log('s2', [...products.filter((product) => product.id !== id)]);
            return [...products.filter((product) => product.id !== id)];
        }
    } else {
        console.log('s3', [...products]);
        return [...products];
    }
};
