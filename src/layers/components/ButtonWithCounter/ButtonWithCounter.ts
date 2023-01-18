import { createElement } from '../../../utils/createElement';
import Observer from '../../Observer/Observer';
import { Button } from '../Button/Button';
import { IButtonWithCounterProps } from './ButtonWithCounter.types';

class ButtonWithCounter {
    private container: HTMLElement;
    private observer: Observer;
    private button: Button | undefined;
    private count: number;
    private counter: HTMLElement | undefined;
    constructor({ container, count, observer }: IButtonWithCounterProps) {
        this.container = container;
        this.observer = observer;
        if (count) {
            this.count = count;
        } else {
            this.count = 1;
        }
    }

    public render(): void {
        this.renderCounter();
        this.renderButton();
    }

    private renderCounter(): void {
        const div = createElement('div', 'counter');
        div.textContent = `${this.count}`;
        this.container.append(div);
        this.counter = div;
    }

    private renderButton(): void {
        this.button = new Button({ container: this.container, observer: this.observer });
        this.button.render();
    }

    public updateCounter(count: number): void {
        this.count = count;
        if (this.counter) {
            this.counter.textContent = `${this.count}`;
        }
    }
}

export { ButtonWithCounter };
