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
            <div class="ProductItemSmall__name">${this.product.title}</div>
                <img class="ProductItemSmall__image" src="${this.product.images[0]}" />
            </div>
            <div class="ProductItemSmall__description">
                <span class="ProductItemSmall__item">Category: <span>${this.product.category}</span></span>
                <span class="ProductItemSmall__item">Brand: <span>${this.product.brand}</span></span>
                <span class="ProductItemSmall__item">Price: <span>${this.product.price}$</span></span>
                <span class="ProductItemSmall__item">Discount: <span>${this.product.discountPercentage}%</span></span>
                <span class="ProductItemSmall__item">Rating: <span>${this.product.rating}</span></span>
                <span class="ProductItemSmall__item">Stock: <span>${this.product.stock}</span></span>
            </div>
            <div class="ProductItemSmall__buttons">
                <button class="ProductItemSmall__button--add button button--basic" data-id="${this.product.id}">
                    ${this.inBasket ? 'Drop from cart' : 'Add to cart'}
                </button>
                <button class="ProductItemSmall__button--detail button button--basic">Details</button>
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
