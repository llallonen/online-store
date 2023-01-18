import { SortType } from '../layers/components/SortPanel/SortPanel.types';
import { IBasketProduct } from '../layers/Model/Model.types';

export const sortProducts = (products: IBasketProduct[], sort: SortType): IBasketProduct[] => {
    if (sort === SortType.priceDESC) {
        return products.sort((a, b) => b.price - a.price);
    }

    if (sort === SortType.ratingASC) {
        return products.sort((a, b) => a.rating - b.rating);
    }

    if (sort === SortType.ratingDESC) {
        return products.sort((a, b) => b.rating - a.rating);
    }

    return products.sort((a, b) => a.price - b.price);
};
