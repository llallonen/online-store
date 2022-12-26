import { IBasket } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IBasketListProps {
    container: HTMLElement;
    observer: Observer;
    basketData: IBasket;
}

export { IBasketListProps };
