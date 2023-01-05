import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IBreadcrumbs {
    container: HTMLElement;
    observer: Observer;
    breadData: IModelData;
}

export { IBreadcrumbs };
