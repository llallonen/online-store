import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';
import { addGoodToBasket, removeGoodToBasket } from '../../utils/addGoodToBasket';

class Presenter {
    private view: View;
    private model: Model;
    private container: HTMLElement;
    private observer: Observer;
    private state: IModelData;
    constructor({ container }: IPresenterProps) {
        this.start();
        this.observer = new Observer();
        this.container = container;
        this.model = new Model({ observer: this.observer });
        this.state = this.model.getState();
        this.view = new View({ container: this.container, observer: this.observer, data: this.state });
        this.subscribe();
        this.listenPopState();
        // this.setHash();
        this.fetchLocalStorage();
    }

    start() {
        console.log('Старт');
    }

    subscribe() {
        this.observer.subscribe({ eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) });
        this.observer.subscribe({ eventName: EventName.addGoods, function: this.addGoodToBasket.bind(this) });
        this.observer.subscribe({ eventName: EventName.removeGoods, function: this.removeGoodToBasket.bind(this) });
        this.observer.subscribe({
            eventName: EventName.changeItemsLimit,
            function: this.changeBasketItemsLimit.bind(this),
        });
    }

    handleStateUpdate(data: Event | IModelData): void {
        if (data instanceof Event) {
            return;
        }
        this.getState();
        console.log(data);
        this.view.update(data);
    }

    getState() {
        this.state = this.model.getState();
    }

    listenPopState() {
        window.addEventListener('popstate', () => {
            this.getState();
            this.view.update(this.state);
        });
    }

    setHash() {
        window.location.hash = '#';
        window.location.hash = '#/';
    }

    fetchLocalStorage() {
        const localData = localStorage.getItem('online-store2023');
        let data: ILocalStorageData;
        if (localData) {
            data = JSON.parse(localData) as ILocalStorageData;
            if (data?.basketData) {
                this.model.updateState({ type: IActionType.basket, payload: data.basketData });
            }
        }
        console.log(this.model.getState());
    }

    addGoodToBasket(e: Event | IModelData) {
        if (!(e instanceof MouseEvent)) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        const id = e.target.dataset?.id;
        this.getState();
        if (id) {
            this.model.updateState({
                type: IActionType.basket,
                payload: {
                    ...this.state.basket,
                    products: addGoodToBasket(this.state.basket.products, Number(id), this.state.goods),
                },
            });
        }
    }

    removeGoodToBasket(e: Event | IModelData) {
        if (!(e instanceof Event)) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        const id = e.target.dataset?.id;
        this.getState();

        if (id) {
            this.model.updateState({
                type: IActionType.basket,
                payload: {
                    ...this.state.basket,
                    products: removeGoodToBasket(this.state.basket.products, Number(id)),
                },
            });
        }
    }

    changeBasketItemsLimit(e: Event | IModelData) {
        if (!(e instanceof Event) || !(e.target instanceof HTMLInputElement)) {
            return;
        }

        const newLimit = Number(e.target.value);
        if (Number.isNaN(newLimit)) {
            return;
        }
        this.getState();
        this.model.updateState({
            type: IActionType.basket,
            payload: { ...this.state.basket, limit: Number(newLimit) },
        });
    }
}

export { Presenter };
