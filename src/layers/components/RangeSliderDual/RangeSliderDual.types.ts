import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

export interface IRangeSliderProps {
    observer: Observer;
    container: HTMLElement;
    name: string;
    min: number;
    max: number;
    to: number;
    from: number;
    eventName: EventName;
}
