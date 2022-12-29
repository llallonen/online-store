import { IBasketProduct } from '../layers/Model/Model.types';
import { countTotalPrice } from './countTotalPrice';
import { promo } from '../layers/pages/basket/promo/promo';
export const countTotalPriceWithPromo = (products: IBasketProduct[], dis: string[]): number => {
    let totalPriceWithDiscount = 0;
    let totalDiscount = 0;
    let discountPrice = 0;
    const totalPrice = countTotalPrice(products);

    dis.forEach((str) => {
        if (Object.keys(promo).includes(str)) {
            totalDiscount += 10;
        }
    });

    discountPrice = (totalPrice * totalDiscount) / 100;

    totalPriceWithDiscount = totalPrice - discountPrice;
    return totalPriceWithDiscount;
};
