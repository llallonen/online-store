import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

export interface IFilterItemProps {
    container: HTMLElement;
    observer: Observer;
    product: IAllProducts;
    filteredCount: number;
    eventName: EventName;
    filterArr: string[];
}

export interface IAllProducts {
    name: string;
    count: number;
}
