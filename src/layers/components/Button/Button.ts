import { IButtonProps } from './Button.types';
import './Button.scss';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

class Button {
    private container: HTMLElement;
    private observer: Observer;
    constructor({ container, observer }: IButtonProps) {
        this.container = container;
        this.observer = observer;
    }

    public render() {
        const button = document.createElement('button');
        button.textContent = 'Кнопка';
        button.classList.add('button');

        button.addEventListener('click', (e: Event) => {
            const eventObject = { eventName: EventName.clickButton, eventPayload: e };
            this.observer.notify(eventObject);
            console.log(eventObject, 'нотифай');
        });
        this.container.append(button);
    }
}

export { Button };
