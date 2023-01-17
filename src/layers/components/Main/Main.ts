import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import Router from '../../Router/Router';
import { IMain } from './Main.types';
import './Main.scss';
import { ClassName } from '../../Router/Router.types';

class Main {
    private container: HTMLElement;
    private observer: Observer;
    private main: HTMLElement | undefined;
    private state: IModelData;

    constructor({ container, observer, data }: IMain) {
        this.container = container;
        this.observer = observer;
        this.state = data;
    }

    public render(): void {
        const main = document.createElement('main');
        main.classList.add('main');
        this.main = main;

        this.container.append(this.main);
    }

    public route(): ClassName | undefined {
        const router = new Router();
        if (!this.main) return;
        return router.getPage({ container: this.main, observer: this.observer, data: this.state });
    }

    public update(state: IModelData): void {
        this.state = state;
        if (this.main) {
            this.main.innerHTML = '';
            this.route()?.render();
        }
    }
}

export { Main };
