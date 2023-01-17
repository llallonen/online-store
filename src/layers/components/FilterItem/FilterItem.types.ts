import { ICommonProps } from '../../Model/Model.types';
import { EventName } from '../../Observer/Observer.types';

export interface IFilterItemProps extends ICommonProps {
    product: IAllProducts;
    filteredCount: number;
    eventName: EventName;
    filterArr: string[];
}

export interface IAllProducts {
    name: string;
    count: number;
}
