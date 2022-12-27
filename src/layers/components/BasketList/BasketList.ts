import { IBasket } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { BasketItem } from '../BasketItem/BasketItem';
import { IBasketListProps } from './BasketList.types';

class BasketList {
    private container: HTMLElement;
    private observer: Observer;
    private basketData: IBasket;
    constructor({ container, observer, basketData }: IBasketListProps) {
        this.container = container;
        this.observer = observer;
        this.basketData = basketData;
    }

    public render() {
        const fromIterate = (this.basketData.page - 1) * this.basketData.limit;
        this.basketData.products.forEach((product, i) => {
            if (i >= fromIterate && i < this.basketData.page * this.basketData.limit) {
                new BasketItem({
                    container: this.container,
                    data: product,
                    number: i,
                    observer: this.observer,
                }).render();
            }
        });
    }
}

export { BasketList };
