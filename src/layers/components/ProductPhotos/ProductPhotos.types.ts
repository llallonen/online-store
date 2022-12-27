import Observer from '../../Observer/Observer';

interface IProductPhotos {
    container: HTMLElement;
    observer: Observer;
    currImg?: string;
}

export { IProductPhotos };
