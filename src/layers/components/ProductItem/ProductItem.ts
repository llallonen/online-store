import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IProductItemProps } from './ProductItem.types';
import './ProductItem.scss';
import { EventName } from '../../Observer/Observer.types';

class ProductItem {
    private container: HTMLElement;
    private observer: Observer;
    private product: IBasketProduct;
    private inBasket: boolean;
    constructor({ container, observer, product, inBasket }: IProductItemProps) {
        this.container = container;
        this.observer = observer;
        this.product = product;
        this.inBasket = inBasket;
    }

    public render() {
        const productList = document.createElement('div');
        productList.classList.add('ProductItem');
        productList.id = `ProductItem-${String(this.product.id)}`;

        const product = `
            <div class="ProductItem__name">${this.product.title}</div>
            <div class="ProductItem__info">
                <img class="ProductItem__image" src="${this.product.images[0]}" />
                <div class="ProductItem__description">
                    <ul class="ProductItem__list">
                        <li class="ProductItem__item">Category: ${this.product.category}</li>
                        <li class="ProductItem__item">Brand: ${this.product.brand}</li>
                        <li class="ProductItem__item">Price: ${this.product.price}$</li>
                        <li class="ProductItem__item">Discount: ${this.product.discountPercentage}%</li>
                        <li class="ProductItem__item">Rating: ${this.product.rating}</li>
                        <li class="ProductItem__item">Stock: ${this.product.stock}</li>
                    </ul>
                </div>
                <div class="ProductItem__buttons">
                <button class="ProductItem__button--add" data-id="${this.product.id}">
                    ${this.inBasket ? 'Drop from cart' : 'Add to cart'}
                </button>
                <button class="ProductItem__button--detail">Details</button>
                </div>
            </div>
        `;

        productList.innerHTML = product;

        this.container.append(productList);
        this.subscribe();
    }

    private subscribe() {
        const id = `#ProductItem-${String(this.product.id)}`;
        const item = this.container.querySelector(id);
        if (item) {
            const buttons = item.querySelectorAll('.ProductItem__button--detail');
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    window.location.hash = 'product';
                });
            });

            const buttonAdd = item.querySelectorAll('.ProductItem__button--add');
            buttonAdd.forEach((button) => {
                if (!this.inBasket) {
                    button.addEventListener('click', (e) => {
                        this.observer.notify({ eventName: EventName.addGoods, eventPayload: e });
                    });
                } else {
                    button.addEventListener('click', (e) => {
                        this.observer.notify({ eventName: EventName.removeGoods, eventPayload: e });
                    });
                }
            });
        }
    }
}

export { ProductItem };
