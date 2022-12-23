import { ProductCard } from '../../components/ProductCard/ProductCard';
import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IProductProps } from './product.types';

class ProductPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;

    constructor({ container, observer, data }: IProductProps) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const header = document.createElement('h1');
        header.textContent = 'Product Page';
        this.container.append(header);

        const main = document.querySelector('main');

        if (main) {
            const productCard = new ProductCard({ container: main, observer: this.observer });
            productCard.render();
        }
    }
}

export { ProductPage };
