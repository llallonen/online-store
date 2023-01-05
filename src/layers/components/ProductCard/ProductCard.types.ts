import Observer from '../../Observer/Observer';
import { IModelData } from '../../Model/Model.types';

interface IProductCard {
    container: HTMLElement;
    observer: Observer;
    data: IModelData;
    currImg?: string;
}

export { IProductCard };
