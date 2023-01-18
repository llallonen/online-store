import { IBasketProduct, ICommonProps } from '../../Model/Model.types';

export interface IProductItemSmallProps extends ICommonProps {
    product: IBasketProduct;
    inBasket: boolean;
}
