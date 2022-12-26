import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { ILocalStorageData, IPresenterProps } from './Presenter.types';

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
        this.setHash();
        this.fetchLocalStorage();
    }

    start() {
        console.log('Старт');
    }

    subscribe() {
        this.observer.subscribe({ eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) });
    }

    handleStateUpdate(data: Event | IModelData): void {
        if (data instanceof Event) {
            return;
        }
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
}

export { Presenter };
