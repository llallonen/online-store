import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IProductItemProps } from './ProductItem.types';
import './ProductItem.scss';
import { EventName } from '../../Observer/Observer.types';
import { createElement } from '../../../utils/createElement';

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

    public render(): void {
        const productList = createElement('div', 'ProductItem');
        productList.id = `ProductItem-${String(this.product.id)}`;

        const product = `
            <div class="ProductItem__name">${this.product.title}</div>
            <div class="ProductItem__info">
                <img class="ProductItem__image" src="${this.product.images[0]}" />
                <div class="ProductItem__description">
                    <ul class="ProductItem__list">
                        <li class="ProductItem__item">Category: <span>${this.product.category}</span></li>
                        <li class="ProductItem__item">Brand: <span>${this.product.brand}</span></li>
                        <li class="ProductItem__item">Price: <span>${this.product.price}$</span></li>
                        <li class="ProductItem__item">Discount: <span>${this.product.discountPercentage}%</span></li>
                        <li class="ProductItem__item">Rating: <span>${this.product.rating}</span></li>
                        <li class="ProductItem__item">Stock: <span>${this.product.stock}</span></li>
                    </ul>
                </div>
                <div class="ProductItem__buttons">
                <button class="ProductItem__button--add button button--small" data-id="${this.product.id}">
                    ${this.inBasket ? 'Drop from cart' : 'Add to cart'}
                </button>
                <button class="ProductItem__button--detail button button--small" data-id-product="${
                    this.product.id
                }">Details</button>
                </div>
            </div>
        `;

        productList.innerHTML = product;

        this.container.append(productList);
        this.subscribe();
    }

    private subscribe(): void {
        const id = `#ProductItem-${String(this.product.id)}`;
        const item = this.container.querySelector(id);
        if (item) {
            const buttons = item.querySelectorAll('.ProductItem__button--detail');
            buttons.forEach((button) => {
                button.addEventListener('click', (e: Event) => {
                    this.observer.notify({ eventName: EventName.setCurrentProduct, eventPayload: e });
                    window.location.hash = `product?id=${this.product.id}`;
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
