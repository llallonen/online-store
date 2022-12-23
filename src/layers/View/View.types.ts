import { IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';

interface IViewProps {
    container: HTMLElement;
    observer: Observer;
    data: IModelData;
}

export { IViewProps };
