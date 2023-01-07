import { IBasketProduct } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IProductItemSmallProps } from './ProductItemSmall.types';
import './ProductItemSmall.scss';
import { EventName } from '../../Observer/Observer.types';

class ProductItemSmall {
    private container: HTMLElement;
    private observer: Observer;
    private product: IBasketProduct;
    private inBasket: boolean;
    constructor({ container, observer, product, inBasket }: IProductItemSmallProps) {
        this.container = container;
        this.observer = observer;
        this.product = product;
        this.inBasket = inBasket;
    }

    public render() {
        const productList = document.createElement('div');
        productList.classList.add('ProductItemSmall');
        productList.id = `ProductItemSmall-${String(this.product.id)}`;

        const product = `
            <div class="ProductItemSmall__image-block">
                <img class="ProductItemSmall__image" src="${this.product.images[0]}" />
            </div>
            <div class="ProductItemSmall__description">
                <span class="ProductItemSmall__item">Category: ${this.product.category}</span>
                <span class="ProductItemSmall__item">Brand: ${this.product.brand}</span>
                <span class="ProductItemSmall__item">Price: ${this.product.price}$</span>
                <span class="ProductItemSmall__item">Discount: ${this.product.discountPercentage}%</span>
                <span class="ProductItemSmall__item">Rating: ${this.product.rating}</span>
                <span class="ProductItemSmall__item">Stock: ${this.product.stock}</span>
            </div>
            <div class="ProductItemSmall__buttons">
                <button class="ProductItemSmall__button--add" data-id="${this.product.id}">
                    ${this.inBasket ? 'Drop from cart' : 'Add to cart'}
                </button>
                <button class="ProductItemSmall__button--detail">Details</button>
            </div>
        `;

        productList.innerHTML = product;

        this.container.append(productList);
        this.subscribe();
    }

    private subscribe() {
        const id = `#ProductItemSmall-${String(this.product.id)}`;
        const item = this.container.querySelector(id);
        if (item) {
            const buttonDetail = item.querySelectorAll('.ProductItemSmall__button--detail');
            buttonDetail.forEach((button) => {
                button.addEventListener('click', () => {
                    window.location.hash = `product?id=${this.product.id}`;
                });
            });

            const buttonAdd = item.querySelectorAll('.ProductItemSmall__button--add');
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

export { ProductItemSmall };
