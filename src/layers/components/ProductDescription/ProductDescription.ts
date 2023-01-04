import Observer from '../../Observer/Observer';
import data from '../../../data.json';
import { IProductDescription } from './ProductDescription.types';
import './ProductDescription.scss';

class ProductDescription {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductDescription) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const productDescription = document.createElement('div');
        productDescription.classList.add('product__description');
        this.container.prepend(productDescription);

        const productDescriptionList = document.createElement('ul');
        productDescriptionList.classList.add('product__description-list');
        productDescription.append(productDescriptionList);

        const productDescriptionItems = data.products[1];

        function genForObj<T>(t: T) {
            for (const k in t) {
                const fields = ['title', 'description', 'price', 'stock', 'color', 'brand'];
                if (fields.includes(k)) {
                    const field = `${k}`;
                    const productDescriptionItem = document.createElement('li');
                    productDescriptionItem.classList.add('product__info-item');

                    const productDescriptionTop = document.createElement('div');
                    productDescriptionTop.classList.add('product__info-top');
                    productDescriptionTop.textContent = field;
                    productDescriptionItem.append(productDescriptionTop);

                    const productDescriptionBottom = document.createElement('div');
                    productDescriptionBottom.classList.add('product__info-bottom');
                    productDescriptionBottom.textContent = `${t[k]}`;
                    productDescriptionItem.append(productDescriptionBottom);

                    productDescriptionList.append(productDescriptionItem);
                }
            }
        }
        genForObj(productDescriptionItems);
    }
}

export { ProductDescription };
