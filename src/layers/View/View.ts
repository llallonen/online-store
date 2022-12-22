import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { IModelData } from '../Model/Model.types';
import Observer from '../Observer/Observer';
import { IViewProps } from './View.types';

class View {
    private container: HTMLElement;
    private observer: Observer;
    private header: Header;
    private footer: Footer;
    private main: Main;
    private state: IModelData | undefined;

    constructor({ container, observer }: IViewProps) {
        this.container = container;
        this.observer = observer;
        this.header = new Header({ container: this.container, observer: this.observer });
        this.footer = new Footer({ container: this.container });
        this.main = new Main({ container: this.container, observer: this.observer });

        this.render();
    }

    render() {
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    }

    renderHeader() {
        this.header.render();
    }

    renderFooter() {
        this.footer.render();
    }

    renderMain() {
        this.main.render();
    }

    public update(data: IModelData) {
        this.state = data;
    }
}

export { View };
