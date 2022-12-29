import Observer from '../../Observer/Observer';
import data from '../../../data.json';
import { IProductPhotos } from './ProductPhotos.types';
import './ProductPhotos.scss';
import { EventName } from '../../Observer/Observer.types';

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

        productSlides.forEach(() => {
            const slides = document.querySelectorAll('.product__slide');

            slides.forEach((slide) => {
                slide.addEventListener('click', (e: Event) => {
                    console.log('click on photo');
                    const eventObject = { eventName: EventName.clickImg, eventPayload: e };
                    this.observer.notify(eventObject);
                });
            });
        });
    }

    public renderThumbnail() {
        const productThumbnail = document.createElement('img');
        productThumbnail.classList.add('product__thumbnail');
        this.currImg !== ''
            ? (productThumbnail.src = `${this.currImg}`)
            : (productThumbnail.src = `${data.products[1].images[0]}`);

        console.log(productThumbnail.src);
        const productPhotos = document.querySelector('.product__photos');
        if (productPhotos) {
            productPhotos.append(productThumbnail);
        }
    }
}

export { ProductPhotos };
