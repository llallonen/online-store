import { IProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBasketItemProps } from './BasketItem.types';
import './BasketItem.scss';

class BasketItem {
    private container: HTMLElement;
    private observer: Observer;
    private number: number;
    private data: IProduct;
    constructor({ container, observer, number, data }: IBasketItemProps) {
        this.container = container;
        this.observer = observer;
        this.number = number;
        this.data = data;
    }

    public render() {
        const basketItem = `<div class="basketItem">
            <div class="basketItem__id">${this.number + 1}</div>
            <img class="basketItem__image" src=${this.data.images[0]} />
            <div class="basketItem__details">
                <div class="basketItem__title">${this.data.title}</div>
                <div class="basketItem__description">${this.data.description}</div>
                <div class="basketItem__product-details">
                    <div class="basketItem__product-rating">Rating: ${this.data.rating}</div>
                    <div class="basketItem__product-discount">Discount: ${this.data.discountPercentage}</div>
                </div>
            </div>
            <div class="basketItem__number-control">
                <div class="basketItem__product-stock"> Stock: ${this.data.stock}</div>
                <div class="basketItem__product-stock">
                    <button class="basketItem__increment">+</button> 
                    <div class="basketItem__increment">${this.data.count}</div>
                    <button class="basketItem__decrement">-</button>
                </div>
                <div class="basketItem__totalPrice">${this.countTotalPrice()}</div>
            </div>
        </div>`;

        this.container.innerHTML += basketItem;

        // const basketItemInc: HTMLElement | null = this.container.querySelector('.basketItem__increment');
        // const basketItemDec = this.container.querySelector('.basketItem__decrement');
    }

    private countTotalPrice() {
        return this.data.price * this.data.count;
    }
}

export { BasketItem };
