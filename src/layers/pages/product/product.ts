import Observer from '../../Observer/Observer';
import { IProductProps } from './product.types';

class ProductPage {
    private container: HTMLElement;
    private observer: Observer;

    constructor({ container, observer }: IProductProps) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'Product Page';

        this.container.append(header);
    }
}

export { ProductPage };
