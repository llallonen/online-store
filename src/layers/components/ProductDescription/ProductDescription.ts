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
        const productDescription = document.createElement('ul');
        productDescription.classList.add('product__description');
        this.container.append(productDescription);

        const productDescriptionItems = data.products[1];

        function genForObj<T>(t: T) {
            for (const k in t) {
                const fields = ['title', 'description', 'price', 'stock', 'color', 'brand'];
                if (fields.includes(k)) {
                    const productDescriptionItem = document.createElement('li');
                    productDescriptionItem.classList.add('product__info-item');
                    productDescriptionItem.textContent = `${k} - ${t[k]}`;
                    productDescription.append(productDescriptionItem);
                }
            }
        }

        genForObj(productDescriptionItems);
    }
}

export { ProductDescription };
