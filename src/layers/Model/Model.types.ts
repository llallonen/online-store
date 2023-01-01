import Observer from '../Observer/Observer';

interface IModelProps {
    observer: Observer;
}

interface IAction {
    type: IActionType;
    payload: IBasket | IGoods | IFilter;
}

enum IActionType {
    basket = 'basket',
    goods = 'goods',
    filter = 'filter',
}

interface IModelData {
    basket: IBasket;
    goods: IGoods;
    filter: IFilter;
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

interface IFilter {
    category: string[];
    brand: string[];
    price: number[];
    stock: number[];
}

export { IModelProps, IAction, IActionType, IModelData, IBasket, IBasketProduct, IGoods, IFilter };
