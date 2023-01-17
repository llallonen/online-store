import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { IViewProps } from './View.types';
import { countTotalPrice } from '../../utils/countTotalPrice';
import { countQuantityProducts } from '../../utils/countQuantityProducts';

class View {
    private container: HTMLElement;
    private observer: Observer;
    private header: Header;
    private footer: Footer;
    private main: Main;
    private state: IModelData;

    constructor({ container, observer, data }: IViewProps) {
        this.container = container;
        this.observer = observer;
        this.state = data;
        this.header = new Header({ container: this.container });
        this.footer = new Footer({ container: this.container });
        this.main = new Main({ container: this.container, observer: this.observer, data: this.state });

        this.render();
    }

    private render(): void {
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    }

    private renderHeader(): void {
        this.header.render();
    }

    private renderFooter(): void {
        this.footer.render();
    }

    private renderMain(): void {
        this.main.render();
    }

    public update(data: IModelData): void {
        this.state = data;
        this.main.update(this.state);
        const totalPrice = countTotalPrice(this.state.basket.products);
        const countQuantity = countQuantityProducts(this.state.basket.products);
        this.header.update(totalPrice, countQuantity);
    }
}

export { View };
