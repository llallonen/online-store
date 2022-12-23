import Observer from '../../Observer/Observer';
import data from '../../../data.json';
import { IProductPhotos } from './ProductPhotos.types';
import './ProductPhotos.scss';

class ProductPhotos {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductPhotos) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const productPhotos = document.createElement('div');
        productPhotos.classList.add('product__photos');
        this.container.append(productPhotos);

        const productSlider = document.createElement('div');
        productSlider.classList.add('product__slider');
        productPhotos.append(productSlider);

        const productSlides = data.products[1].images;
        productSlides.map((item) => {
            const slide = document.createElement('img');
            slide.classList.add('product__slide');
            slide.src = `${item}`;
            productSlider.append(slide);
        });

        const productThumbnail = document.createElement('img');
        productThumbnail.classList.add('product__thumbnail');
        productThumbnail.src = `${data.products[1].images[0]}`;
        productPhotos.append(productThumbnail);
    }
}

export { ProductPhotos };
