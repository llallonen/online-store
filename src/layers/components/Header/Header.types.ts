import Observer from '../../Observer/Observer';

interface IHeader {
    container: HTMLElement;
    observer: Observer;
    bagCount: number;
    total: number;
}

export { IHeader };