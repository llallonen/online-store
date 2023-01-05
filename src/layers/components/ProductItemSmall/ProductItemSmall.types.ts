import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

export interface IProductItemSmallProps {
    product: IBasketProduct;
    container: HTMLElement;
    observer: Observer;
    inBasket: boolean;
}
