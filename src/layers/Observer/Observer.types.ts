import { IModelData } from '../Model/Model.types';

enum EventName {
    clickButton = 'clickButton',
    updateState = 'updateState',
    addGoods = 'addGoods',
    removeGoods = 'removeGoods',
    changeItemsLimit = 'changeItemsLimit',
    changeNavigationPage = 'changeNavigationPage',
}

interface ISubscriber {
    eventName: EventName;
    function: (e: Event | IModelData) => void;
}

interface IEventObject {
    eventName: EventName;
    eventPayload: Event | IModelData;
}

export { ISubscriber, IEventObject, EventName };
