import { IButtonProps } from './Button.types';
import './Button.scss';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';

class Button {
    private container: HTMLElement;
    private observer: Observer;
    private event: EventName | undefined;
    constructor({ container, observer, event }: IButtonProps) {
        this.container = container;
        this.observer = observer;
        if (event) {
            this.event = event;
        }
    }

    public render() {
        const button = document.createElement('button');
        button.textContent = 'Кнопка';
        button.classList.add('button');

        if (this.event) {
            const event = this.event as EventName;
            button.addEventListener('click', (e: Event) => {
                const eventObject = { eventName: event, eventPayload: e };
                this.observer.notify(eventObject);
            });
        }
        this.container.append(button);
    }
}

export { Button };
