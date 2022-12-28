import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

interface IButtonProps {
    container: HTMLElement;
    observer: Observer;
    event?: EventName;
}

export { IButtonProps };
