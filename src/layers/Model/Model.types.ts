import Observer from '../Observer/Observer';

interface IModelProps {
    counter: number;
    observer: Observer;
}

interface IAction {
    type: IActionType;
    payload?: number;
    payloadImg?: string;
}

enum IActionType {
    count = 'count',
    currImg = 'currImg',
}

interface IModelData {
    count?: number;
    currImg?: string;
}

export { IModelProps, IAction, IActionType, IModelData };
