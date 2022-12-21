import Observer from '../../Observer/Observer';
import { IMain } from './Main.types';

class Main {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IMain) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const main = document.createElement('main');
        main.classList.add('main');
        this.container.append(main);
    }
}

export { Main };
