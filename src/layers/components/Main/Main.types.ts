import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IMain {
    container: HTMLElement;
    observer: Observer;
    data: IModelData;
}

export { IMain };
