import Observer from '../../Observer/Observer';
// import data from '../../../data.json';
import { IProductDescription } from './ProductDescription.types';
import './ProductDescription.scss';
import { IBasketProduct } from '../../Model/Model.types';

class ProductDescription {
    private container: HTMLElement;
    private observer: Observer;
    private product: IBasketProduct;

    constructor({ container, observer, product }: IProductDescription) {
        this.container = container;
        this.observer = observer;
        this.product = product;
    }

    public render(): void {
        const productDescription = document.createElement('div');
        productDescription.classList.add('product__description');
        this.container.prepend(productDescription);

        const productDescriptionList = document.createElement('ul');
        productDescriptionList.classList.add('product__description-list');
        productDescription.append(productDescriptionList);
        // const productDescriptionItems = data.products[1];

        function genForObj<T>(t: T) {
            for (const k in t) {
                const fields = ['title', 'description', 'price', 'stock', 'color', 'brand'];
                if (fields.includes(k)) {
                    const field = `${k}`;
                    const productDescriptionItem = document.createElement('li');
                    productDescriptionItem.classList.add('product__info-item');

                    switch (field) {
                        case 'title':
                            productDescriptionItem.innerHTML = `<div class="product__info-head">${t[k]}</div>`;
                            break;
                        case 'price':
                            productDescriptionItem.innerHTML = `<div>${t[k]}$</div>`;
                            break;
                        case 'stock':
                            productDescriptionItem.innerHTML = `<div>${t[k]} in stock</div>`;
                            break;
                        case 'brand':
                            productDescriptionItem.innerHTML = `<div class="product__info-brand">${t[k]}</div>`;
                            break;
                        default:
                            productDescriptionItem.innerHTML = `${t[k]}`;
                    }

                    productDescriptionList.append(productDescriptionItem);
                }
            }
        }
        genForObj(this.product);
    }
}

export { ProductDescription };
