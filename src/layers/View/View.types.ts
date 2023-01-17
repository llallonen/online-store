import { ICommonProps, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';

interface IViewProps extends ICommonProps {
    data: IModelData;
}

export { IViewProps };
