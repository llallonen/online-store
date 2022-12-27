import { Model } from '../Model/Model';
import { IActionType, IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { EventName } from '../Observer/Observer.types';
import { View } from '../View/View';
import { IPresenterProps } from './Presenter.types';

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
        this.model = new Model({ counter: 3, observer: this.observer });
        this.state = this.model.getState();
        this.view = new View({ container: this.container, observer: this.observer, data: this.state });
        this.subscribe();
        this.listenPopState();
        this.setHash();
    }

    start() {
        console.log('Старт');
    }

    subscribe() {
        this.observer.subscribe({ eventName: EventName.clickButton, function: this.handleButtonClick.bind(this) });
        this.observer.subscribe({ eventName: EventName.updateState, function: this.handleStateUpdate.bind(this) });
        this.observer.subscribe({ eventName: EventName.clickImg, function: this.handleImgChange.bind(this) });
    }

    handleButtonClick(e: Event | IModelData): void {
        if (!(e instanceof PointerEvent)) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        this.getState();
        if (this.state.count) {
            this.model.updateState({ type: IActionType.count, payload: (this.state.count += 1) });
        }
    }

    handleImgChange(e: Event | IModelData): void {
        if (!(e instanceof PointerEvent)) {
            return;
        }
        if (!(e.target instanceof HTMLImageElement)) {
            return;
        }

        console.log('изменилась картинка');
        this.getState();
        const imgUrl = e.target.src;

        this.model.updateState({ type: IActionType.currImg, payload: imgUrl });
        this.getState();
        console.log(this.state);
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
}

export { Presenter };
