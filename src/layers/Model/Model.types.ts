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
}

interface IBasket {
    products: IProduct[];
    page: number;
    limit: number;
}

interface IProduct {
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
    count: number;
}

export { IModelProps, IAction, IActionType, IModelData, IBasket, IProduct };
