import Observer from '../../Observer/Observer';
import data from '../../../data.json';
import { IProductInfo } from './ProductInfo.types';
import './ProductInfo.scss';

class ProductInfo {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductInfo) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const productInfo = document.createElement('ul');
        productInfo.classList.add('product__info');
        this.container.append(productInfo);

        const productInfoItems = data.products[1];

        function genForObj<T>(t: T) {
            for (const k in t) {
                const fields = ['title', 'description', 'price', 'stock', 'color', 'brand'];
                if (fields.includes(k)) {
                    console.log(`${k} - ${t[k]}`);

                    const productInfoItem = document.createElement('li');
                    productInfoItem.classList.add('product__info-item');
                    productInfoItem.textContent = `${k} - ${t[k]}`;
                    productInfo.append(productInfoItem);
                }
            }
        }

        genForObj(productInfoItems);
    }
}

export { ProductInfo };
