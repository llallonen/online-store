import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { IAction, IActionType, IModelData, IModelProps } from './Model.types';

class Model {
    private observer: Observer;
    private data: IModelData = {
        count: 1,
        currImg: '',
    };

    constructor({ counter, observer }: IModelProps) {
        this.data.count = counter;
        this.observer = observer;
    }

    public updateState({ type, payload, payloadImg }: IAction) {
        switch (type) {
            case IActionType.count:
                this.data.count = payload;
                break;
            case IActionType.currImg:
                this.data.currImg = payloadImg;
                break;
            default:
                break;
        }
        this.notify();
    }

    private notify() {
        this.observer.notify({ eventName: EventName.updateState, eventPayload: this.data });
    }

    public getState(): IModelData {
        return { ...this.data };
    }
}

export { Model };
