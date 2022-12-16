import { Model } from '../Model/Model';
import { View } from '../View/View';
import { IPresenterProps } from './Presenter.types';

class Presenter {
    private view: View;
    private model: Model;
    private container: HTMLElement;
    constructor({ container }: IPresenterProps) {
        this.start();
        this.container = container;
        this.view = new View({ container });
        this.model = new Model({ counter: 3 });
    }

    start() {
        console.log('Старт');
    }
}

export { Presenter };
