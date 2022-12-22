import Observer from '../../Observer/Observer';
import { IMainProps } from './main.types';

class MainPage {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IMainProps) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'Main Page';

        this.container.append(header);
    }
}

export { MainPage };
