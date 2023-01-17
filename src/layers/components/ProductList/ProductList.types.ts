import { IBasketProduct, ICommonProps } from '../../Model/Model.types';

export interface IProductListProps extends ICommonProps {
    type: ProductListType;
    products: IBasketProduct[];
    basket: IBasketProduct[];
}

export enum ProductListType {
    big = 'big',
    small = 'small',
}
