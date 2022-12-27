import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { IAction, IActionType, IModelData, IModelProps } from './Model.types';

class Model {
    private observer: Observer;
    private data: IModelData = {
        basket: {
            limit: 1,
            page: 1,
            products: [],
        },
        goods: {
            products: [],
        },
    };

    constructor({ observer }: IModelProps) {
        this.observer = observer;
    }

    public updateState({ type, payload }: IAction) {
        switch (type) {
            case IActionType.basket:
                this.data.basket = { ...this.data.basket, ...payload };
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
