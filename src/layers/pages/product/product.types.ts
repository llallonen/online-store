import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IProductProps {
    container: HTMLElement;
    observer: Observer;
    data: IModelData;
}

export { IProductProps };
