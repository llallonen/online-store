import { IButtonProps } from './Button.types';
import './Button.scss';
import Observer from '../../Observer/Observer';
import { EventName } from '../../Observer/Observer.types';
import { createElement } from '../../../utils/createElement';

class Button {
    private container: HTMLElement;
    private observer: Observer;
    private typeButton?: string | null;
    private textButton?: string | null;
    private event: EventName | undefined;
    private id: number | undefined;

    constructor({ container, observer, typeButton, textButton, event, id }: IButtonProps) {
        this.container = container;
        this.observer = observer;
        this.typeButton = typeButton;
        this.textButton = textButton;
        if (event) {
            this.event = event;
        }

        if (id) {
            this.id = id;
        }
    }

    public render(): void {
        const button = createElement('button', 'button', `${this.typeButton}`);
        button.textContent = `${this.textButton}`;
        if (this.id) {
            button.dataset.id = `${this.id}`;
        }

        if (this.event) {
            const event = this.event;
            button.addEventListener('click', (e: Event) => {
                const eventObject = { eventName: event, eventPayload: e };
                this.observer.notify(eventObject);
            });
        }
        this.container.append(button);
    }
}

export { Button };
