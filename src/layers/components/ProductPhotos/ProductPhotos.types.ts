import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IProductPhotos {
    container: HTMLElement;
    observer: Observer;
    currImg?: string;
    data: IModelData;
}

export { IProductPhotos };
