import Observer from '../../Observer/Observer';

export interface ISortPanelProps {
    container: HTMLElement;
    observer: Observer;
    countProduct: number;
    sortType: SortType;
}

export enum SortType {
    priceASC = 'priceASC',
    priceDESC = 'priceDESC',
    ratingASC = 'ratingASC',
    ratingDESC = 'ratingDESC',
}
