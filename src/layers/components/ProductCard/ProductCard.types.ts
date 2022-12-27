import Observer from '../../Observer/Observer';

interface IProductCard {
    container: HTMLElement;
    observer: Observer;
    currImg?: string;
}

export { IProductCard };
