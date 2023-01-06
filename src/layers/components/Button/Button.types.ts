import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

interface IButtonProps {
    container: HTMLElement;
    observer: Observer;
    typeButton?: string | null;
    textButton?: string | null;
    event?: EventName;
    id?: number;
}

export { IButtonProps };
