import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBasketItemProps } from './BasketItem.types';
import './BasketItem.scss';
import { EventName } from '../../Observer/Observer.types';

class BasketItem {
    private container: HTMLElement;
    private observer: Observer;
    private number: number;
    private data: IBasketProduct;
    constructor({ container, observer, number, data }: IBasketItemProps) {
        this.container = container;
        this.observer = observer;
        this.number = number;
        this.data = data;
    }

    public render(): void {
        const basketItem = `<div class="basketItem">
        <div class="basketItem__id">${this.number + 1}</div>
        <div class="basketItem__main">
            <div class="basketItem__image-wrapper">
                <img class="basketItem__image" src="${this.data.images[0]}" />
            </div>
            <div class="basketItem__details">
                <div class="basketItem__title">${this.data.title}</div>
                <div class="basketItem__brand">${this.data.brand}</div>
                <div class="basketItem__description">${this.data.description}</div>
                <div class="basketItem__product-details">
                    <div class="basketItem__product-rating">Rating: ${this.data.rating}</div>
                </div>
            </div>
        </div>
        <div class="basketItem__totalPrice">${this.countTotalPrice()} $</div>
        <div class="basketItem__number-control">
            <div class="basketItem__product-stock">Stock: ${this.data.stock}</div>
            <div class="basketItem__product-stock">
                <button class="basketItem__increment button button--xs" data-id="${this.data.id}">+</button>
                <div class="basketItem__increment">${this.data.count}</div>
                <button class="basketItem__decrement button button--xs" data-id="${
                    this.data.id
                }" data-type="prev">-</button>
            </div>
        </div>
    </div>`;

        this.container.innerHTML += basketItem;

        const basketItemInc: NodeListOf<HTMLElement> = this.container.querySelectorAll('.basketItem__increment');
        const basketItemDec: NodeListOf<HTMLElement> = this.container.querySelectorAll('.basketItem__decrement');

        basketItemInc.forEach((element) => {
            element.addEventListener('click', (e: MouseEvent) => {
                this.observer.notify({ eventName: EventName.addGoods, eventPayload: e });
            });
        });

        basketItemDec.forEach((element) => {
            element.addEventListener('click', (e: MouseEvent) => {
                this.observer.notify({ eventName: EventName.removeGoods, eventPayload: e });
                const decButton = document.querySelectorAll('.basketItem__decrement');
                if (decButton.length === 0) {
                    this.observer.notify({ eventName: EventName.changeNavigationPage, eventPayload: e });
                }
            });
        });
    }

    private countTotalPrice(): number | undefined {
        if (!this.data.count) {
            return;
        }
        return this.data.price * this.data.count;
    }
}

export { BasketItem };
