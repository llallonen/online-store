import { ICommonProps, IModelData } from '../../Model/Model.types';

interface IProductCard extends ICommonProps {
    data: IModelData;
    currImg?: string;
}

export { IProductCard };
