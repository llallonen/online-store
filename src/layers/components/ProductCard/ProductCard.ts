import './ProductCard.scss';
import Observer from '../../Observer/Observer';
import { ProductPhotos } from '../ProductPhotos/ProductPhotos';
import { IProductCard } from './ProductCard.types';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { Button } from '../Button/Button';

class ProductCard {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductCard) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const productCard = document.createElement('section');
        productCard.classList.add('product');
        this.container.append(productCard);

        let productPhotos;
        let productInfo;
        let addButton;
        let buyNowButton;

        if (productCard instanceof HTMLElement) {
            productPhotos = new ProductPhotos({ container: productCard, observer: this.observer });
            productInfo = new ProductInfo({ container: productCard, observer: this.observer });
            addButton = new Button({
                container: productCard,
                observer: this.observer,
                typeButton: 'button--product',
                textButton: 'Add to cart',
            });

            buyNowButton = new Button({
                container: productCard,
                observer: this.observer,
                typeButton: 'button--product',
                textButton: 'Buy now',
            });
        }

        if (productPhotos) {
            productPhotos.render();
        }

        if (productInfo) {
            productInfo.render();
        }

        if (addButton) {
            addButton.render();
        }

        if (buyNowButton) {
            buyNowButton.render();
        }
    }
}

export { ProductCard };
