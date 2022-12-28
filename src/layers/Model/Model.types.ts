import Observer from '../Observer/Observer';

interface IModelProps {
    observer: Observer;
}

interface IAction {
    type: IActionType;
    payload: IBasket;
}

enum IActionType {
    basket = 'basket',
}

interface IModelData {
    basket: IBasket;
    goods: IGoods;
}

interface IBasket {
    products: IBasketProduct[];
    page: number;
    limit: number;
    promo: string[];
}

interface IBasketProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    color: string;
    size: string;
    stock: number;
    brand: string;
    category: string;
    images: string[];
    count?: number;
}

interface IGoods {
    products: IBasketProduct[];
}

export { IModelProps, IAction, IActionType, IModelData, IBasket, IBasketProduct, IGoods };
