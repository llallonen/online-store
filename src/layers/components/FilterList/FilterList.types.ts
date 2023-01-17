import { IBasketProduct, ICommonProps, IFilter } from '../../Model/Model.types';

export interface IFilterListProps extends ICommonProps {
    allProducts: IBasketProduct[];
    filteredProducts: IBasketProduct[];
    title: string;
    type: IFilterListType;
    filter: IFilter;
}

export enum IFilterListType {
    category = 'category',
    brand = 'brand',
}
