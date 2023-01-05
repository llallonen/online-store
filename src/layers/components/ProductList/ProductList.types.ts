import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

export interface IProductListProps {
    type: ProductListType;
    products: IBasketProduct[];
    container: HTMLElement;
    observer: Observer;
    basket: IBasketProduct[];
}

export enum ProductListType {
    big = 'big',
    small = 'small',
}
