import { IMain } from '../../components/Main/Main.types';
import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';

class MainPage {
    private container: HTMLElement;
    private observer: Observer;
    private data: IModelData;

    constructor({ container, observer, data }: IMain) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'Main Page';

        this.container.append(header);
    }
}

export { MainPage };
