import { Button } from '../components/Button/Button';
import { ButtonWithCounter } from '../components/ButtonWithCounter/ButtonWithCounter';
import { IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { IViewProps } from './View.types';

class View {
    private container: HTMLElement;
    private observer: Observer;
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
        this.render();
    }

    render() {
        this.renderButton();
        this.renderButtonWithCounter();
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
