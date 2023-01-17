import { ICommonProps } from '../../Model/Model.types';
import { EventName } from '../../Observer/Observer.types';

interface IButtonProps extends ICommonProps {
    typeButton?: string | null;
    textButton?: string | null;
    event?: EventName;
    id?: number;
}

export { IButtonProps };
