import Observer from '../../Observer/Observer';
import { Button } from '../Button/Button';
import { IButtonWithCounterProps } from './ButtonWithCounter.types';

class ButtonWithCounter {
    private container: HTMLElement;
    private observer: Observer;
    private button: Button | undefined;
    private count: number;
    private counter: HTMLDivElement | undefined;
    constructor({ container, count, observer }: IButtonWithCounterProps) {
        this.container = container;
        this.observer = observer;
        if (count) {
            this.count = count;
        } else {
            this.count = 1;
        }
    }

    public render() {
        this.renderCounter();
        this.renderButton();
    }

    private renderCounter() {
        const div = document.createElement('div');
        div.classList.add('counter');
        div.textContent = `${this.count}`;
        this.container.append(div);
        this.counter = div;
    }

    private renderButton() {
        this.button = new Button({ container: this.container, observer: this.observer });
        this.button.render();
    }

    public updateCounter(count: number) {
        this.count = count;
        if (this.counter) {
            this.counter.textContent = `${this.count}`;
        }
    }
}

export { ButtonWithCounter };
