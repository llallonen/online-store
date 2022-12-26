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
        const basketItem = `<div class="cartItem">
            <div class="cartItem__id">${this.number + 1}</div>
            <img class="cartItem__image" src=${this.data.images[0]} />
            <div class="cartItem__details">
                <div class="cartItem__title">${this.data.title}</div>
                <div class="cartItem__description">${this.data.description}</div>
                <div class="cartItem__product-details">
                    <div class="cartItem__product-rating">Rating: ${this.data.rating}</div>
                    <div class="cartItem__product-discount">Discount: ${this.data.discountPercentage}</div>
                </div>
            </div>
            <div class="cartItem__number-control">
                <div class="cartItem__product-stock"> Stock: ${this.data.stock}</div>
                <div class="cartItem__product-stock">
                    <button class="cartItem__increment">+</button> 
                    <div class="cartItem__increment">${this.data.count}</div>
                    <button class="cartItem__decrement">-</button>
                </div>
                <div class="cartItem__totalPrice">${this.countTotalPrice()}</div>
            </div>
        </div>`;

        this.container.innerHTML += basketItem;
    }

    private countTotalPrice() {
        return this.data.price * this.data.count;
    }
}

export { BasketItem };
