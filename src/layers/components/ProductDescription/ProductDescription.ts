import { IProductDescription } from './ProductDescription.types';
import './ProductDescription.scss';
import { IBasketProduct } from '../../Model/Model.types';

class ProductDescription {
    private container: HTMLElement;
    private product: IBasketProduct;

    constructor({ container, product }: IProductDescription) {
        this.container = container;
        this.product = product;
    }

    public render(): void {
        const productDescription = document.createElement('div');
        productDescription.classList.add('product__description');
        this.container.prepend(productDescription);

        const productDescriptionList = document.createElement('ul');
        productDescriptionList.classList.add('product__description-list');
        productDescription.append(productDescriptionList);

        function generateDescription(product: IBasketProduct) {
            for (const property in product) {
                const fields = ['title', 'description', 'price', 'stock', 'color', 'brand'];
                if (fields.includes(property)) {
                    const field = `${property}`;
                    const productDescriptionItem = document.createElement('li');
                    productDescriptionItem.classList.add('product__info-item');

                    switch (field) {
                        case 'title':
                            productDescriptionItem.innerHTML = `<div class="product__info-head">${product[property]}</div>`;
                            break;
                        case 'price':
                            productDescriptionItem.innerHTML = `<div>${product[property]}$</div>`;
                            break;
                        case 'stock':
                            productDescriptionItem.innerHTML = `<div>${product[property]} in stock</div>`;
                            break;
                        case 'brand':
                            productDescriptionItem.innerHTML = `<div class="product__info-brand">${product[property]}</div>`;
                            break;
                        default:
                            productDescriptionItem.innerHTML = `${product[property]}`;
                    }

                    productDescriptionList.append(productDescriptionItem);
                }
            }
        }
        generateDescription(this.product);
    }
}

export { ProductDescription };
