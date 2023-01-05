import { ProductListType } from '../components/ProductList/ProductList.types';
import { SortType } from '../components/SotrPanel/SortPanel.styles';
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
    goods = 'goods',
    filter = 'filter',
    sort = 'sort',
}

interface IModelData {
    basket: IBasket;
    goods: IGoods;
    filter: IFilter;
    sort: ISort;
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

interface ISort {
    type: ProductListType;
    sort: SortType;
}

export {
    IModelProps,
    IAction,
    IActionType,
    IModelData,
    IBasket,
    IBasketProduct,
    IGoods,
    IFilter,
    ISort,
    ProductListType,
};
