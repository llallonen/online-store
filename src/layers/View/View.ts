import { Button } from '../components/Button/Button';
import { ButtonWithCounter } from '../components/ButtonWithCounter/ButtonWithCounter';
import { Header } from '../components/Header/Header';
import { IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { IViewProps } from './View.types';

class View {
    private container: HTMLElement;
    private observer: Observer;
    private header: Header;
    private button: Button;
    private buttonWithCounter: ButtonWithCounter;
    private state: IModelData | undefined;

    constructor({ container, observer }: IViewProps) {
        this.container = container;
        this.observer = observer;
        this.button = new Button({ container: this.container, observer: this.observer });
        this.buttonWithCounter = new ButtonWithCounter({
            container: this.container,
            observer: this.observer,
            count: 5,
        });
        this.header = new Header({ container: this.container, observer: this.observer, bagCount: 4, total: 666 });
        this.render();
    }

    render() {
        this.renderHeader();
        this.renderButton();
        this.renderButtonWithCounter();
    }

    renderHeader() {
        this.header.render();
    }

    renderButton() {
        this.button.render();
    }

    renderButtonWithCounter() {
        this.buttonWithCounter.render();
    }

    public update(data: IModelData) {
        // this.container.innerHTML = '';
        this.state = data;
        this.buttonWithCounter.updateCounter(this.state.count);
    }
}

export { View };
