import { IBasketProduct, IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

interface IBreadcrumbs {
    container: HTMLElement;
    observer: Observer;
    breadData: IModelData;
    product: IBasketProduct;
}

export { IBreadcrumbs };
