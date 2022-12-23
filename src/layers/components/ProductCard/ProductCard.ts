import Observer from '../../Observer/Observer';
import { ProductPhotos } from '../ProductPhotos/ProductPhotos';
import { IProductCard } from './ProductCard.types';
import './ProductCard.scss';

class ProductCard {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductCard) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const productCard = document.createElement('section');
        productCard.classList.add('product-card');
        this.container.append(productCard);

        let productPhotos;

        if (productCard instanceof HTMLElement) {
            productPhotos = new ProductPhotos({ container: productCard, observer: this.observer });
        }
        if (productPhotos) {
            productPhotos.render();
        }
    }
}

export { ProductCard };
