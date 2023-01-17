import { ICommonProps, IModelData } from '../../Model/Model.types';

interface IProductPhotos extends ICommonProps {
    currImg?: string;
    data: IModelData;
}

export { IProductPhotos };
