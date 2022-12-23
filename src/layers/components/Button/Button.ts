import { IButtonProps } from './Button.types';
import './Button.scss';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

class Button {
    private container: HTMLElement;
    private observer: Observer;
    private typeButton?: string | null;
    private textButton?: string | null;

    constructor({ container, observer, typeButton, textButton }: IButtonProps) {
        this.container = container;
        this.observer = observer;
        this.typeButton = typeButton;
        this.textButton = textButton;
    }

    public render() {
        const button = document.createElement('button');
        button.textContent = `${this.textButton}`;
        button.classList.add('button', `${this.typeButton}`);

        button.addEventListener('click', (e: Event) => {
            const eventObject = { eventName: EventName.clickButton, eventPayload: e };
            this.observer.notify(eventObject);
        });
        this.container.append(button);
    }
}

export { Button };
