import './ProductCard.scss';
import Observer from '../../Observer/Observer';
import { ProductPhotos } from '../ProductPhotos/ProductPhotos';
import { IProductCard } from './ProductCard.types';
import { Button } from '../Button/Button';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { IModelData } from '../../Model/Model.types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { EventName } from '../../Observer/Observer.types';

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
        // const product = `${this.data.currProduct.category}`;
        // console.log(product);

        const productCard = document.createElement('section');
        productCard.classList.add('product');
        this.container.append(productCard);

        const productData = this.data.goods.products.find((el) => el.id === this.data.currProduct.id);

        if (productData) {
            const productInfo = document.createElement('div');
            productInfo.classList.add('product__info');
            productCard.append(productInfo);

            let productPhotos;
            let productDescription;
            let addButton;
            let buyNowButton;
            let removeButton;

            if (productCard instanceof HTMLElement) {
                if (productData) {
                    productPhotos = new ProductPhotos({
                        container: productCard,
                        observer: this.observer,
                        currImg: this.currImg,
                        data: this.data,
                    });

                    productDescription = new ProductDescription({
                        container: productInfo,
                        observer: this.observer,
                        product: productData,
                    });
                }

                const productBtns = document.createElement('div');
                productBtns.classList.add('product__btns');
                productInfo.append(productBtns);

                if (this.data.basket.products.find((el) => el.id === this.data.currProduct.id)) {
                    removeButton = new Button({
                        container: productBtns,
                        observer: this.observer,
                        typeButton: 'button--product',
                        textButton: 'Drop from cart',
                        id: this.data.currProduct.id,
                        event: EventName.removeGoods,
                    });
                } else {
                    addButton = new Button({
                        container: productBtns,
                        observer: this.observer,
                        typeButton: 'button--product',
                        textButton: 'Add to cart',
                        id: this.data.currProduct.id,
                        event: EventName.addGoods,
                    });
                }
                buyNowButton = new Button({
                    container: productBtns,
                    observer: this.observer,
                    typeButton: 'button--product',
                    textButton: 'Buy now',
                });
            }
            if (productCard && productData) {
                new Breadcrumbs({
                    container: productCard,
                    observer: this.observer,
                    breadData: this.data,
                    product: productData,
                }).render();
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
            if (removeButton) {
                removeButton.render();
            }
            if (buyNowButton) {
                buyNowButton.render();
            }
        } else {
            const header = document.createElement('h2');
            header.textContent = 'Product not found';
            productCard.append(header);
        }
    }
}

export { ProductCard };
