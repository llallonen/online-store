import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IBasketProps {
    container: HTMLElement;
    observer: Observer;
    data: IModelData;
}

export { IBasketProps };
