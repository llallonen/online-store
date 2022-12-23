import { IModelData } from '../../Model/Model.types';
import Observer from '../../Observer/Observer';
import { IPage404Props } from './404.types';

class Page404 {
    private container: HTMLElement;
    private data: IModelData;
    private observer: Observer;

    constructor({ container, observer, data }: IPage404Props) {
        this.container = container;
        this.observer = observer;
        this.data = data;
    }

    public render() {
        const header = document.createElement('h1');
        header.classList.add('page404__header');
        header.textContent = 'PAGE NOT FOUND (404)';

        this.container.append(header);
    }
}

export { Page404 };
