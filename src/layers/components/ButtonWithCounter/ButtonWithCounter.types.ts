import Observer from '../../Observer/Observer';

interface IButtonWithCounterProps {
    container: HTMLElement;
    count?: number;
    observer: Observer;
}

export { IButtonWithCounterProps };
