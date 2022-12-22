import Observer from '../../Observer/Observer';
import { IBasketProps } from './basket.types';

class BasketPage {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IBasketProps) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'Cart is empty';

        this.container.append(header);
    }
}

export { BasketPage };
