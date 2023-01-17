import { ICommonProps, IModelData } from '../../Model/Model.types';

export interface ISortPanelProps extends ICommonProps {
    countProduct: number;
    sortType: SortType;
    data: IModelData;
}

export enum SortType {
    priceASC = 'priceASC',
    priceDESC = 'priceDESC',
    ratingASC = 'ratingASC',
    ratingDESC = 'ratingDESC',
}
