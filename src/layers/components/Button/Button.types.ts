import Observer from '../../Observer/Observer';

interface IButtonProps {
    container: HTMLElement;
    observer: Observer;
    typeButton?: string | null;
    textButton?: string | null;
}

export { IButtonProps };
