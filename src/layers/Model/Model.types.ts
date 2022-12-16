import Observer from '../Observer/Observer';

interface IModelProps {
    counter: number;
    observer: Observer;
}

interface IAction {
    type: IActionType;
    payload: number;
}

enum IActionType {
    count = 'count',
}

interface IModelData {
    count: number;
}

export { IModelProps, IAction, IActionType, IModelData };
