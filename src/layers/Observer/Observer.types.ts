import { IModelData } from '../Model/Model.types';

enum EventName {
    clickButton = 'clickButton',
    updateState = 'updateState',
    clickImg = 'clickImg',
    addGoods = 'addGoods',
    removeGoods = 'removeGoods',
    changeItemsLimit = 'changeItemsLimit',
    changeNavigationPage = 'changeNavigationPage',
    addPromoCode = 'addPromoCode',
    removePromoCode = 'removePromoCode',
    filterBrand = 'filterBrand',
    filterCategory = 'filterCategory',
    filterPrice = 'filterPrice',
    filterStock = 'filterStock',
    clearFilter = 'clearFilter',
    changeViewList = 'changeViewList',
    setSorting = 'setSorting',
    setCurrentProduct = 'setCurrentProduct',
    clearBasket = 'clearBasket',
    setModalOpen = 'setModalOpen',
    changeSearch = 'changeSearch',
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
