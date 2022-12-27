import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBasketProps } from './basket.types';
import './basket.scss';
import { BasketList } from '../../components/BasketList/BasketList';
import { Button } from '../../components/Button/Button';
import { countTotalPrice } from '../../../utils/countTotalPrice';
import { countQuantityProducts } from '../../../utils/countQuantityProducts';
import { EventName } from '../../Observer/Observer.types';

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
                                <input class="basket__pagination-count" value=${this.data.basket.limit} />
                        </div>
                        <div class="basket__pagination-page">
                            <span class="basket__pagination-text">PAGE:</span>
                            <button class="basket__pagination-prev" data-type="prev"> &lt; </button>
                            <div class="basket__pagination-count">${this.data.basket.page}</div>
                            <button class="basket__pagination-next" data-type="next"> &gt; </button>
                        </div>
                    </div>
                </div>
                <div class="basket__items">
                </div>
            </div>
            <div class="basket__right">
                <h2 class="basket__header-title">Products In Cart</h2>
                <div class="basket__details-count">Products: ${this.countQuantityProducts()}</div>
                <div class="basket__details-total">Total: ${this.countTotalPrice()}$</div>
                <input class="basket__details-promo" type="text"/>
                <div class="basket__details-promo-text">Promo for test: 'RS', 'EPM'</div>
                <div class="basket__details-button"></div>
            </div>
        </div>`;

        this.container.innerHTML = basket;

        const itemsInput: HTMLElement | null = document.querySelector('.basket__pagination-count');

        if (itemsInput) {
            itemsInput.addEventListener('input', (e: Event) => {
                if (e.target instanceof HTMLInputElement) {
                    if (e.target.value) {
                        this.observer.notify({ eventName: EventName.changeItemsLimit, eventPayload: e });
                    }
                }
            });
        }

        const paginationButtonPrev = document.querySelector('.basket__pagination-prev');
        const paginationButtonNext = document.querySelector('.basket__pagination-next');

        if (paginationButtonPrev && paginationButtonNext) {
            paginationButtonPrev.addEventListener('click', (e) => {
                if (this.data.basket.page !== 1) {
                    this.observer.notify({ eventName: EventName.changeNavigationPage, eventPayload: e });
                }
            });
            paginationButtonNext.addEventListener('click', (e) => {
                if (this.data.basket.page < Math.ceil(this.data.basket.products.length / this.data.basket.limit)) {
                    this.observer.notify({ eventName: EventName.changeNavigationPage, eventPayload: e });
                }
            });
        }

        this.renderBasketList();
        this.renderBasketDetailsButton();
    }

    private renderBasketList() {
        const basketList = document.querySelector('.basket__items');
        if (basketList && basketList instanceof HTMLElement && this.data.basket.products.length > 0) {
            new BasketList({ container: basketList, observer: this.observer, basketData: this.data.basket }).render();
        } else {
            const basket = `<div class="basket__empty-header">
                <h1>Cart is Empty</h1>
            </div>`;
            this.container.innerHTML = basket;
        }
    }

    private renderBasketDetailsButton() {
        const basketDetailsButton: HTMLElement | null = document.querySelector('.basket__details-button');

        if (basketDetailsButton) {
            new Button({ container: basketDetailsButton, observer: this.observer }).render();
        }
    }

    private countTotalPrice() {
        return countTotalPrice(this.data.basket.products);
    }

    private countQuantityProducts() {
        return countQuantityProducts(this.data.basket.products);
    }
}

export { BasketPage };
