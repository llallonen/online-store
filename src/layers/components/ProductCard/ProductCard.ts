import './ProductCard.scss';
import Observer from '../../Observer/Observer';
import { ProductPhotos } from '../ProductPhotos/ProductPhotos';
import { IProductCard } from './ProductCard.types';
import { Button } from '../Button/Button';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { IModelData } from '../../Model/Model.types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

class ProductCard {
    private container: HTMLElement;
    private observer: Observer;
    private currImg?: string;
    private data: IModelData;

    constructor({ container, observer, data, currImg }: IProductCard) {
        this.container = container;
        this.observer = observer;
        this.data = data;
        this.currImg = currImg;
    }

    public render() {
        const product = `${this.data.currProduct.category}`;
        console.log(product);

        const productCard = document.createElement('section');
        productCard.classList.add('product');
        this.container.append(productCard);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product__info');
        productCard.append(productInfo);

        let productPhotos;
        let productDescription;
        let addButton;
        let buyNowButton;

        if (productCard instanceof HTMLElement) {
            productPhotos = new ProductPhotos({
                container: productCard,
                observer: this.observer,
                currImg: this.currImg,
                data: this.data,
            });
            productDescription = new ProductDescription({ container: productInfo, observer: this.observer });

            const productBtns = document.createElement('div');
            productBtns.classList.add('product__btns');
            productInfo.append(productBtns);

            addButton = new Button({
                container: productBtns,
                observer: this.observer,
                typeButton: 'button--product',
                textButton: 'Add to cart',
            });

            buyNowButton = new Button({
                container: productBtns,
                observer: this.observer,
                typeButton: 'button--product',
                textButton: 'Buy now',
            });
        }
        if (productCard) {
            new Breadcrumbs({ container: productCard, observer: this.observer, breadData: this.data }).render();
        }
        if (productDescription) {
            productDescription.render();
        }
        if (productPhotos) {
            productPhotos.render();
            productPhotos.renderThumbnail();
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
