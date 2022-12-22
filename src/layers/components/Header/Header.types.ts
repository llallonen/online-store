import Observer from '../../Observer/Observer';

interface IHeader {
    container: HTMLElement;
    observer: Observer;
    bagCount?: number;
    totalSum?: number;
}

export { IHeader };
