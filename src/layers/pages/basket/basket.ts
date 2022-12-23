import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IBasketProps } from './basket.types';

class BasketPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;

    constructor({ container, observer, data }: IBasketProps) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'Cart is empty';

        this.container.append(header);
    }
}

export { BasketPage };
