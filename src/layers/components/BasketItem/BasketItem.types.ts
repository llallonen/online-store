import { IBasketProduct, ICommonProps } from '../../Model/Model.types';

interface IBasketItemProps extends ICommonProps {
    number: number;
    data: IBasketProduct;
}

export { IBasketItemProps };
