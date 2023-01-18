import { ICommonProps } from '../../Model/Model.types';
import { EventName } from '../../Observer/Observer.types';

export interface IRangeSliderProps extends ICommonProps {
    name: string;
    min: number;
    max: number;
    to: number;
    from: number;
    eventName: EventName;
}
