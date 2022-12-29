import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IBasketItemProps {
    container: HTMLElement;
    observer: Observer;
    number: number;
    data: IBasketProduct;
}

export { IBasketItemProps };
