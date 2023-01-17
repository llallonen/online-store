import { IBasketProduct, ICommonProps } from '../../Model/Model.types';

export interface IProductItemProps extends ICommonProps {
    product: IBasketProduct;
    inBasket: boolean;
}
