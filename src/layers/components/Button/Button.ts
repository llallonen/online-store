import { IButtonProps } from './Button.types';
import './Button.scss';

class Button {
    private container: HTMLElement;
    constructor({ container }: IButtonProps) {
        this.container = container;
    }

    public render() {
        const button = document.createElement('button');
        button.textContent = 'Кнопка';
        button.classList.add('button');

        this.container.append(button);
    }
}

export { Button };
