import Observer from '../../Observer/Observer';
import data from '../../../data.json';
import { IProductPhotos } from './ProductPhotos.types';
import './ProductPhotos.scss';
import { EventName } from '../../Observer/Observer.types';
import Drift from 'drift-zoom';

class ProductPhotos {
    private container: HTMLElement;
    private observer: Observer;
    private currImg?: string;

    constructor({ container, observer, currImg }: IProductPhotos) {
        this.container = container;
        this.observer = observer;
        this.currImg = currImg;
    }

    public render() {
        const productPhotos = document.createElement('div');
        productPhotos.classList.add('product__photos');
        this.container.prepend(productPhotos);

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

        productSlides.forEach(() => {
            const slides = document.querySelectorAll('.product__slide');

            slides.forEach((slide) => {
                slide.addEventListener('click', (e: Event) => {
                    const eventObject = { eventName: EventName.clickImg, eventPayload: e };
                    this.observer.notify(eventObject);
                });
            });
        });
    }

    public renderThumbnail() {
        const productThumbnail = document.createElement('div');
        productThumbnail.classList.add('product__thumbnail');

        const productThumbnailImg = document.createElement('img');
        productThumbnailImg.classList.add('product__thumbnail-img');

        if (this.currImg) {
            productThumbnailImg.src = `${this.currImg}`;
            productThumbnailImg.dataset.zoom = `${this.currImg}`;
        } else {
            productThumbnailImg.src = `${data.products[1].images[0]}`;
            productThumbnailImg.dataset.zoom = `${data.products[1].images[0]}`;
        }

        productThumbnail.append(productThumbnailImg);

        const productPhotos = document.querySelector('.product__photos');
        if (productPhotos) {
            productPhotos.append(productThumbnail);
        }

        const trigger = document.querySelector('.product__thumbnail-img');
        const paneContainer = document.querySelector('.product__description');

        if (trigger && paneContainer) {
            const options = {
                paneContainer: paneContainer as HTMLElement,
            };

            new Drift(trigger as HTMLElement, options);
        }
    }
}

export { ProductPhotos };
