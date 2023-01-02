import Observer from '../../Observer/Observer';

export interface IRangeSliderProps {
    observer: Observer;
    container: HTMLElement;
    name: string;
    min: number;
    max: number;
    to: number;
    from: number;
    type: RangeSliderType;
}

export enum RangeSliderType {
    price = 'price',
    stock = 'stock',
}
