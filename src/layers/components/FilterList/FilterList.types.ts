import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

export interface IFilterListProps {
    container: HTMLElement;
    observer: Observer;
    allProducts: IBasketProduct[];
    filteredProducts: IBasketProduct[];
    title: string;
    type: IFilterListType;
}

export enum IFilterListType {
    category = 'category',
    brand = 'brand',
}
