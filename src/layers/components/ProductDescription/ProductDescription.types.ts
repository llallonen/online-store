import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IProductDescription {
    container: HTMLElement;
    observer: Observer;
    product: IBasketProduct;
}

export { IProductDescription };
