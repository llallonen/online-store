import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBasketProps } from './basket.types';
import './basket.scss';
import { BasketList } from '../../components/BasketList/BasketList';

class BasketPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;

    constructor({ container, observer, data }: IBasketProps) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const basket = `<div class="basket">
            <div class="basket__left">
                <div class="basket__header">
                    <h1 class="basket__header-title">Products In Cart</h1>
                    <div class="basket__pagination">
                        <div class="basket__pagination-items">
                            <span class="basket__pagination-text">ITEMS:</span>
                            <div class="basket__pagination-count">1</div>
                        </div>
                        <div class="basket__pagination-page">
                            <span class="basket__pagination-text">PAGE:</span>
                            <div class="basket__pagination-count">1</div>
                        </div>
                    </div>
                </div>
                <div class="basket__items">
                </div>
            </div>
            <div class="basket__right">
            </div>
        </div>`;

        this.container.innerHTML = basket;

        const basketList = document.querySelector('.basket__items');
        if (basketList && basketList instanceof HTMLElement) {
            new BasketList({ container: basketList, observer: this.observer, basketData: this.data.basket }).render();
        }
    }
}

export { BasketPage };
