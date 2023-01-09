import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

export interface ISortPanelProps {
    container: HTMLElement;
    observer: Observer;
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
