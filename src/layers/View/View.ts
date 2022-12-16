import { Button } from '../components/Button/Button';
import { IViewProps } from './View.types';

class View {
    private container: HTMLElement;
    private button: Button;
    constructor({ container }: IViewProps) {
        this.container = container;
        this.button = new Button({ container: this.container });

        this.render();
    }

    render() {
        this.renderButton();
    }

    renderButton() {
        this.button.render();
    }
}

export { View };
