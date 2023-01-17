import { ProductListType } from '../components/ProductList/ProductList.types';
import { SortType } from '../components/SortPanel/SortPanel.types';
import Observer from '../Observer/Observer';

interface IModelProps {
    observer: Observer;
}

interface IAction {
    type: IActionType;
    payload: IBasket;
}

enum IActionType {
    currImg = 'currImg',
    currProduct = 'currProduct',
    basket = 'basket',
    goods = 'goods',
    filter = 'filter',
    sort = 'sort',
}

interface IModelData {
    currImg?: string;
    currProduct: IBasketProduct;
    basket: IBasket;
    goods: IGoods;
    filter: IFilter;
    sort: ISort;
    isModalOpen: boolean;
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
    [key: string]: string | number | string[] | undefined;
}

interface IGoods {
    products: IBasketProduct[];
}

interface IFilter {
    category: string[];
    brands: string[];
    price: number[];
    stock: number[];
    search: string[];
}

interface ISort {
    type: ProductListType;
    sort: SortType;
}

type TValidationError = { errorText: string; errorNode: HTMLInputElement };

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
    TValidationError,
};
