import Observer from '../../Observer/Observer';
import { IProductPhotos } from './ProductPhotos.types';
import './ProductPhotos.scss';
import { EventName } from '../../Observer/Observer.types';
import Drift from 'drift-zoom';
import { IModelData } from '../../Model/Model.types';

class ProductPhotos {
    private container: HTMLElement;
    private observer: Observer;
    private currImg?: string;
    private data: IModelData;

    constructor({ container, observer, currImg, data }: IProductPhotos) {
        this.container = container;
        this.observer = observer;
        this.currImg = currImg;
        this.data = data;
    }

    public render(): void {
        const productPhotos = document.createElement('div');
        productPhotos.classList.add('product__photos');
        this.container.prepend(productPhotos);

        const productSlider = document.createElement('div');
        productSlider.classList.add('product__slider');
        productPhotos.append(productSlider);

        const productSlides = this.data.currProduct.images;
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

    public renderThumbnail(): void {
        const productThumbnail = document.createElement('div');
        productThumbnail.classList.add('product__thumbnail');

        const productThumbnailImg = document.createElement('img');
        productThumbnailImg.classList.add('product__thumbnail-img');

        if (this.currImg) {
            productThumbnailImg.src = `${this.currImg}`;
            productThumbnailImg.dataset.zoom = `${this.currImg}`;
        } else {
            productThumbnailImg.src = `${this.data.currProduct.images[0]}`;
            productThumbnailImg.dataset.zoom = `${this.data.currProduct.images[0]}`;
        }

        productThumbnail.append(productThumbnailImg);

        const productPhotos = document.querySelector('.product__photos');
        if (productPhotos) {
            productPhotos.append(productThumbnail);
        }

        const trigger: HTMLElement | null = document.querySelector('.product__thumbnail-img');
        const paneContainer: HTMLElement | null = document.querySelector('.product__info');

        if (trigger && paneContainer) {
            const options = {
                paneContainer: paneContainer,
            };

            new Drift(trigger, options);
        }
    }
}

export { ProductPhotos };
