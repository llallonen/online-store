import { IBasketProduct, ICommonProps, IModelData } from '../../Model/Model.types';

interface IBreadcrumbs extends ICommonProps {
    breadData: IModelData;
    product: IBasketProduct;
}

export { IBreadcrumbs };
